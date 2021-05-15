<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Auth;

/**
 * App\Models\Album
 *
 * @property int $id
 * @property string $album_name
 * @property string|null $description
 * @property int $user_id
 * @property string $album_thumb
 * @property string|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\AlbumFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Album newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Album newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Album query()
 * @method static \Illuminate\Database\Eloquent\Builder|Album whereAlbumName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Album whereAlbumThumb($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Album whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Album whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Album whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Album whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Album whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Album whereUserId($value)
 * @mixin \Eloquent
 */
class Album extends Model
{
    use HasFactory;
    protected $table = '02_albums';

    public function getAlbumsByUser(){
        $sql = "SELECT * from 02_albums where user_id = ? order by id desc";
        $where['user_id'] = Auth::user()->id;
        return DB::select($sql,array_values($where));
    }

    public function getAlbums(Request $req){
        $queryBuilder = DB::table($this->table);
        if($req->has('id'))
            $queryBuilder->where('id','=', $req->input('id'));
        if($req->has('album_name'))
            $queryBuilder->where('album_name','like', '%'.$req->input('album_name').'%');
        $queryBuilder->orderBy('id','desc');
        return $queryBuilder->get();
    }

    public function deleteAlbum2(int $idAlbum){
        $sql = "DELETE FROM 02_albums where id = :id";
        return DB::delete($sql,['id' => $idAlbum]);
    }

    public function deleteAlbum(int $idAlbum){
        return  DB::table($this->table)->delete($idAlbum);
    }

}
