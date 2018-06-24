import { input } from '@tensorflow/tfjs'

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
