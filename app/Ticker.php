<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticker extends Model
{
    protected $table = 'tickers';

    protected $fillable = ['ticker','nome','setor','segmento','data'];

    public function indicador()
    {
        return $this->hasMany('App\Indicadores');
    }
}
