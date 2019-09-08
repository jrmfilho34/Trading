import * as tf from '@tensorflow/tfjs';
 
var Calculo =(function(){
    var teste = async function(){
        var entradas = [[0.0,0.0],
                        [0.0,1.0],
                        [1.0,0.0],
                        [1.0,1.0]];
        var saidas = [[0.0],
                    [0.0],
                    [0.0],
                    [1.0]];
        const peso =tf.variable(tf.zeros([2,1]),'float32');

        const model = tf.sequential();
        model.add(tf.layers.dense({units: 1, inputShape:[2]}));

        model.compile({
            loss: 'meanSquaredError',
            optimizer: 'sgd'
        });
        const xs = tf.tensor(entradas,[4,2]);
        const ys = tf.tensor(saidas,[4,1]);

        await model.fit(xs,ys,{epochs:1000});
        model.predict(tf.tensor([1.0,1.0],[1,2])).print();

        return 'ok';
    }
return {"teste":teste}
})();

export default Calculo;
