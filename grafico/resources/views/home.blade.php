@extends('adminlte::page')

@section('title', 'AdminLTE')

@section('content_header')
    <div class="container-fluid">
        <div id="app">
            <div class="row">
                <cotacao-component></cotacao-component>
            </div>
        </div>
    </div>
@stop

@section('content')
    <p>You are logged in!</p>
@stop

@section('css')
    <meta name="csrf-token" content="{{ csrf_token() }}">
@stop

@section('js')
<script src="{{ mix('/js/app.js') }}"></script>
@stop