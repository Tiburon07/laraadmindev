<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Auth;

Route::get('/', function(){
  dd(Auth::user());
});
