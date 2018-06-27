import generateDataSets from './generateDataSets'
import removeSimilarDataPoints, { mapStandardDeviation } from './removeSimilarDataPoints'
import createOutputData from './createOutputData'

export default function processTrainingData(parsedShapes, numBuckets = 10) {
  let shapeTrainingDataPoints = []
  let shapeCorrespondingOutputData = []
  parsedShapes.forEach(rawShapeObject => {
    let dataSets = generateDataSets(
      removeSimilarDataPoints(rawShapeObject.stroke),
      numBuckets
		)
		// NOTE TO SELF: Insert another check on the datasets to make sure they're long enough to process

		// FOR FASTER RUNTIME, ONLY SELECT THE FIRST ELEMENT OF THE DATASET PERMUTATIONS
		// shapeTrainingDataPoints.push(mapStandardDeviation(dataSets[0]))
		// shapeCorrespondingOutputData.push(createOutputData(rawShapeObject.shape))

		// TO RUN ALL DATASETS
		shapeTrainingDataPoints.push(...dataSets) // all rotation permutations
    dataSets.forEach(() => {
      // For each of the stroke permutations, create an outputDataObject
      let outputDataObject = createOutputData(rawShapeObject.shape)
      shapeCorrespondingOutputData.push(outputDataObject)
		})
  })
  return { shapeTrainingDataPoints, shapeCorrespondingOutputData }
}
