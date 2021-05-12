<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use DB;

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
