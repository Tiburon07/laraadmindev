<?php

use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\AlbumsController;
use \App\Http\Controllers\AdminController;
use \App\Http\Controllers\admin\AdminUserController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';

//HOME
Route::group(
    ['middleware' => 'auth','prefix' => 'home'],
    function (){
        Route::get('/', function () { return view('home'); })->name('home');
    }
);

//ALBUM
Route::group(
    ['middleware' => 'auth','prefix' => 'albums'],
    function (){
        Route::get('/', [AlbumsController::class, 'index'])->name('albums');
        Route::get('/{id}/delete', [AlbumsController::class, 'delete']);
    }
);

//ADMIN
Route::group(
    ['middleware' => ['auth','verifyIsAdmin'],'prefix' => 'admin'],
    function (){
        Route::get('/', [AdminUserController::class,'index'])->name('user-list');
        Route::get('/getUsers/{start}/{length}/{col}/{dir}/{search}', [AdminUserController::class, 'getUsers']);
    }
);
