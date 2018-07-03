'use strict'

import * as tf from '@tensorflow/tfjs'

const model = tf.sequential()

model.add(
	tf.layers.batchNormalization({
		inputShape: [21],
		activation: 'relu',
		units: 21
	})
)

model.add(
	tf.layers.dense({
		inputShape: [21],
		activation: 'relu',
		units: 4
	})
)

model.add(
	tf.layers.dense({
		activation: 'linear',
		units: 4
	})
)

model.compile({
	loss: 'meanSquaredError',
	optimizer: tf.train.adam(0.06)
})

export default model
