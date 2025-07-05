<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_view_registration_form()
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    /** @test */
    public function user_can_register_with_valid_data()
    {
        Event::fake();

        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->post('/register', $userData);

        $response->assertRedirect(route('dashboard'));
        
        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);

        // Verify user is authenticated after registration
        $user = User::where('email', 'john@example.com')->first();
        $this->assertAuthenticated();
        $this->assertEquals($user->id, auth()->id());

        // Verify password is hashed correctly
        $this->assertTrue(Hash::check('password123', $user->password));

        // Verify Registered event was dispatched
        Event::assertDispatched(Registered::class, function ($event) use ($user) {
            return $event->user->id === $user->id;
        });
    }

    /** @test */
    public function user_cannot_register_with_missing_name()
    {
        $userData = [
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->post('/register', $userData);

        $response->assertSessionHasErrors(['name']);
        $this->assertGuest();
        $this->assertDatabaseEmpty('users');
    }

    /** @test */
    public function user_cannot_register_with_missing_email()
    {
        $userData = [
            'name' => 'John Doe',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->post('/register', $userData);

        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
        $this->assertDatabaseEmpty('users');
    }

    /** @test */
    public function user_cannot_register_with_invalid_email_format()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'invalid-email-format',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->post('/register', $userData);

        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
        $this->assertDatabaseEmpty('users');
    }

    /** @test */
    public function user_cannot_register_with_existing_email()
    {
        // Create existing user
        User::factory()->create(['email' => 'existing@example.com']);

        $userData = [
            'name' => 'John Doe',
            'email' => 'existing@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->post('/register', $userData);

        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
        
        // Verify only one user exists with this email
        $this->assertEquals(1, User::where('email', 'existing@example.com')->count());
    }

    /** @test */
    public function user_cannot_register_with_missing_password()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password_confirmation' => 'password123',
        ];

        $response = $this->post('/register', $userData);

        $response->assertSessionHasErrors(['password']);
        $this->assertGuest();
        $this->assertDatabaseEmpty('users');
    }

    /** @test */
    public function user_cannot_register_with_password_confirmation_mismatch()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'differentpassword',
        ];

        $response = $this->post('/register', $userData);

        $response->assertSessionHasErrors(['password']);
        $this->assertGuest();
        $this->assertDatabaseEmpty('users');
    }

    /** @test */
    public function user_cannot_register_with_short_password()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => '123',
            'password_confirmation' => '123',
        ];

        $response = $this->post('/register', $userData);

        $response->assertSessionHasErrors(['password']);
        $this->assertGuest();
        $this->assertDatabaseEmpty('users');
    }

    /** @test */
    public function user_cannot_register_with_name_exceeding_max_length()
    {
        $userData = [
            'name' => str_repeat('a', 256), // 256 characters, exceeds max 255
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->post('/register', $userData);

        $response->assertSessionHasErrors(['name']);
        $this->assertGuest();
        $this->assertDatabaseEmpty('users');
    }

    /** @test */
    public function user_cannot_register_with_email_exceeding_max_length()
    {
        $longEmail = str_repeat('a', 240) . '@example.com'; // Exceeds 255 chars

        $userData = [
            'name' => 'John Doe',
            'email' => $longEmail,
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->post('/register', $userData);

        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
        $this->assertDatabaseEmpty('users');
    }

    /** @test */
    public function email_is_converted_to_lowercase_during_registration()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'JOHN@EXAMPLE.COM',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->post('/register', $userData);

        $response->assertRedirect(route('dashboard'));
        
        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@example.com', // Should be lowercase
        ]);

        $this->assertDatabaseMissing('users', [
            'email' => 'JOHN@EXAMPLE.COM', // Should not exist in uppercase
        ]);
    }

    /** @test */
    public function registration_form_preserves_old_input_on_validation_error()
    {
        $userData = [
            'name' => 'John Doe',
            'email' => 'invalid-email',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->post('/register', $userData);

        $response->assertSessionHasErrors(['email']);
        $this->assertEquals('John Doe', old('name'));
        $this->assertEquals('invalid-email', old('email'));
        // Password should not be preserved for security
        $this->assertNull(old('password'));
    }

    /** @test */
    public function authenticated_user_cannot_access_registration_form()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/register');

        // Should redirect away from registration if already authenticated
        $response->assertRedirect();
    }
}
