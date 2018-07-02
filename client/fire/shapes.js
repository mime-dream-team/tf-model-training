import { circlesDb, squaresDb, trianglesDb, linesDb } from './store'
import { processTrainingData } from '../dataTransforms'

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
			})
			.then(() => {
				return {
					//concat into separate arrays for training data and output data
					shapeTrainingDataPoints: circles.shapeTrainingDataPoints.concat(
						squares.shapeTrainingDataPoints,
						triangles.shapeTrainingDataPoints,
						lines.shapeTrainingDataPoints
					),
					shapeCorrespondingOutputData: circles.shapeCorrespondingOutputData.concat(
						squares.shapeCorrespondingOutputData,
						triangles.shapeCorrespondingOutputData,
						lines.shapeCorrespondingOutputData
					)
				}
			})
	)
}

export default fetchRawStrokeData
