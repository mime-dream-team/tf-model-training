import { strokeDb } from './store'
import { processTrainingData } from '../dataTransforms'
import dummyShapeData from './dummyShapeData'

const fetchRawStrokeData = () => {
	let allShapesParsed = []
	return strokeDb.get()
		.then(querySnapshot => {
			let allShapesRaw = []
			querySnapshot.forEach(strokeObject => {
				const strokeData = strokeObject.data()
				if (strokeData.stroke.length > 40) {
					allShapesRaw.push(strokeData)
				}
			})
			allShapesParsed = allShapesRaw.map(shapeObject => {
				return { shape: shapeObject.shape, stroke: JSON.parse(shapeObject.stroke) }
			})
			return allShapesParsed
		})
		.then(allShapesParsed => {
			return processTrainingData(allShapesParsed)
		})
}

export default fetchRawStrokeData

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

