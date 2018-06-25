import generateDataSets from './generateDataSets'
import removeSimilarDataPoints from './removeSimilarDataPoints'
import createOutputData from './createOutputData'

export default function processTrainingData(allData, numBuckets = 10) {
  let trainingDataPoints = []
  let outputDataPoints = []

  allData.forEach(shape => {
    // Only evaluate stroke if it's long enough
    if (shape.stroke.length > 40) {
      let stroke = JSON.parse(shape.stroke)
      // removeSimilarDataPoints(stroke)
      let dataSets = generateDataSets(
        removeSimilarDataPoints(stroke),
        numBuckets
      )
      // trainingDataPoints.push(...dataSets)
      trainingDataPoints.push(dataSets[0])
      // For each of the stroke permutations, create an outputDataObject
      // dataSets.forEach(() => {
      // 	let outputDataObject = createOutputData(shape.shape)
      // 	outputDataPoints.push(outputDataObject)
      // })
      let outputDataObject = createOutputData(shape.shape)
      outputDataPoints.push(outputDataObject)
    }
  })
  // console.log(trainingDataPoints)
  return { trainingDataPoints, outputDataPoints }
}
