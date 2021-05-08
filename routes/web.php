<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{HomeController, AlbumsController};
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
*/

Route::get('/', [HomeController::class,'index']);
Route::get('/users', [HomeController::class,'users']);
Route::get('/albums', [AlbumsController::class,'index']);
Route::get('/albums/{id}/delete', [AlbumsController::class,'delete']);
