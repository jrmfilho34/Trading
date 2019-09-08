var MMA=(function(){
      /**
   * 计算obv指标
   *
   * @method EMA
   * @param {Array} [dados periodo]
   * Calculo da media movel exponecial
   * @return {Array} media movel
   */
    // var ema = function (lastEma, closePrice, units) {
    // return (lastEma * (units - 1) + closePrice * 2) / (units + 1);
    // };
    var ema = function(dados,periodo){
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

    var tendencia = function(MME50,MME20){
        var sobe = 0;
        var desce = 0;
        var distancia ={};
        for(var t =0; t< MME50.length ; t++){
          if(MME20[t] == MME50[t]){
            sobe = 0;
            desce = 0;
            var resposta = {"value":0,"candles": sobe};
          }
          if(MME20[t] > MME50[t]){
            sobe = sobe + 1;
            desce = 0;
            var resposta = {"value":1,"candles": sobe};
          }
          if(MME20[t] < MME50[t]){
            desce= desce + 1;
            sobe = 0;
            var resposta = {"value":0,"candles": desce};
          }
        }
        return resposta;
    };
    return {"EMA": ema, "TENDENCIA": tendencia};
})();

if (module) {
  module.exports = MMA;
}