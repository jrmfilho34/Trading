
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
    var tratamento = async function(dados){
        // 0 = não existe indicador
        // 1 = existe e está atualizado
        // 2 = existe e está desatualizado
        
        dados.forEach((element,j) => {
             if(dados[j][3]== 0){
                // console.log('teste', dados[j][0],dados[j][1],dados[j][2],dados[j][3])
                // naoExiste(dados[j][0],dados[j][1])
                var nome = dados[j][1];
                var id = dados[j][0];
             //   VVDKRQ9NQZ4O80RN
               // 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=petr3.SA&interval=5min&apikey=VVDKRQ9NQZ4O80RN'
                var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol='+nome+'.SA&interval=1min&apikey=VVDKRQ9NQZ4O80RN';
                // requerer(url,nome,id);
                console.log('não existe indicador',url,dados[j][0],dados[j][1],dados[j][2],dados[j][3])
             }
             if(dados[j][3] == 2){
                
                // naoExiste(dados[j][0],dados[j][1])
                var nome = dados[j][1];
                var id = dados[j][0];
                var data = dados[j][2];
                var code = codigo(nome,id,data);
                var url = 'http://cotacoes.economia.uol.com.br/ws/asset/'+code+'/intraday?replicate=true';
                console.log(url)
                //var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+nome+'.SA&outputsize=full&apikey=VVDKRQ9NQZ4O80RN';
               // requerer(url,nome,id);
               // console.log('desatualizado', id,nome,data)
               
                // existe(data,nome,id,code);
             }
             if(dados[j][3] == 1){
                alert('Indicadores Atualizados');
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
    var existe = function(dados,nome,id){
      var hj = new Date()
      var mesAtual = (hj.getMonth() + 1)
      var anoAtual = hj.getFullYear()
      var diaAtual = hj.getDate()
      var inicio = new Date(dados)
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
                    // var url = 'https://bovespa.nihey.page/api/quote/'+nome+'/'+data
                   // var url = 'http://cotacoes.economia.uol.com.br/ws/asset/963/intraday?replicate=true';//'http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.'+nome;
                   // requerer(url,nome,id);
                    
                    //   http://webservices.infoinvest.com.br/cotacoes/cotacoes_handler.asp?&quotes=&quotes=sp.oibr3&quotes=sp.itub4&quotes=sp.pcar4&quotes=BR.IBOVESPA&quotes=US.DOLARC
                      //requerer(url,nome)
                  }
              }
          }
      }
        
    };
    var codigo = function(nome,id,data){
      var nome = nome+'.SA'
      var request = require('request');
      request('http://cotacoes.economia.uol.com.br/ws/asset/stock/list?size=10000', function (error, response, body) {
      if(response.statusCode == 404){
        console.log('error')
      }else{
        var x = JSON.parse(body)
        for (let index = 0; index < x.data.length; index++) {
          const element = x.data[index].code;
          if(element == nome){
            console.log(index,element,nome,x.data[index].idt);
            var code = x.data[index].idt;
            var url = 'http://cotacoes.economia.uol.com.br/ws/asset/'+code+'/intraday?replicate=true';
            requerer(url,nome,id)
          }
          
        }
       

      }
      })
    };
  
    var requerer = async function(url,nome,id){

      var request = require('request');
      await request(url, function (error, response, body) {
          if(response.statusCode == 404){
              console.log('error')
          }else{
            var data = JSON.parse(body)
            console.log('resposta',nome,id,new Date(data.data[0].date))
            //  axios.post('/armazena', {
            //       nome: nome,
            //       resp:body,
            //       id:id,
            //       data:new Date()
            //   })
            //   .then(function (response) {
            //       console.log('sucesso')
            //       // console.log('sucesso da autalização', nome)
            //   })
            //   .catch(function (error) {
            //   console.log(error);
            //   });
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