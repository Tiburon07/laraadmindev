<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Auth;

class Album extends Model
{
    use HasFactory;
    protected $table = '02_albums';

    public function getAlbumsByUser(){
        $sql = "SELECT * from 02_albums where user_id = ? ";
        $where['user_id'] = Auth::user()->id;
        return DB::select($sql,array_values($where));
    }

    public function deleteAlbum(int $idAlbum){
        $sql = "DELETE FROM 02_albums where id = :id";
        return DB::delete($sql,['id' => $idAlbum]);
    }

}
