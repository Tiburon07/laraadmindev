<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\Attivita
 *
 * @property int $id
 * @property string $title
 * @property string $fsn
 * @property string|null $description
 * @property int $user_id
 * @property int $status_id
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\AttivitaFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Attivita newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Attivita newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Attivita query()
 * @method static \Illuminate\Database\Eloquent\Builder|Attivita whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attivita whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attivita whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attivita whereFsn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attivita whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attivita whereStatusId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attivita whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attivita whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Attivita whereUserId($value)
 * @mixin \Eloquent
 */
class Attivita extends Model
{
    use HasFactory;
    protected $table = '01_attivita';

    public function getAttivita($start,$length,$column,$dir,$search){
        $search = ($search === '*') ? '' : $search;
        if($column == 5) $column = 'DATE(created_at)';
        $sql = "SELECT  id, title, description, '' as action, DATE_FORMAT(created_at, '%d/%m/%Y %H:%i:%s') as created_at, status_id, fsn
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

    public function storeAttivita($attivita){
        $data['title'] = $attivita['title'];
        $data['fsn'] = $attivita['fsn'];
        $data['description'] = $attivita['descr'];
        $data['user_id'] = $attivita['user_id'];
        $data['status_id'] = 1;
        $data['created_at'] = date('Y-m-d H:i:s');
        $query = " insert into 01_attivita (
                          title,
                          fsn,
                          description,
                          user_id,
                          status_id,
                          created_at)
                   values (
                           :title,
                           :fsn,
                           :description,
                           :user_id,
                           :status_id,
                           :created_at)";
        return DB::insert($query, $data);
    }

    public function getTaskBookmark(int $idAttivita){
        $data['tasks'] = Task::all()->where('attivita_id', '=', $idAttivita);
        $data['bookmarks'] = Bookmark::all()->where('attivita_id', '=', $idAttivita);
        return $data;
    }
}
