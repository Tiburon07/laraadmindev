<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Auth;

class AlbumsController extends Controller
{
    private $albumModel = null;

    public function __construct(){
        $this->albumModel = new Album();
    }

    public function index(Request $req) {
        $albums = $this->albumModel->getAlbumsByUser();
        return view('albums/albums',['albums' => $albums]);
    }

    public function delete(int $idAlbum){
        $albums = $this->albumModel->deleteAlbum($idAlbum);
        return $albums;//redirect()->back();
    }

    public function delete2(int $idAlbum){
        $albums = $this->albumModel->deleteAlbum($idAlbum);
        return $albums;//redirect()->back();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Album  $album
     * @return \Illuminate\Http\Response
     */
    public function show(Album $album)
    {
        $sql = 'SELECT * FROM 02_albums where id = :id';
        return DB::select($sql, ['album'=>$album]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Album  $album
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $req)
    {
        $id = $req->get('album');
        $sql = 'SELECT * FROM 02_albums where id = :id';
        $albumEdit =  DB::selectOne($sql, ['id'=>$id]);
        return view('albums/edit_album')->withAlbum($albumEdit);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Album  $album
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req)
    {
        $data = $req->only(['album_name', 'album_descr', 'album']);
        $query = ' UPDATE 02_albums set album_name=:album_name, description=:album_descr where id = :album';
        $res = DB::update($query, array_values($data));
        $message = 'Album con id='.$data['album'];
        $message .= $res ? ' aggiornato ' : ' non aggiornato';
        session()->flash('message',$message);
        return redirect()->route('album-edit');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Album  $album
     * @return \Illuminate\Http\Response
     */
    public function destroy(Album $album)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index2(Request $req)
    {
        $sql = "SELECT * from 02_albums where user_id = ? ";
        $where['user_id'] = Auth::user()->id;
        if($req->has('id')){
            $where['id'] = $req->get('id');
            $sql .= ' AND id = ?';
        }

        if($req->has('album_name')){
            $where['album_name'] = $req->get('album_name');
            $sql .= ' AND  album_name = ?';
        }

        $albums = DB::select($sql,array_values($where));
        return view('albums/albums',['albums' => $albums]);
    }
}
