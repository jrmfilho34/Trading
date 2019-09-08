var STR =(function(){

    var lucro = async function (dados){
        // // 1 step: Ler as variaveis 
        // var comprar = [];
        // var vender = [];
        // var RSI = [ {"periodo":1, "valor": 1}];
        // var MM20 = [ {"periodo":1, "valor": 1}];
        // var MM50 = [ {"periodo":1, "valor": 1}];
        // RSI.forEach((element,i)=>{
        //     console.log('RSI',element);
        //     console.log('MM20',MM20[i]);
        //     console.log('MM50',MM50[i]);
        //     //queda
        //     if(MM20<MM50){
        //         if(RSI < 'variavel a definir'){
        //             // compra
        //             comprar.push('preço da acao');
        //         }
        //     }
        //     //alta
        //     if(MM20>MM50){
        //         if(RSI > 'variavel a definir'){
        //             vender.push('preco da acao')
        //         }
        //     }
        // })

        return 'deu certo';
    }
    var rsi = function(ticks) {
        // seta a variavel lastClosePx com o primeiro preco da ação
        var lastClosePx = ticks[0];
        // cria duas variaveis, days é o periodo das medias de ganho e perda
        var days = [14, 12, 24], result = {};
        // for para percorrer os precos
        for (var i = 0 ; i < ticks.length; i ++) {
          // atribui a variavel c o preço atual
          var c = ticks[i];
          // 
          var m = Math.max(c-lastClosePx, 0), a = Math.abs(c-lastClosePx);
          for (var di = 0; di < days.length; di++) {
            var d = days[di];
            if (!result.hasOwnProperty("rsi"+d)) {
              result["lastSm"+d] = result["lastSa"+d]  = 0;
              result["rsi"+d] = [0];
            } else {
              result["lastSm"+d] = (m + (d - 1) * result["lastSm"+d]) / d;
              result["lastSa"+d] = (a + (d - 1) * result["lastSa"+d]) / d;
              if (result["lastSa"+d] != 0) {
                result["rsi"+d].push(result["lastSm"+d] / result["lastSa"+d] * 100);
              } else {
                result["rsi"+d].push(0);
              }
            }
          }
          lastClosePx = c;
        }
        return {"rsi14": result["rsi14"], "rsi12": result["rsi12"], "rsi24": result["rsi24"]};
      };
    return {"STR": lucro,"RSI":rsi,"lucro":lucro};

})();

export default STR;
