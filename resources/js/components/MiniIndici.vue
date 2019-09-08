<template>
    <div>
        <div class="card">
            <div class="card-header">
                <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                    <div class="btn-group mr-2 btn-group-sm" role="group" aria-label="Exemplo básico">
                        <button type="button" :class="selecao == 24? 'btn btn-secondary':'btn btn-success'" @click.prevent.stop="chamada(24)">1 Dia</button>
                        <button type="button" :class="selecao == 60? 'btn btn-secondary':'btn btn-success'"  @click.prevent.stop="chamada(60)">1 Hora</button>
                        <button type="button" :class="selecao == 15? 'btn btn-secondary':'btn btn-success'"  @click.prevent.stop="chamada(15)">15 Min</button>
                        <button type="button" :class="selecao == 1? 'btn btn-secondary':'btn btn-success'"  @click.prevent.stop="chamada(1)">1 Min </button>
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text" id="btnGroupAddon">#</div>
                        </div>
                            <input type="text" class="form-control" placeholder="periodo" v-model="periodo" aria-describedby="btnGroupAddon">
                    </div>
                    <button class="btn btn-info btn-sm" @click.prevent.stop="graf = !graf">grafico</button>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive-sm">
                <template v-if="graf">
                    <div>
                        <grafico />
                    </div>
                </template>
                <Medias :info="info" />
                <table class="table table-striped table-dark  table-hover">
                    <thead>
                        <tr>
                            <th scope="col">N°</th>
                            <th scope="col">Data</th>
                            <th scope="col">Hora </th>
                            <th scope="col">Periodos</th>
                            <th scope="col">Tendência</th>
                            <th scope="col">Amplitude</th>
                            <th scope="col">Posição</th>
                            <th scope="col">Entrada</th>
                            <th scope="col">Saída</th>
                            <th scope="col">tamanho</th>
                            <th scope="col">tamanho T</th>
                            <th scope="col">Sombra +</th>
                            <th scope="col">Sombra -</th>
                            <th scope="col">MMA(50)</th>
                            <th scope="col">MMA(14)</th>
                            <th scope="col">VOL(B)</th>
                            <th scope="col">Pontos</th>
                            <th scope="col">Ganho</th>
                            <th scope="col">Acumulado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :class="destacar[i]?'muda':'normal'" @click.prevent.stop="selecionar(i)" v-for="(iten,i) in dados">
                            <th :class="destacar[i] = false" scope="row">{{ i }}</th>
                            <td>
                                <div class="btn-group-vertical btn-group-sm" role="group" aria-label="Exemplo básico">
                                    <button type="button" class="btn btn-secondary">{{ iten.DataInicio }}</button>
                                    <button type="button" class="btn btn-secondary">{{ iten.DataFinal }}</button>
                                </div>
                            </td>
                            <td>
                                <div class="btn-group-vertical btn-group-sm" role="group" aria-label="Exemplo básico">
                                    <button type="button" class="btn btn-secondary">{{ iten.HoraInicio }}</button>
                                    <button type="button" class="btn btn-secondary">{{ iten.HoraFinal }}</button>
                                </div>
                            </td>
                            <td>{{ iten.numero }}</td>
                            <td>{{ iten.tend }}</td>
                            <td> 
                                <div class="btn-group-vertical btn-group-sm" role="group" aria-label="Exemplo básico">
                                    <button type="button" class="btn btn-secondary">{{ iten.amplitude }}</button>
                                    <button type="button" class="btn btn-secondary">{{iten.closeA }}</button>
                                    <button type="button" class="btn btn-secondary">{{ iten.closeB }}</button>
                                </div>
                            </td>
                            <td>
                                <button type="button" :class=" iten.posicao == 'vendido'? 'btn btn-danger btn-sm':'btn btn-primary btn-sm'">{{ iten.posicao }}</button>
                            </td>
                            <td>{{ iten.entrada }}</td>
                            <td>{{ iten.saida }}</td>
                            <td>
                                <div class="btn-group-vertical btn-group-sm" role="group">
                                    <template v-for="t in iten.size">
                                        <button type="button" class="btn btn-success">{{ t }}</button>
                                    </template>
                                </div>
                            </td>
                            <td>
                                <div class="btn-group-vertical btn-group-sm" role="group">
                                    <template v-for="b in iten.sizeB">
                                        <button type="button" class="btn btn-success">{{ b }}</button>
                                    </template>
                                </div>
                            </td>
                            <td>
                                <div class="btn-group-vertical btn-group-sm" role="group">
                                    <template v-for="sombraA in iten.sombraMais">
                                        <button type="button" class="btn btn-success">{{ sombraA }}</button>
                                    </template>
                                </div>
                            </td>
                            <td>
                                <div class="btn-group-vertical btn-group-sm" role="group">
                                    <template v-for="sombraB in iten.sombraMenos">
                                        <button type="button" class="btn btn-danger">{{ sombraB }}</button>
                                    </template>
                                </div>
                            </td>
                            <td>
                                <a :class="iten.MMA_50 > iten.MMA_14? 'btn btn-info btn-sm':''">{{iten.MMA_50}}</a>
                            </td>
                            <td>
                                <a :class="iten.MMA_14 > iten.MMA_50? 'btn btn-info btn-sm':''">{{iten.MMA_14}}</a>
                            <td>
                                <div class="btn-group-vertical btn-group-sm" role="group">
                                    <template v-for="vol in iten.volume">
                                        <button type="button" class="btn btn-info">{{ vol }}</button>
                                    </template>
                                </div>
                            </td>
                            <td>{{ iten.pontos }}</td>
                            <td>{{ iten.ganho }}</td>
                             <td>{{ iten.acumulado }}</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import grafico from '../../../grafico/resources/js/trading-vue-js-master/test/tests/Multichart'
import Calculo from '../store/modules/calculo.js'
import redeNeural from '../store/modules/redeNeural.js'
import Medias from './Medias'
export default {
    components:{ Medias, grafico },
     data(){
        return{
            dados:null,
            selecao:24,
            periodo:10,
            destacar:[],
            aux:false,
            medias:null,
            info:1,
            graf:false
        }
    },
    watch:{
        periodo(novo,antigo){         
            Calculo.amplitude(this.selecao,novo)
            .then(response=>{
                this.dados = response
                this.medias = Calculo.medias(response);
            })
            .catch(error=>{
            })
            Calculo.info(this.selecao,novo).then(response=>{
                this.info = response
            })
        },
    },
    created(){
        Calculo.amplitude(24,10)
        .then(response=>{
            this.dados = response
            this.medias = Calculo.medias(response);
        })
        .catch(error=>{
        })
        Calculo.info(this.selecao,this.periodo).then(response=>{
            this.info = response
        })
       
    },
    methods:{
        selecionar(i){
            this.aux = !this.aux
            this.$set(this.destacar, i,this.aux)
        },
        chamada(m){
            this.selecao = m
            Calculo.amplitude(m,this.periodo)
            .then(response=>{
                this.dados = response
                this.medias = Calculo.medias(response);
            })
            .catch(error=>{

            })
            Calculo.info(this.selecao,this.periodo).then(response=>{
            this.info = response
            })
        }
    }
}
</script>

<style>
.muda{
    background-color: #834 !important;
}

</style>
