export default function removeSimilarDataPoints(xYs) {
  let xS = []
  let yS = []
  xYs.forEach(co => {
    let start = co[0]
    let end = co[1]

    xS.push(start[0], end[0])
    yS.push(start[1], end[1])
  })

  let standX = standardDeviation(xS)
  let standY = standardDeviation(yS)
  let previous = xYs[0]
  // console.log(previous)
  let further = xYs.filter(coords => {
    // console.log(coords[1][0] - previous[1][0], coords[1][1] - previous[1][1])
    if (Math.abs(coords[1][0] - previous[1][0]) > standX) {
      previous = coords
      return false
    }
    if (Math.abs(coords[1][1] - previous[1][1]) > standY) {
      previous = coords
      return false
    }
    previous = coords
    return true
  })

  return further
}

function standardDeviation(values) {
  var avg = average(values)

  var squareDiffs = values.map(function(value) {
    var diff = value - avg
    var sqrDiff = diff * diff
    return sqrDiff
  })

  var avgSquareDiff = average(squareDiffs)

  var stdDev = Math.sqrt(avgSquareDiff)
  return stdDev
}

function average(data) {
  var sum = data.reduce(function(sum, value) {
    return sum + value
  }, 0)

  var avg = sum / data.length
  return avg
}
