<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Authentication
Route::post('login', [LoginController::class, 'login'])->name('api.auth.login');
Route::post('logout', [LoginController::class, 'logout'])->middleware('auth:sanctum')->name('api.auth.logout');

// CRUD User
Route::middleware('auth:sanctum')->group(function () {
    Route::get('users', [UserController::class, 'index'])->name('api.users.index');
    Route::post('users', [UserController::class, 'store'])->name('api.users.store');
    Route::get('users/{id}', [UserController::class, 'show'])->name('api.users.show');
    Route::put('users/{id}', [UserController::class, 'update'])->name('api.users.update');
    Route::delete('users/{id}', [UserController::class, 'destroy'])->name('api.users.destroy');
});