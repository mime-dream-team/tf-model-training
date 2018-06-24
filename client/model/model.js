'use strict'

import * as tf from '@tensorflow/tfjs'

const trainingData = tf.tensor2d([[200,100,200,100,200,100,200,100,200,100,200,100,200,100,200,100,200,100,200,100],[300,100,300,100,300,100,300,100,300,100,300,100,300,100,300,100,300,100,300,100]]);

const outputData = tf.tensor2d([[1,.8,.6,.4,.2],[.2,.4,.6,.8,1]]);

const testingData = tf.tensor2d([[200,100,200,100,200,100,200,100,200,100,200,100,200,100,200,100,200,100,200,100],[300,100,300,100,300,100,300,100,300,100,300,100,300,100,300,100,300,100,300,100]]); 

const model = tf.sequential();

model.add(tf.layers.dense({
	inputShape: [20],
	activation: 'sigmoid',
	units: 21
}))

model.add(tf.layers.dense({
	inputShape: [21],
	activation: 'sigmoid',
	units: 5
}))

model.add(tf.layers.dense({
	activation: 'sigmoid',
	units: 5
}))

model.compile({
	loss: 'meanSquaredError',
	optimizer: tf.train.adam(.06)
})

export default model
