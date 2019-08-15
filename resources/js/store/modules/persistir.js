
var PERSISTIR=(function(){
   
    // 1 passo: verificar se o tiker existe
    var BB = function(){
            axios.get('/verificar')
            .then(function (response) {
                tratamento(response.data);
            })
            .catch(function (error) {
            console.log(error);
            })
            .then(function () {
            });  
    };
    var tratamento = function(dados){
        // 0 = não existe indicador
        // 1 = existe e está atualizado
        // 2 = existe e está desatualizado
        dados.forEach((element,j) => {
             if(dados[j][3] == 2){
                console.log('teste', dados[j][0],dados[j][1],dados[j][2],dados[j][3])
                // naoExiste(dados[j][0],dados[j][1])
                var nome = dados[j][1];
                var id = dados[j][0];
                var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+nome+'.SA&outputsize=full&apikey=VVDKRQ9NQZ4O80RN';
                requerer(url,nome,id);
             }
             if(dados[j][3] == 0){
              console.log('teste', dados[j][0],dados[j][1],dados[j][2],dados[j][3])
              // naoExiste(dados[j][0],dados[j][1])
              var nome = dados[j][1];
              var id = dados[j][0];
              var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+nome+'.SA&outputsize=full&apikey=VVDKRQ9NQZ4O80RN';
              requerer(url,nome,id);
           }

        });
    };
    //2 passo: construtor da url para request
    var naoExiste = function(id,nome){
      var inicio = new Date('01/01/2018');
      var mesInicio = (inicio.getMonth()+1);
      var anoInicio= inicio.getFullYear();
      var diaInicio = inicio.getDate();
      var hj = new Date();
      var mesAtual = (hj.getMonth() + 1);
      var anoAtual = hj.getFullYear();
      var diaAtual = hj.getDate();
      var count = 0
      for( var ano = anoInicio; ano <= anoAtual; ano++){
          for(var mes = mesInicio; mes<= (anoAtual== ano? mesAtual :12); mes++){
              for(var dia = 1; dia <= (mes==mesAtual && ano == anoAtual?diaAtual:diasNoMes(mes,ano)) ; dia ++ ){
                  var data = ano+'-'+mes+'-'+dia;
                  var dataIncio = new Date(data);
                  var restricao = dataIncio.getDay();
                  if(restricao != 0 && restricao != 6){    
                      var url = 'https://bovespa.nihey.page/api/quote/'+nome+'/'+data
                    if(count > 400){
                        requerer(url,nome,id)
                    }
                    count = count + 1
                    // console.log('url',count,id,url)
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
                    //   var url = 'https://bovespa.nihey.page/api/quote/'+nome+'/'+data
                    //   http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.oibr3&quotes=sp.itub4&quotes=sp.pcar4&quotes=BR.IBOVESPA&quotes=US.DOLARC
                      //requerer(url,nome)
                  }
              }
          }
      }
        
    };
  
  
    var requerer = async function(url,nome,id){
      var request = require('request');
      await request(url, function (error, response, body) {
          if(response.statusCode == 404){
              console.log('error')
          }else{
             axios.post('/armazena', {
                  nome: nome,
                  resp:body,
                  id:id,
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