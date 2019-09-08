
var PERSISTIR=(function(){
   
  // 1 passo: verificar se o tiker existe
  var BB = function(nome){
   axios.get('/verificar', {
        params: { nome: nome,}
    })
    .then(function (response) {
        if(response.data == "" || response.data.length < 380){
            console.log('nome',nome, response.data.length)
            // axios.get('/novo',{
            //     params: {
            //       nome: nome
            //     }
            // }).then(function (response) {
                
            //   //  naoExiste(response.data)
            // })
            // .catch(function (error) {
            // console.log(error);
            // })
            // .then(function () {
            // // always executed
            // });  
            // // naoExiste(nome)
        }else{
            console.log('----------------nome',nome, response.data.length)
            existe(response.data,nome)
        }
        // response.data == ""?naoExiste(nome):existe(response.data,nome);
    })
    .catch(function (error) {
    console.log(error);
    })
    .then(function () {
    });  
    return 'deu certo';
  };
  //2 passo: construtor da url para request
  var naoExiste = function(nome){
    var inicio = new Date('01/01/2018');
    var mesInicio = (inicio.getMonth()+1);
    var anoInicio= inicio.getFullYear();
    var diaInicio = inicio.getDate();
    var hj = new Date();
    var mesAtual = (hj.getMonth() + 1);
    var anoAtual = hj.getFullYear();
    var diaAtual = hj.getDate();

    for( var ano = anoInicio; ano <= anoAtual; ano++){
        for(var mes = mesInicio; mes<= (anoAtual== ano? mesAtual :12); mes++){
            for(var dia = 1; dia <= (mes==mesAtual && ano == anoAtual?diaAtual:diasNoMes(mes,ano)) ; dia ++ ){
                var data = ano+'-'+mes+'-'+dia;
                var dataIncio = new Date(data);
                var restricao = dataIncio.getDay();
                if(restricao != 0 && restricao != 6){    
                    var url = 'https://bovespa.nihey.page/api/quote/'+nome+'/'+data
                    requerer(url,nome)
                }
            }
        }
    }

  };
  var existe = function(dados,nome){
    var hj = new Date()
    var mesAtual = (hj.getMonth() + 1)
    var anoAtual = hj.getFullYear()
    var diaAtual = hj.getDate()
    var t = dados.length -1
    var inicio = new Date(dados[t].data)
    var mesInicio = (inicio.getMonth()+1)
    var anoInicio= inicio.getFullYear()
    var diaInicio = inicio.getDate()  
    for( var ano = anoInicio; ano <= anoAtual; ano++){
        for (var mes = mesInicio; mes <= mesAtual; mes++){
          
            for (var dia = (mes == mesInicio? diaInicio: 1); dia < (mes == mesAtual? diaAtual: diasNoMes(mes,anoAtual));dia ++){
                var data = ano+'-'+mes+'-'+dia
                var dataIncio = new Date(data)
                var restricao = dataIncio.getDay()
                if(restricao != 0 && restricao != 6){         
                    var url = 'https://bovespa.nihey.page/api/quote/'+nome+'/'+data
                    //requerer(url,nome)
                }
            }
        }
    }
      
  };


  var requerer = function(url,nome){
    var request = require('request');

    request(url, function (error, response, body) {
        if(response.statusCode == 404){
            console.log('error')
        }else{
           axios.post('/armazena', {
                nome: nome,
                resp:body,
                data:new Date()
            })
            .then(function (response) {
                console.log('sucesso')
                // console.log('sucesso da autalização', nome)
            })
            .catch(function (error) {
            console.log(error);
            });
        }
    })
  };

  var diasNoMes = function(mes, ano) {
    var data = new Date(ano, mes, 0);
    return data.getDate();
  };

  return {"BB": BB};
})();

// if (module) {
// module.exports = PERSISTIR;
// }
export default PERSISTIR;