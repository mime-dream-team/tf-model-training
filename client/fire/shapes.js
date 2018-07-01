import { strokeDb, newStrokeDb } from './store'
import { processTrainingData } from '../dataTransforms'
import dummyShapeData from './dummyShapeData'

const fetchRawStrokeData = () => {
	let allShapesParsed = []
	let circsAndSquares;
	let trianglesAndLines;
	return strokeDb
		.get()
		.then(querySnapshot => {
			let allShapesRaw = []
			querySnapshot.forEach(strokeObject => {
				const strokeData = strokeObject.data()
				if (strokeData.stroke.length > 40) {
					allShapesRaw.push(strokeData)
				}
			})
			allShapesParsed = allShapesRaw.map(shapeObject => {
				return {
					shape: shapeObject.shape,
					stroke: JSON.parse(shapeObject.stroke)
				}
			})
			return allShapesParsed
		})
		.then(allShapesParsed => {
			circsAndSquares = processTrainingData(allShapesParsed)
			allShapesParsed = []

			return newStrokeDb.get()
		})
		.then(querySnapshot => {
			let allShapesRaw = []
			querySnapshot.forEach(strokeObject => {
				const strokeData = strokeObject.data()
				if (strokeData.stroke.length > 40) {
					allShapesRaw.push(strokeData)
				}
			})
			allShapesParsed = allShapesRaw.map(shapeObject => {
				return {
					shape: shapeObject.shape,
					stroke: JSON.parse(shapeObject.stroke)
				}
			})
			return allShapesParsed
		})
		.then(allShapesParsed => {
			trianglesAndLines = processTrainingData(allShapesParsed)
		})
		.then(() => {
			return {
				shapeTrainingDataPoints: circsAndSquares.shapeTrainingDataPoints.concat(trianglesAndLines.shapeTrainingDataPoints), 
				shapeCorrespondingOutputData: circsAndSquares.shapeCorrespondingOutputData.concat(trianglesAndLines.shapeCorrespondingOutputData)
			}
		})
}

export default fetchRawStrokeData
