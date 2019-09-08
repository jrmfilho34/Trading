<template>
    <div>
        <div :class="liga = this.$store.state.liga">
            <ul v-for="(item,i) in tempo" class="list-group">
                <li class="list-group-item">
                    <span class="badge">item</span>
                        tempo: {{ i }}
                </li>
            </ul>
        </div>
        <div class="card">
            <div class="card-header no-border">
                <h3 class="card-title" :mode="acoess = this.$store.state.monitor"> Ações</h3>
                <div class="card-tools">
                    <a href="#" class="btn btn-tool btn-sm">
                        <i class="fas fa-download"></i>
                    </a>
                    <a href="#" class="btn btn-tool btn-sm">
                        <i class="fas fa-bars"></i>
                    </a>
                </div>
            </div>
            <div class="card-body p-0">
                <table class="table table-striped table-valign-middle">
                    <thead>
                        <tr>
                            <th>Nr</th>
                            <th>Ação</th>
                            <th>Preço</th>
                            <th>Indicação do Robo</th>
                            <th>Ação</th>
                            <th>Status</th>
                            <th>Lucro</th>
                            <th>gráfico</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="(iten,i) in this.$store.state.monitor" >
                        <tr>
                            <th>{{ i }}</th>
                            <th>{{ iten.nome }}</th>
                            <th>{{ iten.preco }}</th>
                            <th>
                                <span class="badge bg-danger">RSI: {{iten.robo.RSI}}</span>
                                <span class="badge bg-info">MME20: {{iten.robo.MME20}}</span>
                                <span class="badge bg-danger">MME50: {{iten.robo.MME50}}</span>
                                <span class="font-weight-bold" v-if="iten.robo.ted">
                                    <i :class="tende(iten.robo.ted.value)" >{{ iten.robo.ted.candles}}</i>
                                </span>
                            </th>
                            <th><div class="btn-group btn-group-sm" role="group" aria-label="...">
                                    <button type="button" 
                                            class="btn btn-primary" 
                                            data-toggle="modal" 
                                            data-target="#exampleModal" 
                                            @click="comprar(iten.nome,iten.preco,iten.robo)">comprar
                                    </button>
                                    <button type="button" 
                                            class="btn btn-success" 
                                            data-toggle="modal" 
                                            data-target="#exampleModal" 
                                            @click="vender(iten.preco, iten.preco)">vender
                                    </button>
                                    <button type="button" 
                                            class="btn btn-danger"
                                            @click="apagar(iten.nome)">apagar
                                    </button>
                                </div>
                            <th>{{ iten.status }}</th>
                            <th>{{ iten.lucro }} %</th>
                            <th><button class="btn btn-default btn-sm" @click.prevent.stop="showGrafico(i,iten.nome)"><i class="fas fa-bars"></i></button></th>
                        </tr>
                        <tr v-if="grafico == i"> 
                           <th colspan="7" class="grafico">
                                <!-- <grafico :nome="nome" /> -->
                                <!-- <indicador /> -->
                                <trader :nome="nome" />
                           </th>
                        </tr>
                        </template>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <p>{{ nome }}: ${{ preco }}</p>
                    <p class="robo"><span class="label label-success">Robo: {{ robo }}</span></p>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-4 control-label">Quantidade</label>
                                <div class="col-sm-10">
                                <input type="number" class="form-control" id="inputEmail3" v-model="qtd" placeholder="lote 100">
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <div class="form-group">
                                <label for="inputEmail3" class="col-sm-4 control-label">Valor</label>
                                <div class="col-sm-10">
                                    {{ custo =(preco*qtd) }}
                                <!-- <input type="number" class="form-control" id="inputEmail3" placeholder="lote 100"> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">desistir</button>
                    <button type="button" class="btn btn-primary" @click.prevent.stop="orden(nome,qtd,preco,custo,robo)">comprar</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import request from 'request'
import trader from './TraderGrafico'
import PERSISTIR from './bancodedados/persistir'
// import TensorFlow from './bancodedados/tensorFlow'
import STR from './bancodedados/estrategia'

export default {
    components:{ trader },
    data(){
        return {
            bovespa:false,
            acoess: this.$store.state.monitor,
            numero:null,
            tempo:[],
            nome:'',
            qtd:100,
            preco:0,
            preco_gain:1,
            custo:0,
            robo:0,
            liga: false,
            grafico:null,
        }
    },
    watch:{
        acoess(val,antigo){
            this.$store.dispatch('indices')
            this.novobuscar()
            deep: true
        },
        liga(val,antigo){
            console.log('------------------------------------------','val',val,'antigo',antigo)
            let obj = this
            if(val) {
                
                obj.myVar = setInterval(myTimer,3*1000);
                function myTimer() {
                    obj.roteamento()
                }
            }else{
                clearInterval(obj.myVar)
            }
        }
    },
    mounted() {
        this.mapear()   
       // console.log(TensorFlow.teste('miliano')) 
        // console.log (STR.)  
    },
    filters:{
        capitalize(){
            return 1
        }
    },
    methods:{
        novobuscar(){
            var acoes = this.$store.state.monitor
            acoes.forEach(element => {
                  PERSISTIR.BB(element.nome)
                  
            })
        },
        tende(ted){
            if(ted == 1){
                return 'ion ion-android-arrow-up text-success'
            }else{
                return 'ion ion-android-arrow-down text-danger'
            }
        },
        showGrafico(id,nome){
            if(this.grafico == null){
                this.grafico = id
                this.nome = nome
            }else{
                this.grafico = null
                this.nome = ''
            }

        },
        orden(nome,qtd,preco,custo,robo){
            let obj = this
            axios.post('/compra', {
                nome: nome,
                qtd:qtd,
                preco:preco,
                preco_gain:1,
                data:new Date(),
                custo:custo,
                robo:robo,
            })
            .then(function (response) {
                obj.$store.dispatch('compras')
            })
            .catch(function (error) {
            console.log(error);
            });
        },
        apagar(nome){
            let obj = this
            axios.post('/delete', {
                nome: nome,
            })
            .then(function (response) {
             obj.$store.commit('dados2',response.data)
             obj.$store.dispatch('compras')
            })
            .catch(function (error) {
            console.log(error);
            });
        },
        vender(name,preco){
        },
        comprar(nome,preco,robo){
            this.nome = nome
            this.preco = preco
            this.robo = robo
        },
        roteamento(){
            var acao = this.$store.state.monitor
            for(var i =0; i < acao.length; i++){
                this.busca2(acao[i].nome)
                if(i == (acao.length-1)){
                    console.log('calculo de porcentagem')
                    this.$store.dispatch('compras')
                }
            }
        },
        busca2(nome){
            let oc = this
            request('http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.'+nome,function (error, response, body) {
                if (error) throw new Error(error)
                oc.$store.commit('cotacao',body)
            })
        },
        mapear(){
            this.$store.commit('consulta')
            this.$store.dispatch('compras')
        }
    }
}
</script>

<style>
.robo {
    padding-left: 20px;
    margin-left: 20px;
}
.robo span{
    padding: 5px;
}
.grafico {
    margin: 15px;
    padding: 15px;
    width:100%;
    border: 2px solid #000;
}
</style>
