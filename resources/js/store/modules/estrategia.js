var STR =(function(){

    var lucro = async function (dados){
        return 'deu certo';
    }
    var rsi = function(ticks) {
        var lastClosePx = ticks[0];
        var days = [14, 12, 24], result = {};
        for (var i = 0 ; i < ticks.length; i ++) {
          var c = ticks[i];
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
    var MME = function(dados,periodo){
        var valores = dados;
        var MMEatual =[];
        var N = 2/(periodo+1);
        valores.forEach((element,i)=>{
          var MMEant = i==0? valores[0]: MMEatual[i-1];
          var calculo = MMEant +(N*(valores[i]-MMEant));
          MMEatual.push(calculo);
        })
        return MMEatual;
    };

    var tendencia = function(MME50,MME20,dados){
        // value: 0 queda// value: 1 alta// value: 2 indecisao
        var sobe = 0;
        var desce = 0;
        var resultado = [];
        for(var t =0; t< MME50.length ; t++){
          if(MME20[t] == MME50[t]){
            sobe = 0;
            desce = 0;
            resultado.push({"MME20": MME20[t],"MME50": MME50[t],"value":2,"candles": sobe});
          }
          if(MME20[t] > MME50[t]){
            sobe = sobe + 1;
            desce = 0;
            resultado.push({"MME20": MME20[t],"MME50": MME50[t],"value":1,"candles": sobe});
          }
          if(MME20[t] < MME50[t]){
            desce= desce + 1;
            sobe = 0;
            resultado.push({"MME20": MME20[t],"MME50": MME50[t],"value":0,"candles": desce});
          }
        }
        return resultado;
    };
    return {"STR": lucro,"RSI":rsi,"lucro":lucro,"MME": MME, "TENDENCIA": tendencia};

})();

export default STR;
