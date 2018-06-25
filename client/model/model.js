'use strict'

import * as tf from '@tensorflow/tfjs'

const model = tf.sequential()

model.add(
  tf.layers.dense({
    inputShape: [4],
    activation: 'sigmoid',
    units: 5
  })
)

model.add(
  tf.layers.dense({
    inputShape: [5],
    activation: 'sigmoid',
    units: 3
  })
)

model.add(
  tf.layers.dense({
    activation: 'sigmoid',
    units: 3
  })
)

model.compile({
  loss: 'meanSquaredError',
  optimizer: tf.train.adam(0.06)
})

export default model
