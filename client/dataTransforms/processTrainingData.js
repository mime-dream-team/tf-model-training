import generateDataSets from './generateDataSets'
import removeSimilarDataPoints from './removeSimilarDataPoints'
import createOutputData from './createOutputData'

export default function processTrainingData(parsedShapes, numBuckets = 10) {
  let shapeTrainingDataPoints = []
  let shapeCorrespondingOutputData = []
  parsedShapes.forEach(rawShapeObject => {
    let dataSets = generateDataSets(
      removeSimilarDataPoints(rawShapeObject.stroke),
      numBuckets
		)
		// Insert another check on the datasets to make sure they're long enough to process
		// shapeTrainingDataPoints.push(...dataSets) //all rotation permutations
    shapeTrainingDataPoints.push(dataSets[0]) //just one for faster runtime	
    // dataSets.forEach(() => {
    //   // For each of the stroke permutations, create an outputDataObject
    //   let outputDataObject = createOutputData(rawShapeObject.shape)
    //   shapeCorrespondingOutputData.push(outputDataObject)
		// })
		shapeCorrespondingOutputData.push(createOutputData(rawShapeObject.shape))
  })
  return { shapeTrainingDataPoints, shapeCorrespondingOutputData }
}
