<template>
 <div>
  <nav class="main-header navbar navbar-expand navbar-white navbar-light border-bottom">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="fas fa-bars"></i></a>
      </li>
    </ul>
    <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input class="form-control form-control-navbar" v-model="acao" type="search" placeholder="Escolha uma ação" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit" @click.prevent.stop="criarAcao(acao)">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </form>
  </nav>
  <div class="tamanho" v-if="alerta">
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Oloco, meu!</strong> Esta ação ja existe {{menssagem }}!
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            acao:'',
            alerta: false,
            menssagem: ''
            
        }
    },
    methods:{
      criarAcao(nome){
        var verificao = this.$store.state.monitor
        var resp = false
        verificao.forEach(element => {
          if( element.nome == nome){
            resp = true
            this.alerta = !this.alerta
            this.menssagem = element.nome
          }
        });
        
        if(nome.length == 0 ){
            this.alerta = true
            this.menssagem = "está vazio!"
            resp = true
        }
        if(! resp){
            let obj = this
            axios.post('/monitorar', {
            acao: nome ,
            })
            .then(function (response) {
            obj.$store.commit('dados',response.data)
            obj.$store.dispatch('compras')
            })
            .catch(function (error) {
            console.log(error);
            });
        }

      },
      ligar(){
        this.$store.commit('dados')
      }
    }

}
</script>

<style>
.tamanho{
  position: relative;
  width: 80%;
  left: 250px;
  /* border: 2px solid #000; */
}
</style>
