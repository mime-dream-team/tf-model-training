'use strict'

import * as tf from '@tensorflow/tfjs'

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
