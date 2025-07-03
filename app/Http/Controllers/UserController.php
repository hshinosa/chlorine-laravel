<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Services\UserService;

class UserController extends Controller
{
    /** @var UserService */
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        $response = null;
        try {
            $users = $this->userService->getAll();

            if (request()->wantsJson()) {
                $response = response()->json([
                    'success' => true,
                    'data' => $users,
                ]);
            } else {
                $response = view('users.index', compact('users'));
            }
        } catch (\Exception $e) {
            if (request()->wantsJson()) {
                $response = response()->json([
                    'success' => false,
                    'message' => 'Gagal mengambil data pengguna',
                    'error' => $e->getMessage()
                ], 500);
            } else {
                $response = back()->with('error', 'Gagal mengambil data pengguna');
            }
        }
        return $response;
    }

    public function store(StoreUserRequest $request)
    {
        $response = null;
        try {
            $user = $this->userService->create($request->validated());

            if ($request->wantsJson()) {
                $response = response()->json([
                    'success' => true,
                    'message' => 'Pengguna berhasil dibuat',
                    'data' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'created_at' => $user->created_at,
                    ],
                ], 201);
            } else {
                $response = redirect()->route('users.index')
                    ->with('success', 'Pengguna berhasil dibuat');
            }
        } catch (\Exception $e) {
            if ($request->wantsJson()) {
                $response = response()->json([
                    'success' => false,
                    'message' => 'Gagal membuat pengguna',
                    'error' => $e->getMessage()
                ], 500);
            } else {
                $response = back()->with('error', 'Gagal membuat pengguna');
            }
        }
        return $response;
    }

    public function show(int $id)
    {
        $response = null;
        try {
            $user = $this->userService->findById($id);

            if (!$user) {
                if (request()->wantsJson()) {
                    $response = response()->json([
                        'success' => false,
                        'message' => 'Pengguna tidak ditemukan',
                    ], 404);
                } else {
                    $response = back()->with('error', 'Pengguna tidak ditemukan');
                }
            } else {
                if (request()->wantsJson()) {
                    $response = response()->json([
                        'success' => true,
                        'data' => $user
                    ]);
                } else {
                    $response = view('users.show', compact('user'));
                }
            }
        } catch (\Exception $e) {
            if (request()->wantsJson()) {
                $response = response()->json([
                    'success' => false,
                    'message' => 'Gagal mengambil pengguna',
                    'error' => $e->getMessage()
                ], 500);
            } else {
                $response = back()->with('error', 'Gagal mengambil pengguna');
            }
        }
        return $response;
    }

    public function update(UpdateUserRequest $request, int $id)
    {
        $response = null;
        try {
            $user = $this->userService->update($id, $request->validated());

            if (!$user) {
                if ($request->wantsJson()) {
                    $response = response()->json([
                        'success' => false,
                        'message' => 'User not found'
                    ], 404);
                } else {
                    $response = back()->with('error', 'User not found');
                }
            } else {
                if ($request->wantsJson()) {
                    $response = response()->json([
                        'success' => true,
                        'message' => 'User berhasil diperbarui',
                        'data' => [
                            'id' => $user->id,
                            'name' => $user->name,
                            'email' => $user->email,
                            'updated_at' => $user->updated_at,
                        ],
                    ]);
                } else {
                    $response = redirect()->route('users.index')
                        ->with('success', 'User berhasil diperbarui');
                }
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            if ($request->wantsJson()) {
                $response = response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $e->errors()
                ], 422);
            } else {
                $response = back()->withErrors($e->errors())->withInput();
            }
        } catch (\Exception $e) {
            if ($request->wantsJson()) {
                $response = response()->json([
                    'success' => false,
                    'message' => 'Failed to update user',
                    'error' => $e->getMessage()
                ], 500);
            } else {
                $response = back()->with('error', 'Failed to update user');
            }
        }
        return $response;
    }

    public function destroy(int $id)
    {
        $response = null;
        try {
            $deleted = $this->userService->delete($id);

            if (!$deleted) {
                if (request()->wantsJson()) {
                    $response = response()->json([
                        'success' => false,
                        'message' => 'Pengguna tidak ditemukan atau gagal dihapus',
                    ], 404);
                } else {
                    $response = back()->with('error', 'Pengguna tidak ditemukan atau gagal dihapus');
                }
            } else {
                if (request()->wantsJson()) {
                    $response = response()->json([
                        'success' => true,
                        'message' => 'Pengguna berhasil dihapus',
                    ]);
                } else {
                    $response = redirect()->route('users.index')
                        ->with('success', 'Pengguna berhasil dihapus');
                }
            }
        } catch (\Exception $e) {
            if (request()->wantsJson()) {
                $response = response()->json([
                    'success' => false,
                    'message' => 'Gagal menghapus pengguna',
                    'error' => $e->getMessage()
                ], 500);
            } else {
                $response = back()->with('error', 'Gagal menghapus pengguna');
            }
        }
        return $response;
    }
}
