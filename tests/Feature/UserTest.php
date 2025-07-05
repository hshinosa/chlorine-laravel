<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected User $adminUser;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create admin user for authentication
        $this->adminUser = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);
        
        // Create regular user for testing
        $this->user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
    }

    /** @test */
    public function it_can_display_users_index_page()
    {
        User::factory()->count(5)->create();

        $response = $this->actingAs($this->adminUser)
            ->get(route('users.index'));

        $response->assertStatus(200);
    }

    /** @test */
    public function it_can_create_a_user()
    {
        $userData = [
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'password123',
        ];

        $response = $this->actingAs($this->adminUser)
            ->post(route('users.store'), $userData);

        $response->assertRedirect(route('users.index'))
            ->assertSessionHas('success', 'Pengguna berhasil dibuat');

        $this->assertDatabaseHas('users', [
            'name' => 'New User',
            'email' => 'newuser@example.com',
        ]);

        // Verify password is hashed
        $user = User::where('email', 'newuser@example.com')->first();
        $this->assertTrue(Hash::check('password123', $user->password));
    }

    /** @test */
    public function it_can_show_a_specific_user()
    {
        $response = $this->actingAs($this->adminUser)
            ->get(route('users.show', $this->user->id));

        $response->assertStatus(200);
    }

    /** @test */
    public function it_can_update_a_user()
    {
        $updatedData = [
            'name' => 'Updated User Name',
            'email' => 'updated@example.com',
        ];

        $response = $this->actingAs($this->adminUser)
            ->put(route('users.update', $this->user->id), $updatedData);

        $response->assertRedirect(route('users.index'))
            ->assertSessionHas('success', 'User berhasil diperbarui');

        $this->assertDatabaseHas('users', [
            'id' => $this->user->id,
            'name' => 'Updated User Name',
            'email' => 'updated@example.com',
        ]);
    }

    /** @test */
    public function it_can_update_user_password()
    {
        $updatedData = [
            'name' => $this->user->name,
            'email' => $this->user->email,
            'password' => 'newpassword123',
        ];

        $response = $this->actingAs($this->adminUser)
            ->put(route('users.update', $this->user->id), $updatedData);

        $response->assertRedirect(route('users.index'));

        // Verify password is updated and hashed
        $updatedUser = User::find($this->user->id);
        $this->assertTrue(Hash::check('newpassword123', $updatedUser->password));
    }

    /** @test */
    public function it_can_delete_a_user()
    {
        $userToDelete = User::factory()->create();

        $response = $this->actingAs($this->adminUser)
            ->delete(route('users.destroy', $userToDelete->id));

        $response->assertRedirect(route('users.index'))
            ->assertSessionHas('success', 'Pengguna berhasil dihapus');

        $this->assertDatabaseMissing('users', [
            'id' => $userToDelete->id,
        ]);
    }

    /** @test */
    public function it_validates_required_fields_when_creating_user()
    {
        $response = $this->actingAs($this->adminUser)
            ->post(route('users.store'), []);

        $response->assertSessionHasErrors(['name', 'email', 'password']);
    }

    /** @test */
    public function it_validates_email_format_when_creating_user()
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'invalid-email',
            'password' => 'password123',
        ];

        $response = $this->actingAs($this->adminUser)
            ->post(route('users.store'), $userData);

        $response->assertSessionHasErrors(['email']);
    }

    /** @test */
    public function it_validates_unique_email_when_creating_user()
    {
        $userData = [
            'name' => 'Another User',
            'email' => $this->user->email, // Use existing email
            'password' => 'password123',
        ];

        $response = $this->actingAs($this->adminUser)
            ->post(route('users.store'), $userData);

        $response->assertSessionHasErrors(['email']);
    }

    /** @test */
    public function it_validates_unique_email_when_updating_user()
    {
        $anotherUser = User::factory()->create();

        $updatedData = [
            'name' => 'Updated Name',
            'email' => $anotherUser->email, // Use another user's email
        ];

        $response = $this->actingAs($this->adminUser)
            ->put(route('users.update', $this->user->id), $updatedData);

        $response->assertSessionHasErrors(['email']);
    }

    /** @test */
    public function it_validates_password_min_length_when_creating_user()
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => '123', // Too short
        ];

        $response = $this->actingAs($this->adminUser)
            ->post(route('users.store'), $userData);

        $response->assertSessionHasErrors(['password']);
    }

    /** @test */
    public function it_returns_404_when_showing_non_existent_user()
    {
        $response = $this->actingAs($this->adminUser)
            ->get(route('users.show', 99999));

        $response->assertStatus(404);
    }

    /** @test */
    public function it_returns_404_when_updating_non_existent_user()
    {
        $updatedData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ];

        $response = $this->actingAs($this->adminUser)
            ->put(route('users.update', 99999), $updatedData);

        $response->assertStatus(404);
    }

    /** @test */
    public function it_returns_404_when_deleting_non_existent_user()
    {
        $response = $this->actingAs($this->adminUser)
            ->delete(route('users.destroy', 99999));

        $response->assertStatus(404);
    }

    // API Tests
    /** @test */
    public function api_can_list_users()
    {
        User::factory()->count(3)->create();

        $response = $this->actingAs($this->adminUser, 'sanctum')
            ->getJson(route('api.users.index'));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => [
                    '*' => ['id', 'name', 'email', 'created_at', 'updated_at']
                ]
            ]);
    }

    /** @test */
    public function api_can_create_user()
    {
        $userData = [
            'name' => 'API User',
            'email' => 'apiuser@example.com',
            'password' => 'password123',
        ];

        $response = $this->actingAs($this->adminUser, 'sanctum')
            ->postJson(route('api.users.store'), $userData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => ['id', 'name', 'email', 'created_at']
            ]);

        $this->assertDatabaseHas('users', [
            'name' => 'API User',
            'email' => 'apiuser@example.com',
        ]);
    }

    /** @test */
    public function api_can_show_user()
    {
        $response = $this->actingAs($this->adminUser, 'sanctum')
            ->getJson(route('api.users.show', $this->user->id));

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'data' => ['id', 'name', 'email', 'created_at', 'updated_at']
            ]);
    }

    /** @test */
    public function api_can_update_user()
    {
        $updatedData = [
            'name' => 'API Updated User',
            'email' => 'apiupdated@example.com',
        ];

        $response = $this->actingAs($this->adminUser, 'sanctum')
            ->putJson(route('api.users.update', $this->user->id), $updatedData);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => ['id', 'name', 'email', 'updated_at']
            ]);

        $this->assertDatabaseHas('users', [
            'id' => $this->user->id,
            'name' => 'API Updated User',
            'email' => 'apiupdated@example.com',
        ]);
    }

    /** @test */
    public function api_can_delete_user()
    {
        $userToDelete = User::factory()->create();

        $response = $this->actingAs($this->adminUser, 'sanctum')
            ->deleteJson(route('api.users.destroy', $userToDelete->id));

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Pengguna berhasil dihapus',
            ]);

        $this->assertDatabaseMissing('users', [
            'id' => $userToDelete->id,
        ]);
    }

    /** @test */
    public function api_validates_required_fields_when_creating_user()
    {
        $response = $this->actingAs($this->adminUser, 'sanctum')
            ->postJson(route('api.users.store'), []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    /** @test */
    public function api_validates_unique_email_when_creating_user()
    {
        $userData = [
            'name' => 'Another User',
            'email' => $this->user->email,
            'password' => 'password123',
        ];

        $response = $this->actingAs($this->adminUser, 'sanctum')
            ->postJson(route('api.users.store'), $userData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    /** @test */
    public function api_returns_404_when_showing_non_existent_user()
    {
        $response = $this->actingAs($this->adminUser, 'sanctum')
            ->getJson(route('api.users.show', 99999));

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Pengguna tidak ditemukan',
            ]);
    }

    /** @test */
    public function unauthenticated_user_cannot_access_user_endpoints()
    {
        $response = $this->getJson(route('api.users.index'));
        $response->assertStatus(401);

        $response = $this->postJson(route('api.users.store'), []);
        $response->assertStatus(401);

        $response = $this->getJson(route('api.users.show', $this->user->id));
        $response->assertStatus(401);

        $response = $this->putJson(route('api.users.update', $this->user->id), []);
        $response->assertStatus(401);

        $response = $this->deleteJson(route('api.users.destroy', $this->user->id));
        $response->assertStatus(401);
    }
}
