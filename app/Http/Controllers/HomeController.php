<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\User;

class HomeController{
    public function index(){
        return view('home', ['view' => 'home']);
    }

    public function albums(){
        return Album::paginate(25);
    }
    public function users(){
        return User::paginate(25);
    }
}
