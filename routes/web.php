<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\LanguageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('language/{lang}', [LanguageController::class, 'switchLang'])->name('language.switch');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->middleware('role:admin')->group(function () {
        Route::resource('users', UserController::class);

        // Rol yönetimi rotaları
        Route::get('roles', function () {
            return Inertia::render('admin/roles/index');
        })->name('roles.index')->middleware('permission:view_role');

        Route::get('roles/create', function () {
            return Inertia::render('admin/roles/create');
        })->name('roles.create')->middleware('permission:create_role');
    });

    // Editör rotaları
    Route::prefix('editor')->name('editor.')->middleware('role:editor,admin')->group(function () {
        Route::get('dashboard', function () {
            return Inertia::render('editor/dashboard');
        })->name('dashboard');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
