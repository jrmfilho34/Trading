<template>
    <table class="table table-striped table-dark">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Ticker</th>
        <th scope="col">Preço</th>
        <th scope="col">Indicadores</th>
        <th scope="col">Smith</th>
        <th scope="col">Lucro</th>
        <th scope="col">Ação</th>
        <th scope="col">Data de atualização</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(iten,i) in this.$store.state.tickers">
        <th scope="row">{{i}}</th>
        <td>{{ iten.nome }}</td>
        <td>{{ iten.preco }}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Exemplo básico">
                <button type="button" class="btn btn-outline-info btn-sm">
                    RSI: <span class="badge badge-light">{{iten.indicadores.RSI}}</span>
                </button>
                <button type="button" class="btn btn-outline-info btn-sm">
                    MME20: <span class="badge badge-light">{{iten.indicadores.MME20}}</span>
                </button>
                <button type="button" class="btn btn-outline-info btn-sm">
                    MME50: <span class="badge badge-light">{{iten.indicadores.MME50}}</span>
                </button>
                <button type="button" :class="iten.indicadores.tend == 0? 'btn btn-outline-danger btn-sm': 'btn btn-outline-success btn-sm'">
                    Tendência:
                     <i class="icofont-2x" :class="iten.indicadores.tend == 0? 'icofont-circled-down' : 'icofont-circled-up'"></i>
                     {{iten.indicadores.periodo}}
                </button>
            </div>
        </td>
        <td>{{iten.smith}}</td>
        <td>{{iten.lucro}}</td>
        <td>
            <div class="btn-group" role="group" aria-label="Exemplo básico">
                <button type="button" class="btn btn-outline-info btn-sm">Editar</button>
                <button type="button" class="btn btn-outline-danger btn-sm" @click.prevent.stop="deletar(iten.acao)">deletar</button>
                <button type="button" class="btn btn-outline-info btn-sm">Info</button>
            </div>
        </td>
        <td>{{iten.data}}</td>
        </tr>
    </tbody>
    </table>
</template>

<script>
export default {
    date(){
        return{
        }
    },
    mounted(){
        this.$store.dispatch('getAxios', {
            url: '/consulta',
            dados:null
        })
    },
    methods:{
        deletar(id){
            this.$store.dispatch('getAxios', {
                url: '/deletar',
                dados:id
            })
        }
    }
}
</script>

<style>
.icone {
    height: 10px;
    width: 10px;
}
</style>
