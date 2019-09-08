<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UmMinutos extends Model
{
    protected $table = 'umminuto';

    protected $fillable = ['Data','Hora','Abertura','Maxima','Minima','Fechamento','MA89','MA','VOL'];
}
