<template>
    <table class="table table-bordered table-dark">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">
                <button class="btn btn-success btn-sm" @click.prevent.stop="executar">Executar</button>
                <button class="btn btn-success btn-sm" @click.prevent.stop="executarB">Executar A</button>
            </th>
            <th>Saida</th>
            <th>Erro</th>
            <th>info {{ this.info.length }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(iten,i) in resposta" :key="i">
            <th scope="row">{{i}}</th>
            <td>{{M[i]}}</td>
            <td>{{iten}}</td>
            <td>{{ erro[i] }}</td>
            <td>{{ tamanho[i]}}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
import * as tf from '@tensorflow/tfjs';
import { constants } from 'crypto';
const fs = require('fs');

export default {
    props:['info'],
    data(){
        return{
            resposta:[],
            erro:[],
            tamanho:[],
            M:[]
        }
    },
    methods:{
        //[data,Fechamento,abertura,maxima,minima]
        executar(){
           let X = [] // futuro
           let Y = [] // passado
           let U = [] // ultimo dia para testar a rede
           let qtdLinhas = 1
           this.tamanho.push(this.info.length)
           this.info.forEach((element,i) => {
               console.log('info',element)
               if(i == 0){
                    const AY = (Number(element.Fechamento)).toFixed(3)
                    const BY = (Number(element.Abertura)).toFixed(3)
                    const CY = (Number(element.Maxima)).toFixed(3)
                    const DY = (Number(element.Minima)).toFixed(3)
                   // this.M.push(Number(AY),Number(BY),Number(CY),Number(DY))
               }
               if(i == 1){
                    const AY = (Number(element.Fechamento)/100)
                    const BY = (Number(element.Abertura)/100)
                    const CY = (Number(element.Maxima)/100)
                    const DY = (Number(element.Minima)/100)
                    U.push(Number(AY),Number(BY),Number(CY),Number(DY))
               }

               if(qtdLinhas > 1 && qtdLinhas < (this.info.length)){
                   
                    const AX = (Number(this.info[i+1].Fechamento)/100)
                    const BX = (Number(this.info[i+1].Abertura)/100)
                    const CX = (Number(this.info[i+1].Maxima)/100)
                    const DX = (Number(this.info[i+1].Minima)/100)

                    const AY = (Number(element.Fechamento)/100)
                    const BY = (Number(element.Abertura)/100)
                    const CY = (Number(element.Maxima)/100)
                    const DY = (Number(element.Minima)/100)

                    X.push([Number(AX),
                            Number(BX),
                            Number(CX),
                            Number(DX)])
                    Y.push([Number(AY),
                            Number(BY),
                            Number(CY),
                            Number(DY)])
                    console.log('passado',Number(AX),Number(BX),Number(CX),Number(DX))
                    console.log('futuro',Number(AY),Number(BY),Number(CY),Number(DY))
               }
               qtdLinhas++

           });

            qtdLinhas = qtdLinhas -3
            //escolha do modelo da rede neural
            const model = tf.sequential()
            // units: quatro camadas de saidas que serão as entradas da proxima camada
            // inputShape: valores de entradas
            const inputLayer = tf.layers.dense({units: 4, inputShape: [4]})
            // adicionar as camadas ao modelo
            model.add(inputLayer)
            // taxa de apreendizagem
           // const optimizer = tf.train.sgd(0.01)
            const optimizer = tf.train.adamax()
            // compilar a rede neural, definindo o tipo de erro, e o otimizador
            model.compile({ loss: 'meanSquaredError', optimizer:optimizer})
            // configurando entradas e saida em um tensor
            const x = tf.tensor(X,[qtdLinhas,4])
            const y = tf.tensor(Y)
 
            Y.forEach(element=>{
                this.M.push([((element[0]*100)),
                         ((element[1]*100)),
                        ((element[2]*100)),
                        ((element[3]*100))])
            })
            model.fit(x,y,{epochs: 500}).then(()=>{
                let saida = []
                let error = []
                X.forEach((element,s) => {
                    const input = tf.tensor(element,[1,4])
                    let output = model.predict(input).dataSync()
                    output.forEach((element,i)=>{
                        saida.push(Number((element*100).toFixed(3)))
                        error.push(Number((saida[i]-this.M[s][i]).toFixed(3)))
                    })
                  this.resposta.push(saida)
                  this.erro.push(error)
                  saida = []
                  error = []
                });
                
                Y.forEach(element=>{
                    this.M.push([((element[0]).toFixed(3)),
                    ((element[1]).toFixed(3)),
                    ((element[2]).toFixed(3)),
                    ((element[3]).toFixed(3))])
                })
                
            })


        },
        executarB(){
            let arrX = []
            let arrY = []
            let arrInput = []

        }
    }
}
</script>

<style>

</style>
 // let arquivo = fs.readFileSync('UmMinuto.csv',{encoding:'utf8'})
            // arquivo = arquivo.toString().trim()
            // const linhas = arquivo.split('\r\n')
            // let X = [];
            // let Y = [];
            // let qtdLinhas = 0;
            // for(let l =1; 1<50; l++){
            //     // this.resposta.push(linhas[l])
            //     let celulas1 = []
            //     if(qtdLinhas == (linhas.length-2)){
            //         celulas1 = ['']
            //     }
            //     qtdLinhas++

            // }