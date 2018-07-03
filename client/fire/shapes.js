import { circlesDb, squaresDb, trianglesDb, linesDb } from './store'
import { processTrainingData } from '../dataTransforms'
import dummyShapeData from './dummyShapeData'

const fetchRawStrokeData = () => {
	let circles
	let squares
	let triangles
	let lines
	return (
		circlesDb
			.get()
			//  getting the raw circles
			.then((querySnapshot) => {
				let allShapesRaw = []
				//excluding strokes that are to short to be real
				querySnapshot.forEach((strokeObject) => {
					const strokeData = strokeObject.data()
					if (strokeData.stroke.length > 40) {
						allShapesRaw.push(strokeData)
					}
				})
				console.log('circles', allShapesRaw.length)
				//parsing the strokes from string to arrays
				let shapesParsed = allShapesRaw.map((shapeObject) => {
					return {
						shape: shapeObject.shape,
						stroke: JSON.parse(shapeObject.stroke)
					}
				})
				
				return shapesParsed
			})
			.then((shapesParsed) => {
				//saving the processed data into circles variable
				circles = processTrainingData(shapesParsed)
				console.log('circles', circles.shapeTrainingDataPoints.slice(0,10))
				//going for squares next
				return squaresDb.get()
				//--------------------------------repeat for squares--------------------------
			})
			.then((querySnapshot) => {
				let allShapesRaw = []
				//excluding strokes that are to short to be real
				querySnapshot.forEach((strokeObject) => {
					const strokeData = strokeObject.data()
					if (strokeData.stroke.length > 40) {
						allShapesRaw.push(strokeData)
					}
				})
				console.log('squares', allShapesRaw.length)
				//parsing the strokes from string to arrays
				let shapesParsed = allShapesRaw.map((shapeObject) => {
					return {
						shape: shapeObject.shape,
						stroke: JSON.parse(shapeObject.stroke)
					}
				})
				return shapesParsed
			})
			.then((shapesParsed) => {
				//saving the processed data into squares variable
				squares = processTrainingData(shapesParsed)
				//going for triangles next
				console.log('squares', squares.shapeTrainingDataPoints.slice(0,10))

				return trianglesDb.get()
				//--------------------------------repeat for triangles--------------------------
			})
			.then((querySnapshot) => {
				let allShapesRaw = []
				//excluding strokes that are to short to be real
				querySnapshot.forEach((strokeObject) => {
					const strokeData = strokeObject.data()
					if (strokeData.stroke.length > 40) {
						allShapesRaw.push(strokeData)
					}
				})
				//parsing the strokes from string to arrays
				let shapesParsed = allShapesRaw.map((shapeObject) => {
					return {
						shape: shapeObject.shape,
						stroke: JSON.parse(shapeObject.stroke)
					}
				})
				return shapesParsed
			})
			.then((shapesParsed) => {
				//saving the processed data into triangle variable
				triangles = processTrainingData(shapesParsed)
				//going for squares next
				return linesDb.get()
				//--------------------------------repeat for lines--------------------------
			})
			.then((querySnapshot) => {
				let allShapesRaw = []
				//excluding strokes that are to short to be real
				querySnapshot.forEach((strokeObject) => {
					const strokeData = strokeObject.data()
					if (strokeData.stroke.length > 40) {
						allShapesRaw.push(strokeData)
					}
				})
				console.log('lines', allShapesRaw.length)
				//parsing the strokes from string to arrays
				let shapesParsed = allShapesRaw.map((shapeObject) => {
					return {
						shape: shapeObject.shape,
						stroke: JSON.parse(shapeObject.stroke)
					}
				})
				return shapesParsed
			})
			.then((shapesParsed) => {
				//saving the processed data into lines variable
				lines = processTrainingData(shapesParsed)
				console.log('lines', lines.shapeTrainingDataPoints.slice(0,10))
			})
			.then(() => {
				return {
					//concat into separate arrays for training data and output data
					shapeTrainingDataPoints: circles.shapeTrainingDataPoints.concat(
						squares.shapeTrainingDataPoints,
						lines.shapeTrainingDataPoints
					),
					shapeCorrespondingOutputData: circles.shapeCorrespondingOutputData.concat(
						squares.shapeCorrespondingOutputData,
						lines.shapeCorrespondingOutputData
					)
				}
			})
	)
}
export default fetchRawStrokeData
