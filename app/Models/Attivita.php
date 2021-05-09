<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;

class Attivita extends Model
{
    use HasFactory;
    protected $table = '01_attivita';

    public function getAttivita($start,$length,$column,$dir,$search){
        $search = ($search === '*') ? '' : $search;
        $sql = "SELECT  id, title, description, '' as action, created_at, status_id, fsn
                    FROM 01_attivita
                    where title like '%$search%'
                    ORDER BY $column $dir
                    LIMIT $length OFFSET $start";
        return DB::select($sql);
    }

    public function countAttivita($search){
        $search = ($search === '*') ? '' : $search;
        $sql = "SELECT  count(id) as count
                    FROM 01_attivita
                    where title like '%$search%'";
        return DB::selectOne($sql)->count;
    }
}
