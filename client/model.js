'use strict'

import * as tf from '@tensorflow/tfjs';

export default function model(){
    const trainingData = tf.tensor2d([
        [100,200],
        [100,200],
        [100,200],
        [100,200],
        [100,200],
        [100,200],
        [100,200],
        [100,200],
        [100,200],
        [100,200]]);
    
    const outputData = tf.tensor2d([[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]]);
    // const outputData = tf.tensor3d([[[1],[1],[1],[1],[1]]]);
    
    const testingData = tf.tensor2d([[100,200],[100,200],[100,200],[100,200],[100,200],[100,200],[100,200],[100,200],[100,200],[100,200]]); 
    
    const model = tf.sequential();
    
    model.add(tf.layers.dense({
        inputShape: [10,2],
        activation: "sigmoid",
        units: 11
    }))
    
    model.add(tf.layers.dense({
        inputShape: [11,2],
        activation: "sigmoid",
        units: 5
    }))
    
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 5
    }))
    
    model.compile({
        loss: "meanSquaredError",
        optimizer: tf.train.adam(.06)
    })
    
    const startTime = Date.now();
    model.fit(trainingData, outputData, {epochs: 300})
        .then(history => {
            console.log(Date.now()-startTime)
            model.predict(testingData).print()
        })
}


