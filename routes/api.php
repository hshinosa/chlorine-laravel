<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

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

// CRUD Category
Route::middleware('auth:sanctum')->group(function () {
    Route::get('categories', [CategoryController::class, 'index'])->name('api.categories.index');
    Route::post('categories', [CategoryController::class, 'store'])->name('api.categories.store');
    Route::get('categories/{id}', [CategoryController::class, 'show'])->name('api.categories.show');
    Route::put('categories/{id}', [CategoryController::class, 'update'])->name('api.categories.update');
    Route::delete('categories/{id}', [CategoryController::class, 'destroy'])->name('api.categories.destroy');
});
