var TensorFlow =(function(){
    const tf = require('@tensorflow/tfjs');
    const brain = require('./brain');
    var teste = async function(nome){
        // const a1 = tf.scalar(2);
        // const a2 = tf.scalar(3);
        // const a = tf.tensor([[1, 2], [3, 4]]);
        // console.log('a shape:', a.shape);
        // a.print();
        // const b = a.reshape([4, 1]);
        // console.log('b shape:', b.shape);
        // b.print();
        // const a = tf.tensor([[1, 2], [3, 4]]);
        // // Returns the multi dimensional array of values.
        // a.array().then(array => console.log(array));
        // // Returns the flattened data that backs the tensor.
        // a.data().then(data => console.log(data));
        // const a = tf.tensor([[1, 2], [3, 4]]);
        // // Returns the multi dimensional array of values.
        // console.log(a.arraySync());
        // // Returns the flattened data that backs the tensor.
        // console.log(a.dataSync());
        // const x = tf.tensor([1, 2, 3, 4]);
        // const y = x.square();  // equivalent to tf.square(x)
        // y.print();
        // const a = tf.tensor([[1, 2, 3, 4],[3,4,5,6]]);
        // const b = tf.tensor([[10, 20, 30, 40],[9,8,7,6]]);
        // const y = a.mul(b); // equivalent to tf.add(a, b)
        // y.print();
        /* somatorio*/
        // const a = tf.tensor([[-1, 7, 5]]);
        // const b = tf.tensor([[0.8, 0.1, 0]]);
        // console.log(a.shape)
        // tf.sum(a.mul(b)).print()
        // grafos
        // const a = tf.add(2,2);
        // const b = a.mul(3);
        // const c = b.mul(a);
        // c.print()
        // const resource = await tf.util.fetch('https://bovespa.nihey.page/api/quote/OIBR3/2019-8-01');
        // resource.json().then(data=>{
        //     console.log(data)
        // })
        // const modelUrl =
        // 'https://storage.googleapis.com/tfjs-models/savedmodel/mobilenet_v2_1.0_224/model.json';
        // const model = await tf.loadGraphModel(modelUrl);
        // const zeros = tf.zeros([1, 224, 224, 3]);
        // model.predict(zeros).print();
        // const net = new brain.recurrent.LSTMTimeStep();

        // net.train([
        // [1, 2, 3 , 5, 8, 13, 21]
        // ],{iterations: 20000,errorThresh: 0.005 });

        // const output = await net.run([34]);
        
        // const net = new brain.recurrent.LSTMTimeStep();
        var x = [18,23,28,33,38,43,48,53,58,63];
        var y = [871,1132,1042,1356,1488,1638,1569,1754,1866,1900];
        x.forEach((element,i)=>{
            x[i] = element/10;
            y[i] = y[i]/10;
        })
        console.log(x)
        const model = tf.sequential();
        const xs = tf.tensor2d(x, [10,1]);
        const ys = tf.tensor2d(y, [10,1]);
        model.add(tf.layers.dense({units: 1, inputShape: [1]}));
        model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});
        await model.fit(xs,ys,{epochs: 2000});
        for(var i =0 ; i<10; i++){
            (model.predict(tf.tensor2d([x[i]],[1,1]),{batchSize:4}).mul(10).print())
        }
        
        return nome;
    };
    // async function linear(matriz){
    //     const model = tf.sequential();
    //     model.add(tf.layers.dense({units:1,inputShape: [1]}));
    //     model.compile({
    //         loss:'meanSquaredError',
    //         optimizer:'sgd'
    //     });
    //     const xs = tf.tensor2d([-1,0,1,2,3,4],[6,1]);
    //     const ys = tf.tensor2d([-3,-1,1,3,5,7],[6,1]);
    //     await model.fit(xs,ys, {epochs:500});
    //     model.predict(tf.tensor2d([20],[1,1]),{batchSize:4}).print()

    // };
    // var linear = async function (){
    //     const model = tf.sequential();
    //     model.add(tf.layers.dense({units:1,inputShape: [1]}));

    //     model.compile({
    //         loss:'meanSquaredError',
    //         optimizer:'sgd'
    //     });
    //     const xs = tf.tensor2d([-1,0,1,2,3,4],[6,1]);
    //     const ys = tf.tensor2d([-3,-1,1,3,5,7],[6,1]);

    //     await model.fit(xs,ys, {epochs:250});

    //     console.log('deu certo',model.predict(tf.tensor2d([20],[1,1])))
        
    // }
    return {"teste": teste};

})();

// if () {
// module.exports = TensorFlow;
export default TensorFlow;

// }