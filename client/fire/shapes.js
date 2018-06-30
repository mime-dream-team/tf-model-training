import { strokeDb } from './store'
import { processTrainingData } from '../dataTransforms'
import dummyShapeData from './dummyShapeData'

const fetchRawStrokeData = () => {
	let allShapesParsed = []
	// return strokeDb.get()
	// 	.then(querySnapshot => {
	// 		let allShapesRaw = []
	// 		querySnapshot.forEach(strokeObject => {
	// 			const strokeData = strokeObject.data()
	// 			if (strokeData.stroke.length > 40) {
	// 				allShapesRaw.push(strokeData)
	// 			}
	// 		})
	// 		allShapesParsed = allShapesRaw.map(shapeObject => {
	// 			return { shape: shapeObject.shape, stroke: JSON.parse(shapeObject.stroke) }
	// 		})
	// 		return allShapesParsed
	// 	})
	// 	.then(allShapesParsed => {
	// 		return processTrainingData(allShapesParsed)
	// 	})
}

export default fetchRawStrokeData
