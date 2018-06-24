import { input } from '@tensorflow/tfjs'

export function processTrainingData(allData, numBuckets = 10){
	let trainingDataPoints = []
	let outputDataPoints = []
	allData.forEach(shape => {
		// Only evaluate stroke if it's long enough
		if (shape.stroke.length > 40){
			let stroke = JSON.parse(shape.stroke)
			let dataSets = generateDataSets(stroke, numBuckets)
			trainingDataPoints.push(...dataSets)
			// For each of the stroke permutations, create an outputDataObject
			dataSets.forEach(() => {
				let outputDataObject = createOutputData(shape.shape)
				outputDataPoints.push(outputDataObject)
			})
		}
	})
	return { trainingDataPoints, outputDataPoints }
}

function createOutputData(shape) {
	return [
		shape === 'circle' ? 1 : 0,
		shape === 'square' ? 1 : 0,
		shape === 'rectangle' ? 1 : 0,
		shape === 'triangle' ? 1 : 0,
		shape === 'line' ? 1 : 0
	]
}

export function generateDataSets(inputArr, numBuckets) {
  let allDataPoints = []
  const dataGap = Math.floor(inputArr.length / numBuckets)
  for (let i = 0; i < numBuckets; i++) {
    let dataSample = reduceDataPointsWithSpread(
      i,
      inputArr,
      dataGap,
      numBuckets
    )
    allDataPoints.push(dataSample)
  }
  return allDataPoints
}

function reduceDataPointsWithSpread(startIdx, inputArr, dataGap, numBuckets) {
  let dataSample = []
  let pointer = startIdx
  while (dataSample.length < numBuckets * 2 - 1) {
    let currentArr = inputArr[pointer % inputArr.length]
    dataSample.push(...currentArr[0])
    dataSample.push(...currentArr[1])
    pointer += dataGap
  }
  return dataSample
}

function reduceDataPoints(startIdx, inputArr, dataGap, numBuckets) {
  let dataSample = []
  let pointer = startIdx
  while (dataSample.length < numBuckets) {
    let currentArr = inputArr[pointer % inputArr.length]
    dataSample.push(currentArr)
    pointer += dataGap
  }
  return dataSample
}
