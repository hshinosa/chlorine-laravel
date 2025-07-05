<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_view_login_form()
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
    }

    /** @test */
    public function user_can_login_with_valid_credentials()
    {
        $user = User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->post('/login', [
            'email' => 'test@example.com',
            'password' => 'password123',
        ]);

        $response->assertRedirect('/');
        $this->assertAuthenticatedAs($user);
    }

    /** @test */
    public function user_cannot_login_with_invalid_credentials()
    {
        User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->post('/login', [
            'email' => 'test@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
    }

    /** @test */
    public function user_cannot_login_with_empty_credentials()
    {
        $response = $this->post('/login', [
            'email' => '',
            'password' => '',
        ]);

        $response->assertSessionHasErrors(['email', 'password']);
        $this->assertGuest();
    }

    /** @test */
    public function user_cannot_login_with_invalid_email_format()
    {
        $response = $this->post('/login', [
            'email' => 'invalid-email',
            'password' => 'password123',
        ]);

        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
    }

    /** @test */
    public function authenticated_user_can_logout()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $response->assertRedirect('/');
        $this->assertGuest();
    }

    /** @test */
    public function api_user_can_login_with_valid_credentials()
    {
        User::factory()->create([
            'email' => 'api@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'api@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'user' => ['id', 'name', 'email'],
                'token',
                'token_type',
            ]);
    }

    /** @test */
    public function api_user_cannot_login_with_invalid_credentials()
    {
        User::factory()->create([
            'email' => 'api@example.com',
            'password' => bcrypt('password123'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'api@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401)
            ->assertJson(['message' => 'Kredensial tidak valid']);
    }

    /** @test */
    public function api_authenticated_user_can_logout()
    {
        $user = User::factory()->create();
        $token = $user->createToken('test-token')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $token,
        ])->postJson('/api/logout');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Logout Berhasil',
            ]);
    }
}
