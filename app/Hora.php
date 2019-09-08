<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hora extends Model
{
    protected $table = 'umahora';

    protected $fillable = ['Data','Hora','Abertura','Maxima','Minima','Fechamento','MA89','MA','VOL'];
}
