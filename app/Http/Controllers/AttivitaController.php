<?php

namespace App\Http\Controllers;

use App\Models\Attivita;
use App\Models\Federazione;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AttivitaController extends Controller
{
    private $attivitaModel = null;

    public function __construct(){
        $this->attivitaModel = new Attivita();
    }

    public function index(Request $req) {
        $attivita = $this->attivitaModel::all();
        return view('attivita/attivita',['attivita' => $attivita, 'view' => 'attivita_view']);

    }

    public function getAttivita(int $start, int $length,int $column, $dir, $search){
        $result = ['data' => [], 'statusCode' => 200, 'message' => ''];
        $result['dataCount'] = $this->attivitaModel->countAttivita($search);
        $result['data'] = $this->attivitaModel->getAttivita($start,$length,$column,$dir,$search);
        return json_encode($result);
    }

    public function getUsersAttivita(){
        $result = ['data' => [], 'statusCode' => 200, 'message' => ''];
        $result['data'] = User::all(['id','name']);
        return json_encode($result);
    }

    public function getFederazioni(){
        $result = ['data' => [], 'statusCode' => 200, 'message' => ''];
        $result['data'] = Federazione::all();
        return json_encode($result);
    }

    public function assegna(Request $req){
        $res = $this->attivitaModel->storeAttivita($req->all());
        return response()->json($res);
    }

    public function getTaskBookmark(int $idAttivita){
        $res = $this->attivitaModel->getTaskBookmark($idAttivita);
        return response()->json($res);
    }
}
