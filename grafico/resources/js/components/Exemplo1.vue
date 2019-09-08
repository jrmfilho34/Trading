<template>
<div>
    <div>
 
    </div>
<trading-vue :data="dados" :width="this.width" :height="this.height"
        :legend-buttons="buttons"
        v-on:legend-button-click="on_button_click"
        :color-back="colors.colorBack"
        :color-grid="colors.colorGrid"
        :color-text="colors.colorText">
</trading-vue>
</div>

</template>

<script>
import TradingVue from '../trading-vue-js-master/src/TradingVue'
//import Data from './bancodedados/dados.json'
import Data from '../trading-vue-js-master/test/data/data_btc.json'
import Utils from '../trading-vue-js-master/src/stuff/utils.js'
import request from 'request'

export default {
    name: 'LegendButtons',
    description: 'Legend buttons test (click the button, see console)',
    props:['nome'],
    components: {
        TradingVue
    },
    watch:{
        test(antigo,atual){
            console.log('visao')
            deep:true
        },
        dados(antigo,atual){
            console.log('watch',antigo,atual)
            deep:true
        }
    },
    methods: {
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
                    console.log('sem dados',dados)
                    // busca a tabela com os indices
                    this.buscar()
                    //armazena a tabela 
                    
                }else{
                    this.set_grafico(dados)
                }
        },
        buscar(){
            var n = 1
            var nome = this.nome
            var now = new Date()
            var mesAtual = (now.getUTCMonth()+1)
            var anoAtual = now.getFullYear()

            console.log('mes',mesAtual,'ano',anoAtual)
          
            let obj = this
            for(var ano =18; ano < 20; ano ++){
                for(var mes= 1; mes< 8; mes ++){
                    for(var dia =1; dia < 31; dia ++) {   
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
        set_grafico(indices){
            var data = []
            var data2 = []
            
            indices.forEach((element,i) => {

                var dados = JSON.parse(element.acao)
                var oi = dados.day.split("-")
                var newData = oi[1]+"/"+oi[2]+"/"+oi[0]+" 17:00"
                var dated =new Date(newData).getTime()
              
               
                data=[1543168800000,1543172400000,1543579200000,1543582800000,1543586400000,1543590000000,1543593600000,1543597200000,1543600800000,1519948800000,1519862400000]
            this.$set(this.dados.ohlcv,i,[this.test.ohlcv[i][0],parseFloat(dados.preabe),parseFloat(dados.premax),parseFloat(dados.premin),parseFloat(dados.preofc),parseFloat(dados.voltot)])
                
            });
            console.log(this.dados.ohlcv)
        },
        onResize(event) {
            this.width = window.innerWidth -300
            this.height = window.innerHeight - 300
        },
        on_button_click(event) {
            if (event.button === 'display') {
                let d = this.chart[event.type][event.dataIndex]
                if (d) {
                    if (!('display' in d.settings)) {
                        this.$set(
                            d.settings, 'display', true
                        )
                    }
                    this.$set(
                        d.settings, 'display', !d.settings.display
                    )
                }
            }
            console.log(event)
        }
    },
    mounted() {
        this.dataBase()
        window.addEventListener('resize', this.onResize)
        setTimeout(() => {
            // Async data setup
            this.$set(this, 'chart', this.dados)
            console.log('um')
        }, 0)
        this.onResize()
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.onResize)
    },
    data() {
        return {
            chart: {}, // Data will be here,
            width: window.innerWidth,
            height: window.innerHeight,
            test: Data,
            dados:{
                "ohlcv": [
                    [
                        1543168800000,
                        3853.9,
                        3899.9,
                        3849.7,
                        3861.2,
                        740.27961774
                    ],
                    [
                        1543172400000,
                        3860.7,
                        4030.1,
                        3857.8197326,
                        3957.1,
                        2316.56854964
                    ]
                ],
                "onchart": [
                    {
                        "name": "BB, 25",
                        "type": "EMA",
                        "data": [
                            [
                                1543168800000,
                                3861.2
                            ],
                            [
                                1543172400000,
                                3868.576923076923
                            ]

                        ],
                        "settings": {
                            "display": false
                        }
                    },
                    {
                        "name": "EMA, 43",
                        "type": "EMA",
                        "data":[
                            [
                                1543168800000,
                                3861.2
                            ],
                            [
                                1543172400000,
                                3865.5590909090906
                            ]
                        
                        ],
                        "settings": {}
                    }
                ],
                "offchart": [
                    {
                        "name": "RSI, 20",
                        "type": "RSI",
                        "data":[
                            [
                                1543240800000,
                                51.92340771087726
                            ],
                            [
                                1543244400000,
                                48.76490766072733
                            ]
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
            },
            colors: {
                colorBack: '#000',
                colorGrid: '#000',
                colorText: '#fff',
            },
            buttons: [
                'display', 'settings', 'remove'
            ]
        };
    }
};
</script>

<style>
</style>