import * as tf from '@tensorflow/tfjs'
import model from './model'
import {
  shapeTrainingDataPoints,
  shapeCorrespondingOutputData
  // trainingCircles,
  // trainingSquares,
  // actualCircle,
  // actualSquare
} from '../fire/circlesAndSquares'

const runTraining = () => {
  // const testingCircle = actualCircle
  const testingCircle = [
    /*insert an actual circle array here, 20 items long*/
  ]
  // const testingSquare = actualSquare
  // console.log(testingCircle, testingSquare)
  const testingSquare = [
    /*insert an actual square array here, 20 items long*/
  ]
  const trainingDataArr = []
  const outputDataArray = []

  for (let i = 0; i < 150; i++) {
    trainingDataArr.push(trainingCircles[i], trainingSquares[i])
    outputDataArray.push([1, 0], [0, 1])
    //circle probability for first element, square for second element
  }
  const startTime = Date.now()
  const testingDataTensor = tf.tensor2d([testingCircle, testingSquare])
  const trainingDataTensor = tf.tensor2d(trainingDataArr)
  const outputDataTensor = tf.tensor2d(outputDataArray)

  model
    .fit(trainingDataTensor, outputDataTensor, { epochs: 100 })
    .then(history => {
      console.log(history)
      console.log(Date.now() - startTime)
      model.predict(testingDataTensor).print()
    })
}

export default runTraining
