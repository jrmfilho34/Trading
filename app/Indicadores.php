<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Indicadores extends Model
{
    protected $table = 'indicadores';

    protected $fillable = ['tiker_id','nome','acao','data'];

    public function ticker()
    {
        return $this->belongsTo('App\Ticker');
    }

}
