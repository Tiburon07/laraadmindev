<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlbumsController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\admin\AdminUserController;
use App\Http\Controllers\AttivitaController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';

//HOME
Route::group(
    ['middleware' => 'auth','prefix' => ''],
    function (){
        Route::get('/', function(){ return view('home'); })->name('home');
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

//ATTIVITA
Route::group(
    ['middleware' => 'auth','prefix' => 'attivita'],
    function (){
        Route::get('/', [AttivitaController::class, 'index'])->name('attivita-list');
        Route::get('/getFederazioni', [AttivitaController::class, 'getFederazioni']);
        Route::get('/getUsersAttivita', [AttivitaController::class, 'getUsersAttivita']);
        Route::get('/getAttivita/{start}/{length}/{col}/{dir}/{search}', [AttivitaController::class, 'getAttivita']);
    }
);

//ALBUM
Route::group(
    ['middleware' => 'auth','prefix' => 'albums'],
    function (){
        Route::get('/', [AlbumsController::class, 'index'])->name('album-list');
        Route::get('/{id}/delete', [AlbumsController::class, 'delete']);
    }
);

