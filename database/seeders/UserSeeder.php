<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(){
        User::factory(30)->create();
//        for($i = 0; $i<30; $i++){
//            $sql = "insert into users (name, email, password, created_at) values (?,?,?,?)";
//            $name = Str::random(10);
//            DB::insert($sql, [
//                $name,
//                "$name@gmail.com",
//                Hash::make('qwerty'),
//                Carbon::now(),
//                Carbon::now()
//            ]);
//        }
    }
}
