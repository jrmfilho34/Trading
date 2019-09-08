<template>
<div>
<ul class="list-group">
    <template v-if="dados.ohlcv[0][0]">
        <li class="list-group-item" :class="dados.ohlcv[0][0]">RSI: {{ rsi }}</li>
        <li class="list-group-item"><a class="btn btn-info btn-sm" @click.prevent.stop="autalizaDB">Atualizar</a></li>
    </template>
</ul>
<trading-vue :data="dados" :width="this.width" :height="this.height"
        :color-back="colors.colorBack"
        :color-grid="colors.colorGrid"
        :color-text="colors.colorText"></trading-vue>
</div>
</template>
<script>
import TradingVue from 'trading-vue-js'
import request from 'request'
import Indicator from './bancodedados/indicadores'

export default {
    name:'trading',
    props:['nome'],
    components:{ TradingVue },
    data(){
        return {
            k:'',
            test:[],
            data:[],
            rsi:0,
            width: window.innerWidth,
            height: window.innerHeight,
            colors: {
                colorBack: '#000',
                colorGrid: '#000',
                colorText: '#fff',
            },
            dados:{ 
                    "ohlcv": [
                    ],    
                    "onchart": [
                        {
                            "name": "BB, 25",
                            "type": "EMA",
                            "data": [
                            ],
                            "settings": {
                                "display": true
                            }
                        },
                        {
                            "name": "EMA, 43",
                            "type": "EMA",
                            "data":[                           
                            ],
                            "settings": {}
                        }
                    ],
                    "offchart": [
                        {
                            "name": "RSI, 20",
                            "type": "RSI",
                            "data":[
                            ],
                            "settings": {
                                "upper": 70,
                                "lower": 30,
                                "backColor": "#9b9ba316",
                                "bandColor": "#000"
                            }
                        },
                        {
                            "name": "DMI",
                            "type": "Splines",
                            "data":[
                                [
                                    1543215600000,
                                    499.7171102599991,
                                    108.99999999999955
                                ],
                                [
                                    1543219200000,
                                    464.02303095571347,
                                    189.01428571428548
                                ]
                            ],
                            "settings": {}
                        }
                    ]
                }
            
            }
    },
    mounted(){
        this.dataBase()
        window.addEventListener('resize', this.onResize)
        this.onResize()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    methods:{
        autalizaDB(){
            let obj = this
            axios.get('/novo',{
                params: {
                  nome: obj.nome
                }
            }).then(function (response) {
                obj.buscar()
            })
            .catch(function (error) {
            console.log(error);
            })
            .then(function () {
            // always executed
            });  
        },
        onResize(event) {
            this.width = window.innerWidth - 300
            this.height = window.innerHeight - 300
        },
        dataBase(){
            // 1 passo: verificar se a ação requerida existe no banco de dados
            let obj = this
            axios.get('/verificar', {
                params: {
                    nome: obj.nome
                }
            })
            .then(function (response) {
                obj.atualizar(response.data)
            })
            .catch(function (error) {
            console.log(error);
            })
            .then(function () {
            // always executed
            });  
        },
        atualizar(dados){
            // 2 passo: após a verificação, tomar decisão
            // se existe: verificar a ultima data de atualização, e atualizar até a data autal.
            if(dados == ""){
                console.log('dados não existe')
                this.buscar()
                
            }else{
                console.log('dados existe',dados)
                this.set_grafico(dados)
            }
        },
        buscar(){
            var n = 1
            var nome = this.nome
            var now = new Date()
            var mesAtual = (now.getUTCMonth()+1)
            var anoAtual = now.getFullYear()          
            let obj = this
            for(var ano =18; ano < 20; ano ++){
                for(var mes= 1; mes< 13; mes ++){
                    for(var dia =1; dia < 32; dia ++) {   
                        var anot = 2000 + ano             
                        var data = '20'+ano +'-'+mes+'-'+dia
                        var url = 'https://bovespa.nihey.page/api/quote/'+nome+'/'+data
                        if(mesAtual<mes && anoAtual ==anot){
                            console.log('executando o database')
                        }else{
                            request(url, function (error, response, body) {
                                obj.$set(obj.test,n,JSON.parse(body))
                                if(response.statusCode == 404){
                                    console.log('error')
                                }else{
                                    obj.armazena(body)
                                    n=n+1
                                    anot =0;
                                }
                            })
                        }
                   
                    }
                }
            }
        },
        armazena(body){
            let obj = this
            axios.post('/armazena', {
                nome: obj.nome,
                resp:body,
                data:new Date()
            })
            .then(function (response) {
                obj.set_grafico(response.data)
            })
            .catch(function (error) {
            console.log(error);
            });
        },
        set_grafico(valor){
              console.log('set_graficos', valor.length)
            var count = (valor.length -1)
            var Input = []
            let data = []
            let r0 = []
            let r1 = []
            
            valor.forEach((element,i) => {    
                var dado = JSON.parse(element.acao) 
                var h = dado.day 
                if(h){
                    h = h.split("-")
                    var newData = h[0]+"/"+h[1]+"/"+h[2]
                    // "Tue, 25 Jun 2019 03:00:00 GMT"
                    var dt = new Date(newData)
                    var dated = new Date(dt.toUTCString()).getTime()
                    r0.push(dated)
                    var ol = [dated,parseFloat(dado.preabe),parseFloat(dado.premax),parseFloat(dado.premin),parseFloat(dado.preofc),parseFloat(dado.voltot)]
                    this.$set(this.dados.ohlcv,i,ol)
                    Input.push(parseFloat(dado.preofc))
                    data.push(dated)
                    var dmi = [dated,499.7171102599991,108.99999999999955]
                    // this.$set(this.dados.offchart[0].data,t,[dated,50])
                    this.$set(this.dados.offchart[1].data,i,dmi)

                    if(i == count){
                        var r1 = r0;                   
                        r1.sort(function(a, b) {
                        return a - b;
                        });
                        Indicator.RSI(Input).rsi12.forEach((x,t)=>{                      
                            this.$set(this.dados.offchart[0].data,t,[r1[t],x])
                        })
                        this.rsi = this.dados.offchart[0].data[count-1][1]
                        this.$store.commit('robo',this.rsi,this.nome)
                    }
                  
                }

            })
          
        },                          
    }
}
</script>

<style>

</style>
