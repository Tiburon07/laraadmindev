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

    public function index3(Request $req) {
        $albums = $this->albumModel->getAlbumsByUser();
        return view('albums/albums',['albums' => $albums]);
    }

    public function index(Request $req) {
        $albums = $this->albumModel->getAlbums($req);
        return view('albums/albums',['albums' => $albums]);
    }

    public function delete(Request $req){
        $id = $req->get('album');
        $albums = $this->albumModel->deleteAlbum($id);
        $message = 'Album con id : '.$id;
        $message .= $albums ? ' eliminato ' : ' non eliminato';
        session()->flash('message',$message);
        return redirect()->route('album-list');
    }

    public function delete2(Request $req){
        $id = $req->get('album');
        $albums = $this->albumModel->deleteAlbum($id);
        $message = 'Album con id : '.$id;
        $message .= $albums ? ' eliminato ' : ' non eliminato';
        session()->flash('message',$message);
        return redirect()->route('album-list');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(){
        return view('albums/create-album');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->only(['album_name', 'album_descr']);
        $data['user_id'] = 81;
        $data['album_thumb'] = 'http';
        $query = "insert into 02_albums (user_id,album_name,description, album_thumb) values (:user_id,:album_name,:album_descr,:album_thumb)";
        $res = DB::insert($query, $data);
        $message = 'Album '.$data['album_name'];
        $message .= $res ? ' creato ' : ' non creato';
        session()->flash('message',$message);
        return redirect()->route('album-list');
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
        $data['album_thumb']='';
        if($req->hasFile('album_thumb')){
            $file = $req->file('album_thumb');
//            $fileName = $data['album'].'.'.$file->extension();
            $fileName=$file->store(env('IMG_DIR'));
            $data['album_thumb'] = (string) $fileName;
        }
//        dd($data);
        $query = "UPDATE 02_albums set album_name='{$data['album_name']}', description='{$data['album_name']}', album_thumb='{$data['album_thumb']}' where id = {$data['album']}";
        $res = DB::update($query);//, array_values($data));
        $message = 'Album con id : '.$data['album'];
        $message .= $res ? ' aggiornato ' : ' non aggiornato';
        session()->flash('message',$message);
        return redirect()->route('album-list');
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
