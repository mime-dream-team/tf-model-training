export function generateDataSets(inputArr, numBuckets) {
  let allDataPoints = []
  const dataGap = Math.floor(inputArr.length / numBuckets)
  for (let i = 0; i < numBuckets; i++) {
    let dataSample = reduceDataPoints(i, inputArr, dataGap, numBuckets)
    allDataPoints.push(dataSample)
  }

  return allDataPoints
}

export function reduceDataPoints(startIdx, inputArr, dataGap, numBuckets) {
  let dataSample = []
  let pointer = startIdx
  while (dataSample.length < numBuckets) {
    dataSample.push(inputArr[pointer % inputArr.length])
    pointer += dataGap
  }
  return dataSample
}
