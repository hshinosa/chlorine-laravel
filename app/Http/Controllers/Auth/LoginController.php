<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /**
     * Show the application's login form.
     *
     * @return \Inertia\Response
     */
    public function showLoginForm()
    {
        return Inertia::render('Auth/Login', [
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an authentication attempt.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if (Auth::attempt(
            $request->only(['email', 'password']),
            $request->boolean('remember')
        )) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Login Berhasil',
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                    ],
                    'token' => $token,
                    'token_type' => 'Bearer',
                ], 200);
            }

            $request->session()->regenerate();
            return redirect()->intended('dashboard')->with([
                'success' => 'Login Berhasil'
            ]);
        }

        if ($request->wantsJson()) {
            return response()->json(
                ['message' => 'Kredensial tidak valid'],
                401
            );
        }
        
        throw ValidationException::withMessages([
            'email' => 'Kredensial tidak valid',
        ]);
    }

    /**
     * Log the user out of the application.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        if ($request->wantsJson()) {
            if ($request->user() && $request->user()->currentAccessToken()) {
                $request->user()->currentAccessToken()->delete();
                
                return response()->json([
                    'success' => true,
                    'message' => 'Logout Berhasil',
                ], 200);
            }

            return response()->json([
                'success' => false,
                'message' => 'Token tidak valid atau sudah tidak aktif'
            ], 401);
        }

        // Jika request dari Web
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}
