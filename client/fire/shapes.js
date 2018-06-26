import { strokeDb } from './store'
import { processTrainingData } from '../dataTransforms'
import dummyShapeData from './dummyShapeData'

const fetchRawStrokeData = async () => {
  // const querySnapshot = await strokeDb.get()
  //DO NOT uncomment the line above until we are actually ready to test, exceeded firebase read quota (18¢)
  let allShapesRaw = []
  dummyShapeData.forEach(strokeObject => {
    if (strokeObject.stroke.length > 40) {
      allShapesRaw.push(strokeObject.data())
    }
  })
  // querySnapshot.forEach(strokeObject => {
  //   if (strokeObject.stroke.length > 40) {
  //     allShapesRaw.push(strokeObject.data())
  //   }
  // })
  let allShapesParsed = allShapesRaw.map(shapeObject => {
    return { shape: shapeObject.shape, stroke: JSON.parse(shapeObject.stroke) }
  })
  return { allShapesParsed }
}

const {
  shapeTrainingDataPoints,
  shapeCorrespondingOutputData
} = processTrainingData(fetchRawStrokeData)

// let trainingCircles = []
// let trainingSquares = []

// for (let i = 0; i < shapeTrainingDataPoints.length; i++) {
//   while (trainingCircles.length < 101 && trainingSquares.length < 101) {
//     if (shapeCorrespondingOutputData[i] === [1, 0]) {
//       trainingCircles.push(shapeTrainingDataPoints[i])
//     }
//     if (shapeCorrespondingOutputData[i] === [0, 1]) {
//       trainingSquares.push(shapeTrainingDataPoints[i])
//     }
//   }
// }

// let actualCircle = trainingCircles.pop()
// let actualSquare = trainingSquares.pop()

export default {
  shapeTrainingDataPoints,
  shapeCorrespondingOutputData
  // trainingCircles,
  // trainingSquares,
  // actualCircle,
  // actualSquare
}
