import * as tf from '@tensorflow/tfjs'
import { strokeDb } from '../fire/store'
import model from './model'
import iris from './iris.json'
import irisTesting from './iris_testing.json'

const runTraining = () => {
  const trainingData = tf.tensor2d(
    iris.map(flower => {
      return [
        flower.sepal_length,
        flower.sepal_width,
        flower.petal_length,
        flower.petal_width
      ]
    })
  )
  const outputData = tf.tensor2d(
    iris.map(flower => [
      flower.species === 'setosa' ? 1 : 0,
      flower.species === 'versicolor' ? 1 : 0,
      flower.species === 'virginica' ? 1 : 0
    ])
  )
  const testingDataTensor = tf.tensor2d(
    irisTesting.map(flower => {
      return [
        flower.sepal_length,
        flower.sepal_width,
        flower.petal_length,
        flower.petal_width
      ]
    })
  )
  const startTime = Date.now()
  model.fit(trainingData, outputData, { epochs: 100 }).then(history => {
    console.log(history)
    console.log(Date.now() - startTime)
    model.predict(testingDataTensor).print()
  })
}

export default runTraining
