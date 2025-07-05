<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserCrudTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    /**
     * User instance.
     *
     * @var \App\Models\User
     */
    protected $adminUser;

    /**
     * Another user instance.
     *
     * @var \App\Models\User
     */
    protected $anotherUser;

    /**
     * Setup the test environment.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        // Create an admin user for authentication
        $this->adminUser = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
        ]);

        // Create another user for testing purposes
        $this->anotherUser = User::factory()->create([
            'name' => 'Another User',
            'email' => 'another@example.com',
            'password' => Hash::make('password'),
        ]);
    }

    // Web Routes Tests
    /** @test */
    public function authenticated_user_can_view_users_list()
    {
        $response = $this->actingAs($this->adminUser)->get('/users');

        $response->assertStatus(200);
        $response->assertSee($this->adminUser->name);
        $response->assertSee($this->anotherUser->name);
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
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ];

        $response = $this->actingAs($this->adminUser)->post('/users', $userData);

        $response->assertRedirect('/users');
        $this->assertDatabaseHas('users', ['email' => 'newuser@example.com']);
    }

    /** @test */
    public function user_creation_validates_required_fields()
    {
        $response = $this->actingAs($this->adminUser)->post('/users', []);

        $response->assertSessionHasErrors(['name', 'email', 'password']);
    }

    /** @test */
    public function user_creation_validates_unique_email()
    {
        $userData = [
            'name' => 'Test User',
            'email' => $this->adminUser->email,
            'password' => 'password',
            'password_confirmation' => 'password',
        ];

        $response = $this->actingAs($this->adminUser)->post('/users', $userData);

        $response->assertSessionHasErrors('email');
    }

    /** @test */
    public function user_creation_validates_email_format()
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'not-an-email',
            'password' => 'password',
            'password_confirmation' => 'password',
        ];

        $response = $this->actingAs($this->adminUser)->post('/users', $userData);

        $response->assertSessionHasErrors('email');
    }

    /** @test */
    public function user_creation_validates_password_length()
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => '123',
            'password_confirmation' => '123',
        ];

        $response = $this->actingAs($this->adminUser)->post('/users', $userData);

        $response->assertSessionHasErrors('password');
    }

    /** @test */
    public function authenticated_user_can_view_user_details()
    {
        $response = $this->actingAs($this->adminUser)->get('/users/' . $this->anotherUser->id);

        $response->assertStatus(200);
        $response->assertSee($this->anotherUser->name);
        $response->assertSee($this->anotherUser->email);
    }

    /** @test */
    public function authenticated_user_can_update_user()
    {
        $updatedData = [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ];

        $response = $this->actingAs($this->adminUser)->put('/users/' . $this->anotherUser->id, $updatedData);

        $response->assertRedirect('/users');
        $this->assertDatabaseHas('users', ['id' => $this->anotherUser->id, 'name' => 'Updated Name']);
    }

    /** @test */
    public function user_update_validates_unique_email_except_current_user()
    {
        // Try to update with an email that already exists for another user
        $response = $this->actingAs($this->adminUser)->put('/users/' . $this->anotherUser->id, [
            'name' => 'Updated Name',
            'email' => $this->adminUser->email,
        ]);

        $response->assertSessionHasErrors('email');

        // Update with the same email should be allowed
        $response = $this->actingAs($this->adminUser)->put('/users/' . $this->anotherUser->id, [
            'name' => 'Updated Name',
            'email' => $this->anotherUser->email,
        ]);

        $response->assertSessionDoesntHaveErrors('email');
    }

    /** @test */
    public function authenticated_user_can_delete_user()
    {
        $response = $this->actingAs($this->adminUser)->delete('/users/' . $this->anotherUser->id);

        $response->assertRedirect('/users');
        $this->assertDatabaseMissing('users', ['id' => $this->anotherUser->id]);
    }

    /** @test */
    public function cannot_delete_non_existent_user()
    {
        $response = $this->actingAs($this->adminUser)->delete('/users/999');

        $response->assertStatus(404);
    }

    // API Tests
    /** @test */
    public function api_authenticated_user_can_get_users_list()
    {
        $token = $this->adminUser->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/users');

        $response->assertStatus(200);
        $response->assertJsonFragment(['name' => $this->adminUser->name]);
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
            'email' => 'apiuser@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/users', $userData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('users', ['email' => 'apiuser@example.com']);
    }

    /** @test */
    public function api_user_creation_validates_required_fields()
    {
        $token = $this->adminUser->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/users', []);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name', 'email', 'password']);
    }

    /** @test */
    public function api_authenticated_user_can_show_user()
    {
        $token = $this->adminUser->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->getJson('/api/users/' . $this->anotherUser->id);

        $response->assertStatus(200);
        $response->assertJsonFragment(['name' => $this->anotherUser->name]);
    }

    /** @test */
    public function api_authenticated_user_can_update_user()
    {
        $token = $this->adminUser->createToken('test-token')->plainTextToken;

        $updatedData = [
            'name' => 'API Updated Name',
            'email' => 'apiupdated@example.com',
        ];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->putJson('/api/users/' . $this->anotherUser->id, $updatedData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', ['id' => $this->anotherUser->id, 'name' => 'API Updated Name']);
    }

    /** @test */
    public function api_authenticated_user_can_delete_user()
    {
        $token = $this->adminUser->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->deleteJson('/api/users/' . $this->anotherUser->id);

        $response->assertStatus(200);
        $this->assertDatabaseMissing('users', ['id' => $this->anotherUser->id]);
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
                'message' => 'Pengguna tidak ditemukan',
            ]);
    }
}