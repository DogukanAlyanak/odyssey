<?php

use App\Http\Controllers\Member\CompanyController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('member')->name('member.')->group(function () {
    // Şirketler
    Route::get('/my-companies', [CompanyController::class, 'index'])->name('companies.index');
    Route::get('/my-companies/create', [CompanyController::class, 'create'])->name('companies.create');
    Route::post('/my-companies', [CompanyController::class, 'store'])->name('companies.store');
    Route::get('/my-companies/{slug}', [CompanyController::class, 'show'])->name('companies.show');
    Route::get('/my-companies/{slug}/edit', [CompanyController::class, 'edit'])->name('companies.edit');
    Route::post('/my-companies/{slug}', [CompanyController::class, 'update'])->name('companies.update');
    Route::delete('/my-companies/{slug}', [CompanyController::class, 'destroy'])->name('companies.destroy');

    // Kullanıcı arama endpoint'i
    Route::get('/search-users', [CompanyController::class, 'searchUsers'])->name('search.users');
});
