import { input } from '@tensorflow/tfjs'

export function processTrainingData(allData, numBuckets = 10){
	let trainingDataPoints = []
  let outputDataPoints = []
  
	allData.forEach(shape => {
		// Only evaluate stroke if it's long enough
		if (shape.stroke.length > 40){
      let stroke = JSON.parse(shape.stroke)
      console.log(removeSimilarDataPoints(stroke))
			let dataSets = generateDataSets(stroke, numBuckets)
			trainingDataPoints.push(...dataSets)
			// For each of the stroke permutations, create an outputDataObject
			dataSets.forEach(() => {
				let outputDataObject = createOutputData(shape.shape)
				outputDataPoints.push(outputDataObject)
			})
		}
  })
  // console.log(trainingDataPoints)
	return { trainingDataPoints, outputDataPoints }
}

function removeSimilarDataPoints(xYs){
    let xS = [];
    let yS = [];
    xYs.forEach(co => {
      let start = co[0]
      let end = co[1]

      xS.push(start[0], end[0])
      yS.push(start[1], end[1])
    })

    let standX = standardDeviation(xS)
    let standY = standardDeviation(yS)

    let previous = xYs[0];
    // console.log(previous)
    let further = xYs.filter(coords => {
      if(Math.abs(coords[1][0] - previous[1][0]) > standX) return false;
      if(Math.abs(coords[1][1] - previous[1][1]) > standY) return false;
      return true
    })

    return further;
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

function standardDeviation(values){
  var avg = average(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = average(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

function average(data){
  var sum = data.reduce(function(sum, value){
    return sum + value;
  }, 0);

  var avg = sum / data.length;
  return avg;
}