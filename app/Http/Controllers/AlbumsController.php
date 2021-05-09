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
        return redirect()->back();
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
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Album  $album
     * @return \Illuminate\Http\Response
     */
    public function edit(Album $album)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Album  $album
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Album $album)
    {
        //
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
