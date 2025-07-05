<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Services\UserService;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /** @var \App\Services\UserService */
    protected $userService;

    /**
     * Create a new controller instance.
     *
     * @param \App\Services\UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response|\Inertia\Response
     */
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
                $response = Inertia::render('Users/Index', [
                    'users' => $users,
                    'auth' => [
                        'user' => auth()->user(),
                    ],
                ]);
            }
        } catch (\Exception $e) {
            if (request()->wantsJson()) {
                $response = response()->json([
                    'success' => false,
                    'message' => 'Gagal mengambil data pengguna',
                    'error' => $e->getMessage()
                ], 500);
            } else {
                $response = back()->with(
                    'error',
                    'Gagal mengambil data pengguna'
                );
            }
        }
        return $response;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create(): Response
    {
        return Inertia::render('Users/Create', [
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
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

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response|\Inertia\Response
     */
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
                    $response = back()->with(
                        'error',
                        'Pengguna tidak ditemukan'
                    );
                }
            } else {
                if (request()->wantsJson()) {
                    $response = response()->json([
                        'success' => true,
                        'data' => $user
                    ]);
                } else {
                    $response = Inertia::render('Users/Show', [
                        'user' => $user,
                        'auth' => [
                            'user' => auth()->user(),
                        ],
                    ]);
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

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function edit(int $id): Response
    {
        $user = $this->userService->findById($id);
        
        if (!$user) {
            abort(404, 'Pengguna tidak ditemukan');
        }

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param int $id
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
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
        } catch (ValidationException $e) {
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

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
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
                    $response = back()->with(
                        'error',
                        'Pengguna tidak ditemukan atau gagal dihapus'
                    );
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
