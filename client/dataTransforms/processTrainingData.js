import generateDataSets from './generateDataSets'
import removeSimilarDataPoints from './removeSimilarDataPoints'
import createOutputData from './createOutputData'

export default function processTrainingData(parsedShapes, numBuckets = 10) {
  let shapeTrainingDataPoints = []
  let shapeCorrespondingOutputData = []

  parsedShapes.forEach(rawShapeObject => {
    let dataSets = generateDataSets(
      removeSimilarDataPoints(rawShapeObject),
      numBuckets
    )
    shapeTrainingDataPoints.push(...dataSets) //all rotation permutations
    dataSets.forEach(() => {
      // For each of the stroke permutations, create an outputDataObject
      let outputDataObject = createOutputData(rawShapeObject.shape)
      shapeCorrespondingOutputData.push(outputDataObject)
    })
    // shapeTrainingDataPoints.push(dataSets[0]) //only first rotation permutation
  })
  return { shapeTrainingDataPoints, shapeCorrespondingOutputData }
}
