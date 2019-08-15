<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/app.css">
    <link rel="stylesheet" href="/icofont/icofont.min.css">
    <title>Trading!</title>
  </head>
  <body>
    <div id="app">
        <menu-component></menu-component>
        <acoes-component></acoes-component>
    </div>
    <script src="/js/app.js"></script>
  </body>
</html>