import * as tf from '@tensorflow/tfjs'
import { strokeDb } from '../fire/store'
import model from './model'

const trainingData = tf.tensor2d([[200,100,200,100,200,100,200,100,200,100,200,100,200,100,200,100,200,100,200,100],[300,100,300,100,300,100,300,100,300,100,300,100,300,100,300,100,300,100,300,100]]);

const outputData = tf.tensor2d([[1,.8,.6,.4,.2],[.2,.4,.6,.8,1]]);

const testingData = tf.tensor2d([[200,100,200,100,200,100,200,100,200,100,200,100,200,100,200,100,200,100,200,100],[300,100,300,100,300,100,300,100,300,100,300,100,300,100,300,100,300,100,300,100]]);

const startTime = Date.now();
model.fit(trainingData, outputData, {epochs: 300})
	.then(history => {
			console.log(Date.now()-startTime)
			model.predict(testingData).print()
	})
