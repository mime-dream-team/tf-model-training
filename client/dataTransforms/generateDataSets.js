import reduceDataPointsWithSpread from './reduceDataPointsWithSpread'
import reduceDataPoints from './reduceDataPoints'

export default function generateDataSets(inputArr, numBuckets) {
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
