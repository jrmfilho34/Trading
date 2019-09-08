<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuizeMinutos extends Model
{
    protected $table = 'quinzeminutos';

    protected $fillable = ['Data','Hora','Abertura','Maxima','Minima','Fechamento','MA89','MA','VOL'];
}
