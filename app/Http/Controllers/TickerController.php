<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ticker;
use App\Indicadores;

class TickerController extends Controller
{
    public function store(Request $request)
    {
        $dados = $request->all();
        foreach($dados as $chave){
            $ticker = $chave['ticker'];
            $nome = $chave['nome'];
            $setor = $chave['setor'];
            $segmento = $chave['segmento'];
        }
        $Ticker = new Ticker;

        $Ticker->ticker = $ticker;
        $Ticker->nome = $nome;
        $Ticker->setor = $setor;
        $Ticker->segmento = $segmento;
        $Ticker->data = date('Y-m-d H:i:s');

        $Ticker->save();
        $resp = Ticker::all();
        return response()->json($resp);
    }

    public function verificar(){
        $resposta = Ticker::all();
        // $ind = Indicadores::where()
        $i = 0;
        foreach($resposta as $nome){
            // 0 = não existe indicador
            // 1 = existe e está atualizado
            // 2 = existe e está desatualizado
            $data = $nome->data;
            $dataAtual = date('Y-m-d');
            if($data == $dataAtual){
                if(Ticker::find($nome->id)->indicador == '[]'){
                    $resp[$i][0]= $nome->id;
                    $resp[$i][1]= $nome->ticker;
                    $resp[$i][2]= $data;
                    $resp[$i][3]= 0;
                }else{
                    $resp[$i][0]= $nome->id;
                    $resp[$i][1]= $nome->ticker;
                    $resp[$i][2]= $data;
                    $resp[$i][3]= 1;
                }
            }else{
                $resp[$i][0]= $nome->id;
                $resp[$i][1]= $nome->ticker;
                $resp[$i][2]= $data;
                $resp[$i][3]= 2;
            }
            $i ++;
        }

       return response()->json($resp);
    }
}
