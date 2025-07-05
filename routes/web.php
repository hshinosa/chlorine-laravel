<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// News Routes (Front-end only)
Route::get('/', function () {
    return Inertia::render('News/Home');
})->name('news.home');

Route::get('/artikel/{slug}', function ($slug) {
    return Inertia::render('News/Article', ['slug' => $slug]);
})->name('news.article');

Route::get('/kategori/{category}', function ($category) {
    return Inertia::render('News/Category', ['category' => $category]);
})->name('news.category');

// Admin Dashboard Routes
Route::get('/admin', [DashboardController::class, 'index'])->name('dashboard');

Route::get('/admin/dashboard', function () {
    return redirect('/admin');
});

Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('/categories', CategoryController::class)->names('categories');
    Route::resource('/users', UserController::class)->names('users');
});

require __DIR__.'/auth.php';
