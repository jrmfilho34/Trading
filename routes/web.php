<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/* interface */

Route::get('/', function () {
    return view('interface');
});

/* criar ticker */

Route::post('/criarticker','TickerController@store');

/* Verficar se o tiker está atualizado ou se existe*/

Route::get('/verificar','TickerController@verificar');

/* Armazenar indicadores */

Route::post('/armazena','IndicadoresController@armazena');

/* consulta indicadores */

Route::get('/consulta','IndicadoresController@consulta');

/* Deletar Indicadores */

Route::get('/deletar','IndicadoresController@deletar');

/* mini indice */

Route::get('/mini','MiniIndiciController@show');

/* mini indice */

Route::get('/miniIndex','MiniIndiciController@index');