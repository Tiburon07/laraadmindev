<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AlbumsController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\admin\AdminUserController;
use App\Http\Controllers\AttivitaController;
use App\Events\Message;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
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
        Route::get('/chat', function(){ return view('chat'); })->name('chat');
        Route::post('/send-message', function(Request $request){
            event(new Message($request->input('username'), $request->input('message')));
            return ["success" => true];
        });
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
    ['middleware' => ['auth','verifyIsAdmin'],'prefix' => 'attivita'],
    function (){
        Route::get('/', [AttivitaController::class, 'index'])->name('attivita-list');
        Route::get('/getFederazioni', [AttivitaController::class, 'getFederazioni']);
        Route::get('/getUsersAttivita', [AttivitaController::class, 'getUsersAttivita']);
        Route::get('/getAttivita/{start}/{length}/{col}/{dir}/{search}', [AttivitaController::class, 'getAttivita']);
        Route::post('/assegna', [AttivitaController::class, 'assegna']);
    }
);

//ALBUM
Route::group(
    ['middleware' => 'auth','prefix' => 'albums'],
    function (){
        Route::get('/', [AlbumsController::class, 'index'])->name('album-list');
        Route::get('/show', [AlbumsController::class, 'show']);
        Route::get('/index2', [AlbumsController::class, 'index2']);
//        Route::get('/{id}/delete', [AlbumsController::class, 'delete']);

        Route::get('/edit', [AlbumsController::class, 'edit'])->name('album-edit');
        Route::get('/delete', [AlbumsController::class, 'delete'])->name('album-delete');
        Route::get('/create', [AlbumsController::class, 'create'])->name('album-create');
        Route::post('/store', [AlbumsController::class, 'store'])->name('album-store');
        Route::post('/update', [AlbumsController::class, 'update'])->name('album-update');
    }
);

