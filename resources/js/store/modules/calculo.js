var Calculo =(function(){

    /* Movimento de alta: fechamento do dia Anterior < Fechamento do Dia Atual
       Movimento de baixa: fechamento do dia Anterior > Fechamento do Dia Atual
       Sem tendencia: fechamento do dia Anterior == Fechamento do Dia Atual
       Sombra +:
    */
    var amplitude = function (tempo,periodo) {
        console.log('tempo',tempo)
        return axios.get('/mini',{
            params: {
                tempo:tempo,
                periodo:periodo
            },
            responseType: 'json',
        }).then(function(response){
        return processamento(response.data);
        });

    };
    /* calculo da tendência */
    function tendencia(anterior,atual){
        var atual = parseFloat(atual);
        var anterior = parseFloat(anterior);
        if(anterior > atual){
            return 'alta';
        }else if(anterior < atual){
            return 'baixa';
        }else{
            return 'igual';
        }
    };
    /* calculo dos periodos */
    function periodos(resposta){
        var x = [];
        var j = 0;
        let count = 1;
        var variarMa = [];
        var variarMe = [];
        var volume = [];
        var mediaMovel = [];
        var tamanho = [];
        var tamanhoT =[];
        // console.log('resposta',resposta);
        resposta.forEach((element,t)=>{
            
            if(t==0){
                // variarMa.push(element.sombra[0]);
                // variarMe.push(element.sombra[1]);
                x.push({
                    DataInicio:element.DataAtual,
                    DataFinal:element.DataAnterior,
                    numero: j, 
                    tend: element.tendencia,
                    sombraMais: variarMa,
                    sombraMenos: variarMe,
                    volume: 0,
                    ganho: 0,
                });
            }else{
                if(x[j].tend != element.tendencia){
                    variarMa.push(resposta[t-count].sombra[0]);
                    variarMe.push(resposta[t-count].sombra[1]);
                    volume.push(resposta[t-count].volume);
                    mediaMovel.push(resposta[t-count].MMA_50,resposta[t-count].MMA_14);
                    tamanho.push(resposta[t-count].tamanho);
                    tamanhoT.push(resposta[t-count].tamanhoT);
                    var e = element.tendencia == 'alta'? parseFloat(element.minima.toFixed(3)): parseFloat(element.maxima.toFixed(3));
                    var s = element.tendencia == 'alta'? parseFloat(resposta[t-count].maxima.toFixed(3)) : parseFloat(resposta[t-count].minima.toFixed(3));
                    var p = (e -s);
                    var g = p * 0.20;
                    x.push({
                        DataInicio:element.DataAtual.substr(0,10),
                        DataFinal:resposta[t-count].DataAtual.substr(0,10),
                        HoraInicio: element.Hora,
                        HoraFinal: resposta[t-count].Hora,
                        numero: count,
                        tend: element.tendencia,
                        amplitude:(resposta[t-count].atual - element.atual).toFixed(3),
                        closeA: element.atual.toFixed(3),
                        closeB: resposta[t-count].atual.toFixed(3),
                        posicao: element.tendencia == 'alta'? 'comprado': 'vendido',
                        entrada: element.tendencia == 'alta'? element.minima.toFixed(3): element.maxima.toFixed(3),
                        saida: element.tendencia == 'alta'? resposta[t-count].maxima.toFixed(3) :resposta[t-count].minima.toFixed(3),
                        sombraMais: variarMa,
                        sombraMenos: variarMe,
                        MMA_50: parseFloat((parseFloat(resposta[t-count].MMA_50)).toFixed(3)),
                        MMA_14:parseFloat( (parseFloat(resposta[t-count].MMA_14)).toFixed(3)),
                        volume: volume,
                        pontos: p < 0 ? (- p).toFixed(3): p.toFixed(3) ,
                        ganho: g < 0 ? (- g).toFixed(3): g.toFixed(3),
                        acumulado: 0,
                        size: tamanho,
                        sizeB: tamanhoT
                    });
                    j = j +1;
                    count = 1;
                    variarMa = [];
                    variarMe = [];
                    volume = [];
                    mediaMovel = [];
                    tamanho = [];
                    tamanhoT =[];
                }else{
                    variarMa.push(element.sombra[0]);
                    variarMe.push(element.sombra[1]);
                    volume.push(element.volume);
                    tamanho.push(element.tamanho);
                    tamanhoT.push(element.tamanhoT);
                    // mediaMovel.push(element.MMA_50,element.MMA_14);
                    count = count + 1;
                }
            }
        })
        return x;
    };
    /* calculo da sombra */
    function sombra(j,abertura,fechamento,maxima,minima){
        var abertura = parseFloat(abertura);
        var fechamento = parseFloat(fechamento);
        var maxima = parseFloat(maxima);
        var minima = parseFloat(minima);
        var sombraMais = 0;
        var sombraMenos = 0;
        var variacao = [];
        /* se for baixa */
        if( abertura > fechamento){
            sombraMais = ((maxima - abertura)*1000).toFixed(0);
            sombraMenos = ((fechamento - minima)*1000).toFixed(0);
        }else{
            sombraMais = ((maxima - fechamento)*1000).toFixed(0);
            sombraMenos = ((abertura - minima)*1000).toFixed(0);
        }
        variacao.push(sombraMais,sombraMenos);
        return variacao;

    };
    /* acumulado */
    function acumulado(dados){
        var soma = dados;
        var soma = soma.reverse();
        var cont = 0;
        soma.forEach((element,j) =>{
            
            cont = cont + parseFloat(element.ganho) 
            element.acumulado = cont.toFixed(3);
        });

        var resposta = dados.reverse();
        return resposta;
    };
    /* processamento dos dados */
    var processamento = function (dados){
        var resposta = [];
        dados.forEach((element,j) => {
            if(j>0){
                var tende = tendencia(element.Fechamento,dados[j-1].Fechamento);
                var s = sombra(j,dados[j-1].Abertura,dados[j-1].Fechamento,dados[j-1].Maxima,dados[j-1].Minima);
                resposta.push({
                    id: j,
                    DataAnterior: element.Data, 
                    DataAtual:dados[j-1].Data,
                    tendencia: tende, 
                    ant: parseFloat(element.Fechamento), 
                    atual:parseFloat(dados[j-1].Fechamento),
                    maxima: parseFloat(dados[j-1].Maxima),
                    minima:parseFloat(dados[j-1].Minima),
                    sombra: s,
                    volume: parseFloat(dados[j-1].VOL),
                    MMA_50: dados[j-1].MA_50,
                    MMA_14: dados[j-1].MA_14,
                    Hora: dados[j-1].Hora,
                    tamanho:((parseFloat(dados[j-1].Abertura) - parseFloat(dados[j-1].Fechamento))*1000).toFixed(0),
                    tamanhoT:((parseFloat(dados[j-1].Maxima) - parseFloat(dados[j-1].Minima))*1000).toFixed(0)
                });
            }
        });

        var periodo = periodos(resposta);
        periodo.splice(0,1);
        var periodo = acumulado(periodo);
        return periodo;
    };
    var medias = function(dados){
        var medias = [];
        dados.forEach((iten,i)=>{
            var soma = 0;
            var somaA = 0;
            iten.size.forEach(local=>{
                soma = soma + parseFloat(local)
            })
            iten.sizeB.forEach(localb=>{
                somaA = somaA + parseFloat(localb)
            })
            medias.push({media: soma/iten.size.length,
                         mediaT: somaA/iten.sizeB.length})
        });
    };
    var info = function(tempo,periodo){
        console.log('tempo',tempo)
        return axios.get('/mini',{
            params: {
                tempo:tempo,
                periodo:periodo
            },
            responseType: 'json',
        }).then(function(response){
        return response.data;
        });
    }

    return { "amplitude": amplitude, "medias": medias,"info":info};

})();

export default Calculo;
