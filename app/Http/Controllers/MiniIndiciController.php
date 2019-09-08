<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Dia;
use App\Hora;
use App\QuizeMinutos;
use App\UmMinutos;

class MiniIndiciController extends Controller
{
    public function index(){
        return view('miniindici');
    }
    public function show(Request $request){
        $tempo = $request->get('tempo');
        $periodo = $request->get('periodo');
        if($tempo == 24){
            $Dia = Dia::all()->take($periodo);
        }
        if($tempo == 60){
            $Dia = Hora::all()->take($periodo);
        }
        if($tempo == 15){
            $Dia = QuizeMinutos::all()->take($periodo);
        }
        if($tempo == 1){
            $Dia = UmMinutos::all()->take($periodo);
        }
        
        // foreach($Dia as $dia){
        //     echo $dia->Maxima.'<br>';
        // }
        return response()->json($Dia);
    }
    
}
