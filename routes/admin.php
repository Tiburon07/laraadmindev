<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;

//Route::get('/{name?}', function($name = ''){
//    return "ciao $name";
//});

Route::get('/', [HomeController::class,'index']);
