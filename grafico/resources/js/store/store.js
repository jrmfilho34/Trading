import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Indicator from '../components/bancodedados/indicadores'
import MMA from '../components/bancodedados/exponecial'
import STR from '../components/bancodedados/estrategia'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      liga: false,
      bolsa:null,
      monitor:[],
      compras:[],
      dados:[]
    },
    actions:{
        indices({ commit, state }){
          console.log('monitor',state.monitor.length)
          state.monitor.forEach(iten=>{
            axios.get('/verificar',{                
              params: {
                nome:iten.nome
              }
            })
            .then(dados=>{
              // console.log('indices store',dados.data[0].nome)
              commit('robo',dados.data)
            })
          })
        },
        compras({ commit }){
          axios.get('/index')
          .then(dados=>{
            commit('set_compras',dados)
          })
        }
    },
    mutations: {
      robo(state,dados){
        var ordenar =[]
        var tdx = []
        var nome = ''
        dados.forEach((element,i) => { 
          element.acao = JSON.parse(element.acao)
          nome = element.nome
          var h = element.acao.day
          if(h){
            h = h.split("-")
            var newData = h[0]+"/"+h[1]+"/"+h[2]
            element.acao.day = newData
            ordenar.push(element.acao)
          }
        })
        function compare(a,b){
          if(a.day < b.day) return -1
          if(a.day > b.day) return 1
        }
        ordenar.sort(compare)
        ordenar.forEach(element=>{
          tdx.push(parseFloat(element.preofc))
        })
        var index = tdx.length
        if(index> 4){
          var robo = Indicator.RSI(tdx).rsi12[index-1].toFixed(2)
          var exp20 = MMA.EMA(tdx,20)[index-1].toFixed(2)
          var exp50 = MMA.EMA(tdx,50)[index-1].toFixed(2)
          var tendencia = MMA.TENDENCIA(MMA.EMA(tdx,50),MMA.EMA(tdx,20))
         // console.log('STR',nome, STR.RSI(tdx)["rsi12"].length)
          var deletar = STR.RSI(tdx)["rsi12"].length
          if(deletar < 300){
          //  console.log('deletar',nome, deletar)
          }
  
          state.monitor.forEach(iten=>{
              if(nome == iten.nome){
                iten.robo = {"RSI": robo, "MME20": exp20, "MME50": exp50, "ted":tendencia}
              }

          })
        }
      },
      cotacao(state,cotacao){
        var cotacao = JSON.parse(cotacao)
        var jsonData = Object.keys(cotacao)
        state.monitor.forEach(element =>{
          if(element.nome == cotacao[jsonData].display){
            element.preco = cotacao[jsonData].valor
          }
        })
      },
      set_compras(state,dados){
        dados.data.forEach(element =>{
          state.monitor.forEach(index =>{
            if(element.nome == index.nome){
              index.status = 'posição'
              let lucro = ((index.preco/element.preco)-1)*100
              index.lucro = lucro
            }
          })
        })
      },
      ligar(state){
        state.liga = ! state.liga
        console.log('valor liga',state.liga)
      },
      dados2(actions,state,monitorar){
        state.monitor = []
        monitorar.forEach((element,i) => {
          state.monitor.unshift(JSON.parse(element.acao))
          // actions.indices()
        });
      },
      dados(state,monitorar){
        state.monitor = []
        // monitorar = JSON.parse(monitorar); 
        monitorar.forEach((element,i) => {
          state.monitor.unshift(JSON.parse(element.acao))
        });
      },
      consulta(state){
        let cor = state
        axios.get('/todos', {
        })
        .then(function (response) {
          response.data.forEach((element,i) => {
            cor.monitor.unshift(JSON.parse(element.acao))
          });

          cor.monitor.sort(function (a, b) {
            if (a.nome > b.nome) {
              return 1;
            }
            if (a.nome < b.nome) {
              return -1;
            }
            // a must be equal to b
            return 0;
          });
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });  
      }
    }
  })