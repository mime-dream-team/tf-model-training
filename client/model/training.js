import * as tf from '@tensorflow/tfjs'
import model from './model'

// Issues with async await, so we're using promises for now
// const fetchData = async () => {
// 	const querySnapshot = await strokeDb.get()
// 	const strokeData = []
// 	querySnapshot.forEach(stroke => strokeData.push(stroke.data()))
// 	return strokeData
// }

const runTraining = () => {
  const testingDataCircle = new Array(20).fill(1)
  const testingDataSquare = new Array(20).fill(0)
  const trainingDataArr = []
  const outputDataArray = []
  for (let i = 0; i < 100; i++) {
    trainingDataArr.push(testingDataCircle, testingDataSquare)
    outputDataArray.push([1, 0], [0, 1])
  }
  const startTime = Date.now()
  const testingDataTensor = tf.tensor2d([testingDataCircle, testingDataSquare])
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
