<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/{name?}', function($name = ''){
    return "hello $name";
});
