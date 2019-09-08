<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dia extends Model
{
    protected $table = 'diario';

    protected $fillable = ['Data','Hora','Abertura','Maxima','Minima','Fechamento','MA89','MA','VOL'];

}
