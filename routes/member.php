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

    // İşletmeler
    Route::get('/companies/{slug}/businesses', [\App\Http\Controllers\Member\BusinessController::class, 'index'])->name('businesses.index');
    Route::get('/companies/{slug}/businesses/create', [\App\Http\Controllers\Member\BusinessController::class, 'create'])->name('businesses.create');
    Route::post('/companies/{slug}/businesses', [\App\Http\Controllers\Member\BusinessController::class, 'store'])->name('businesses.store');
    Route::get('/companies/{slug}/businesses/{id}', [\App\Http\Controllers\Member\BusinessController::class, 'show'])->name('businesses.show');
    Route::get('/companies/{slug}/businesses/{id}/edit', [\App\Http\Controllers\Member\BusinessController::class, 'edit'])->name('businesses.edit');
    Route::post('/companies/{slug}/businesses/{id}', [\App\Http\Controllers\Member\BusinessController::class, 'update'])->name('businesses.update');
    Route::delete('/companies/{slug}/businesses/{id}', [\App\Http\Controllers\Member\BusinessController::class, 'destroy'])->name('businesses.destroy');

    // Kullanıcı arama endpoint'i
    Route::get('/search-users', [CompanyController::class, 'searchUsers'])->name('search.users');
});
