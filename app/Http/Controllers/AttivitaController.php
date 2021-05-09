<?php

namespace App\Http\Controllers;

use App\Models\Attivita;
use Illuminate\Http\Request;

class AttivitaController extends Controller
{
    private $attivitaModel = null;

    public function __construct(){
        $this->attivitaModel = new Attivita();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req) {
        $attivita = $this->attivitaModel::all();
        return view('attivita/attivita',['attivita' => $attivita]);
    }

    public function getAttivita(int $start, int $length,int $column, $dir, $search){
        $result = ['data' => [], 'statusCode' => 200, $message = ''];
        $result['dataCount'] = $this->attivitaModel->countAttivita($search);
        $result['data'] = $this->attivitaModel->getAttivita($start,$length,$column,$dir,$search);
        return json_encode($result);
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
     * @param  \App\Models\Attivita  $attivita
     * @return \Illuminate\Http\Response
     */
    public function show(Attivita $attivita)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Attivita  $attivita
     * @return \Illuminate\Http\Response
     */
    public function edit(Attivita $attivita)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Attivita  $attivita
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Attivita $attivita)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Attivita  $attivita
     * @return \Illuminate\Http\Response
     */
    public function destroy(Attivita $attivita)
    {
        //
    }
}
