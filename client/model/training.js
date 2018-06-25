import * as tf from '@tensorflow/tfjs'
import model from './model'
import trainingCircles from '../fire/circles'
import trainingSquares from '../fire/squares'

const runTraining = () => {
  const testingCircle = [
    /*insert an actual circle array here, 20 items long*/
  ]
  const testingSquare = [
    /*insert an actual square array here, 20 items long*/
  ]
  const trainingDataArr = []
  const outputDataArray = []

  for (let i = 0; i < 100; i++) {
    trainingDataArr.push(trainingCircles[i], trainingSquares[i])
    outputDataArray.push([1, 0], [0, 1])
  }
  const startTime = Date.now()
  const testingDataTensor = tf.tensor2d([testingCircle, testingSquare])
  const trainingDataTensor = tf.tensor2d(trainingDataArr)
  const outputDataTensor = tf.tensor2d(outputDataArray)

  model
    .fit(trainingDataTensor, outputDataTensor, { epochs: 300 })
    .then(history => {
      console.log(history)
      console.log(Date.now() - startTime)
      model.predict(testingDataTensor).print()
    })
}

export default runTraining
