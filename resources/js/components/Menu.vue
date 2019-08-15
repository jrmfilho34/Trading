<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Trading</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#textoNavbar" aria-controls="textoNavbar" aria-expanded="false" aria-label="Alterna navegação">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="textoNavbar">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(Página atual)</span></a>
            </li>
            <li class="nav-item">
                <button type="button" class="nav-link btn btn-outline-success btn-sm" data-toggle="modal" data-target="#modalExemplo">
                    New Ticker
                </button>
            </li>
            <li class="nav-item">
                <button type="button" class="nav-link btn btn-outline-warning ml-2 my-sm-0 btn-sm" @click.prevent.stop="atualizar">
                    Atualizar
                </button>
            </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Pesquisar" aria-label="Pesquisar">
            <button class="btn btn-outline-success my-2 my-sm-0 btn-sm" type="submit">Pesquisar</button>
            </form>
        </div>
    </nav>
    <div class="modal fade" id="modalExemplo" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Insira um novo Ticker</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-row">
                        <div class="col-3">
                        <input type="text" v-model="a.ticker" class="form-control" placeholder="Ticker">
                        </div>
                        <div class="col">
                        <input type="text" v-model="a.nome" class="form-control" placeholder="Nome">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-6">
                        <input type="text" v-model="a.setor" class="form-control" placeholder="Setor">
                        </div>
                        <div class="col">
                        <input type="text" v-model="a.segmento" class="form-control" placeholder="Segmento">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary btn-sm" @click.prevent.stop="criar">criar</button>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            a:{
                "ticker":null,
                "nome":null,
                "setor":null,
                "segmento":null,
            }
        }
    },
    methods:{
        criar(){
            if(this.a["ticker"] == null || this.a["nome"] == null || this.a["setor"] == null || this.a["segmento"] == null){
                alert('preencha todos os campos')
            }else{
                this.$store.dispatch('postAxios', {
                url: '/criarticker',
                dados: this.a
                })
            }
        },
        atualizar(){
            this.$store.commit('atualiza')
        }
    }
}
</script>

<style>

</style>
