<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserCrudTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;

    protected function setUp(): void
    {
        parent::setUp();
        $this->adminUser = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);
    }

    /** @test */
    public function authenticated_user_can_view_users_list()
    {
        User::factory()->count(5)->create();

        $response = $this->actingAs($this->adminUser)
            ->get('/users');

        $response->assertStatus(200);
    }

    /** @test */
    public function unauthenticated_user_cannot_view_users_list()
    {
        $response = $this->get('/users');

        $response->assertRedirect('/login');
    }

    /** @test */
    public function authenticated_user_can_create_new_user()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
        ];

        $response = $this->actingAs($this->adminUser)
            ->post('/users', $userData);

        $response->assertRedirect('/users')
            ->assertSessionHas('success', 'Pengguna berhasil dibuat');

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);
    }

    /** @test */
    public function user_creation_validates_required_fields()
    {
        $response = $this->actingAs($this->adminUser)
            ->post('/users', []);

        $response->assertSessionHasErrors(['name', 'email', 'password']);
    }

    /** @test */
    public function user_creation_validates_unique_email()
    {
        $existingUser = User::factory()->create(['email' => 'existing@example.com']);

        $response = $this->actingAs($this->adminUser)
            ->post('/users', [
                'name' => 'Test User',
                'email' => 'existing@example.com',
                'password' => 'password123',
            ]);

        $response->assertSessionHasErrors(['email']);
    }

    /** @test */
    public function user_creation_validates_email_format()
    {
        $response = $this->actingAs($this->adminUser)
            ->post('/users', [
                'name' => 'Test User',
                'email' => 'invalid-email',
                'password' => 'password123',
            ]);

        $response->assertSessionHasErrors(['email']);
    }

    /** @test */
    public function user_creation_validates_password_length()
    {
        $response = $this->actingAs($this->adminUser)
            ->post('/users', [
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => '123',
            ]);

        $response->assertSessionHasErrors(['password']);
    }

    /** @test */
    public function authenticated_user_can_view_user_details()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($this->adminUser)
            ->get("/users/{$user->id}");

        $response->assertStatus(200);
    }

    /** @test */
    public function authenticated_user_can_update_user()
    {
        $user = User::factory()->create([
            'name' => 'Original Name',
            'email' => 'original@example.com',
        ]);

        $updateData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ];

        $response = $this->actingAs($this->adminUser)
            ->put("/users/{$user->id}", $updateData);

        $response->assertRedirect('/users')
            ->assertSessionHas('success', 'User berhasil diperbarui');

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ]);
    }

    /** @test */
    public function user_update_validates_unique_email_except_current_user()
    {
        $user1 = User::factory()->create(['email' => 'user1@example.com']);
        $user2 = User::factory()->create(['email' => 'user2@example.com']);

        // Should fail - trying to use another user's email
        $response = $this->actingAs($this->adminUser)
            ->put("/users/{$user1->id}", [
                'name' => 'Updated Name',
                'email' => 'user2@example.com',
            ]);

        $response->assertSessionHasErrors(['email']);

        // Should pass - using same email
        $response = $this->actingAs($this->adminUser)
            ->put("/users/{$user1->id}", [
                'name' => 'Updated Name',
                'email' => 'user1@example.com',
            ]);

        $response->assertRedirect('/users');
    }

    /** @test */
    public function authenticated_user_can_delete_user()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($this->adminUser)
            ->delete("/users/{$user->id}");

        $response->assertRedirect('/users')
            ->assertSessionHas('success', 'Pengguna berhasil dihapus');

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    /** @test */
    public function cannot_delete_non_existent_user()
    {
        $response = $this->actingAs($this->adminUser)
            ->delete('/users/999');

        $response->assertSessionHas('error', 'Pengguna tidak ditemukan atau gagal dihapus');
    }

    // API Tests
    /** @test */
    public function api_authenticated_user_can_get_users_list()
    {
        $token = $this->adminUser->createToken('test-token')->plainTextToken;
        User::factory()->count(3)->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/users');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => ['id', 'name', 'email', 'created_at', 'updated_at']
                ]
            ]);
    }

    /** @test */
    public function api_unauthenticated_user_cannot_access_users()
    {
        $response = $this->getJson('/api/users');

        $response->assertStatus(401);
    }

    /** @test */
    public function api_authenticated_user_can_create_user()
    {
        $token = $this->adminUser->createToken('test-token')->plainTextToken;

        $userData = [
            'name' => 'API User',
            'email' => 'api@example.com',
            'password' => 'password123',
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/users', $userData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => ['id', 'name', 'email', 'created_at']
            ]);

        $this->assertDatabaseHas('users', [
            'name' => 'API User',
            'email' => 'api@example.com',
        ]);
    }

    /** @test */
    public function api_user_creation_validates_required_fields()
    {
        $token = $this->adminUser->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/users', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    /** @test */
    public function api_authenticated_user_can_show_user()
    {
        $token = $this->adminUser->createToken('test-token')->plainTextToken;
        $user = User::factory()->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson("/api/users/{$user->id}");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['id', 'name', 'email', 'created_at', 'updated_at']
            ]);
    }

    /** @test */
    public function api_authenticated_user_can_update_user()
    {
        $token = $this->adminUser->createToken('test-token')->plainTextToken;
        $user = User::factory()->create([
            'name' => 'Original Name',
            'email' => 'original@example.com',
        ]);

        $updateData = [
            'name' => 'Updated API Name',
            'email' => 'updated.api@example.com',
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson("/api/users/{$user->id}", $updateData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => ['id', 'name', 'email', 'updated_at']
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated API Name',
            'email' => 'updated.api@example.com',
        ]);
    }

    /** @test */
    public function api_authenticated_user_can_delete_user()
    {
        $token = $this->adminUser->createToken('test-token')->plainTextToken;
        $user = User::factory()->create();

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson("/api/users/{$user->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Pengguna berhasil dihapus',
            ]);

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    /** @test */
    public function api_cannot_delete_non_existent_user()
    {
        $token = $this->adminUser->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson('/api/users/999');

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Pengguna tidak ditemukan atau gagal dihapus',
            ]);
    }
}
