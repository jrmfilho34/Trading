<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Indicadores;
use App\Ticker;

class IndicadoresController extends Controller
{
    public function consulta(){
        $resposta = Indicadores::all();
        return response()->json($resposta);
    }
    public function armazena(Request $request){
        $nome = $request->get('nome');
        $indicadores = $request->get('resp');
        $id = $request->get('id');
        $data = $request->get('data');

        $Indi = new Indicadores;
        $Indi->ticker_id = $id;
        $Indi->nome = $nome;
        $Indi->acao = $indicadores;
        $Indi->save();

        $Ticker = Ticker::find($id);
        $Ticker->data = date('Y-m-d');
        $Ticker->save();

        $resposta = Indicadores::all();

        return response()->json($resposta);
    }
    public function deletar(Request $request){
        $id = $request->get('dados');
        $deletar = Indicadores::find($id);
        $deletar->delete();
        $resposta = Indicadores::all();
        return response()->json($resposta);
    }
}
