<template>
    <div class="col-lg-6">
        <div class="row">
         <input type="hidden" :class="liga = this.$store.state.liga">
        <template  v-for="(dados,f) in bolsa" >
            <div class="col-lg-6">
                <div  :class="oscilacao" style="height: inherit; width: inherit; transition: all 0.15s ease 0s;" >
                    <div class="card-header">
                        <div class="card-title">
                                {{ dados.display }} 
                        </div>
                        <div class="card-tools">
                            <button class="btn btn-tool" type="button" data-widget="maximize">
                                <i class="fas fa-expand"></i>
                            </button>
                            <button class="btn btn-tool" type="button" data-widget="collapse">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button class="btn btn-tool" type="button" data-widget="remove">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body" style="display: block;">
                        <span class="info-box-number">{{dados.unidade_valor+': '+dados.valor+' variação: '+dados.variacao_percentual+'%'}}</span>
                        <span class="info-box-number">min: {{ dados.min }}</span>
                        <span class="info-box-number">max: {{ dados.max }}</span>
                        <span class="progress-description">{{ dados._now }}</span>
                    </div>
                </div>
            </div>
        </template>
        </div>
    </div>
</template>
<script>

export default {
    name:'cotacao',
	data(){
		return {
			bolsa: this.$store.state.bolsa,
            pontos:0,
            oscilacao:'card card-primary',
            liga: false
		}
    },
    watch:{
        bolsa(val,antigo){
           
        },
        // liga(val,antigo){
        //     console.log('------------------------------------------','val',val,'antigo',antigo)
        //     let obj = this
        //     if(val) {
                
        //         obj.myVar = setInterval(myTimer,30*1000);
        //         function myTimer() {
        //            obj.buscaDados()
        //             var now = new Date
        //            console.log("Agora são "  + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + ":" + now.getMilliseconds())
        //         }
        //     }else{
        //         clearInterval(obj.myVar)
        //     }
        // }
    },
    mounted() {
    //    this.buscaDados()
    //    this.Armazena()
    },
	methods:{
		buscaDados(){
            let obj = this
            axios.get('http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.oibr3&quotes=sp.itub4&quotes=sp.pcar4&quotes=BR.IBOVESPA&quotes=US.DOLARC', {
            headers: {
            'Access-Control-Allow-Origin': '*'
            },
            transformResponse: [function (data) {
            obj.bolsa = JSON.parse(data)
            obj.Armazena(obj.bolsa)
            }],
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            }).then(function (response) {
            })
            .catch(function(error) {
                console.log(error);
            })
            .finally(function (){
            })
        },
        observador(points){
            let current = this        
            this.oscilacao = pontos >= points ? 'card border-success mb-1':'card border-danger mb-1'
            console.log('pontos anterior', this.pontos,'pontos atualizados',points,this.oscilacao)
            this.pontos = points            
        },
        Armazena(dados){
           
            console.log(dados)
            for(var i in dados) {
                var item = dados[i];
                if(item.display == "OIBR3")
                {
                    axios.post('/acoes', {
                        OIBR3 : item
                    })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
 
            }
            //this.$store.state.bolsa.push(dados)
            // axios.post('/acoes', {
            //     firstName: 'Fred',
            //     lastName: 'Flintstone'
            // })
            // .then(function (response) {
            //     console.log(response);
            // })
            // .catch(function (error) {
            //     console.log(error);
            // });
        },
	}
}
</script>

<style>

</style>
