import { strokeDb } from './store'

import {
  createOutputData,
  generateDataSets,
  processTrainingData,
  reduceDataPoints,
  reduceDataPointsWithSpread,
  removeSimilarDataPoints,
  scaleToStandardSize,
  standardDeviation
} from '../dataTransforms'

//comes back as an array of objects that have a shape property and a stoke
const fetchRawStrokeData = async () => {
  //const querySnapshot = await strokeDb.get()
  //DO NOT uncomment the line above until we are actually ready to test, exceeded firebase read quota (18¢)
  let rawCircleArrays = []
  let rawSquareArrays = []
  querySnapshot.forEach(strokeObject => {
    if (strokeObject.shape === 'circle') {
      rawCircleArrays.push(strokeObject.data())
    }
    if (strokeObject.shape === 'square') {
      rawSquareArrays.push(strokeObject.data())
    }
  })
  rawCircleArrays.map(circleObject => JSON.parse(circleObject.stroke))
  rawSquareArrays.map(squareObject => JSON.parse(squareObject.stroke))
  return { rawCircleArrays, rawSquareArrays }
}
//1-remove junt arrays no longer than 40

//here we do other things to transform the data

const trainingCircles = []
const trainingSquares = []
//array of 100+ circle arrays each with length 20
export default { trainingCircles, trainingSquares }
