import Vue from 'vue'
import Vuex from 'vuex'
import PERSISTIR from './modules/persistir'
import STR from './modules/estrategia'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        tickers:[]
    },
    actions:{
        getAxios({commit},dados){
            axios.get(dados.url, {
                params: {
                    dados: dados.dados
                }
                })
                .then(function (response) {
                 commit('consulta',response.data)
                })
                .catch(function (error) {
                console.log(error);
                })
                .then(function () {
                // always executed
                }); 
        },
        postAxios({commit},dados){
            axios.post(dados.url, {
                dados: dados.dados,
              })
              .then(function (response) {
                commit('atualiza', response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    },
    mutations:{
        atualiza(state){
            PERSISTIR.BB()
        },
        consulta(state,dados){
            state.tickers = []
            var tdx = []
            dados.forEach(element => {
                var a = JSON.parse(element.acao)
                if(!a["Error Message"]){
                    var json = a["Time Series (Daily)"]
                    var array =Object.values(json).map((i,t) => {return parseFloat(i["4. close"])});
                    var rsi = STR.RSI(array)
                    var t = rsi.rsi14.length
                    var MME20 = STR.MME(array,20)
                    var MME50 = STR.MME(array,50)
                    var tendencia = STR.TENDENCIA(MME50,MME20)
                    state.tickers.push({nome: a["Meta Data"]["2. Symbol"], preco:array[t-1] ,indicadores:{ RSI:rsi.rsi14[t-1].toFixed(2),MME20:MME20[t-1].toFixed(2),MME50:MME50[t-1].toFixed(2),tend:tendencia[t-1].value, periodo:tendencia[t-1].candles }, smith:0, lucro:0, acao:element.id, data: element.updated_at})
                }else{
                    state.tickers.push({nome:element.nome,indicadores:{ RSI:0,MME20:0,MME50:0, tend:tendencia[t-1].value, periodo:tendencia[t-1].candles }, smith:'erro', lucro:0, acao:element.id, data: element.updated_at})
                }
            });
            
        }

    }
    // modules:{
    //     notificacoes,
    // }

})