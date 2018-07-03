import * as tf from '@tensorflow/tfjs'
import model from './model'
import fetchRawStrokeData from '../fire/shapes'
import { processTrainingData } from '../dataTransforms'

const realCircle = [{type:'circle', stroke: [[[350, 206], [350, 205]], [[350, 205], [350, 204]], [[350, 204], [349, 202]], [[349, 202], [349, 201]], [[349, 201], [347, 199]], [[347, 199], [345, 198]], [[345, 198], [341, 195]], [[341, 195], [328, 188]], [[328, 188], [324, 186]], [[324, 186], [317, 183]], [[317, 183], [312, 182]], [[312, 182], [309, 181]], [[309, 181], [293, 180]], [[293, 180], [286, 180]], [[286, 180], [282, 181]], [[282, 181], [277, 182]], [[277, 182], [275, 183]], [[275, 183], [266, 191]], [[266, 191], [265, 193]], [[265, 193], [262, 198]], [[262, 198], [259, 204]], [[259, 204], [257, 211]], [[257, 211], [254, 223]], [[254, 223], [254, 226]], [[254, 226], [254, 233]], [[254, 233], [255, 243]], [[255, 243], [257, 255]], [[257, 255], [261, 268]], [[261, 268], [263, 274]], [[263, 274], [272, 286]], [[272, 286], [280, 294]], [[280, 294], [292, 298]], [[292, 298], [297, 298]], [[297, 298], [315, 297]], [[315, 297], [319, 296]], [[319, 296], [325, 292]], [[325, 292], [333, 286]], [[333, 286], [341, 277]], [[341, 277], [346, 271]], [[346, 271], [347, 269]], [[347, 269], [352, 261]], [[352, 261], [354, 255]], [[354, 255], [355, 250]], [[355, 250], [355, 249]], [[355, 249], [356, 245]], [[356, 245], [356, 243]], [[356, 243], [356, 240]], [[356, 240], [356, 231]], [[356, 231], [356, 230]], [[356, 230], [356, 228]], [[356, 228], [356, 225]], [[356, 225], [356, 224]], [[356, 224], [355, 221]], [[355, 221], [354, 219]], [[354, 219], [353, 216]], [[353, 216], [353, 215]], [[353, 215], [352, 211]], [[352, 211], [350, 209]], [[350, 209], [350, 208]], [[350, 208], [349, 207]], [[349, 207], [348, 205]], [[348, 205], [347, 205]], [[347, 205], [346, 204]], [[346, 204], [346, 203]], [[346, 203], [345, 203]]]}]

const realSquare = [{type: 'square', stroke: [[[253, 693], [253, 694]], [[253, 694], [253, 694]], [[253, 694], [253, 700]], [[253, 700], [253, 706]], [[253, 706], [253, 714]], [[253, 714], [253, 724]], [[253, 724], [253, 736]], [[253, 736], [253, 746]], [[253, 746], [253, 751]], [[253, 751], [253, 756]], [[253, 756], [253, 759]], [[253, 759], [253, 760]], [[253, 760], [253, 761]], [[253, 761], [253, 761]], [[253, 761], [254, 761]], [[254, 761], [254, 761]], [[254, 761], [255, 761]], [[255, 761], [256, 760]], [[256, 760], [256, 760]], [[256, 760], [258, 759]], [[258, 759], [260, 759]], [[260, 759], [264, 759]], [[264, 759], [270, 759]], [[270, 759], [277, 759]], [[277, 759], [286, 759]], [[286, 759], [294, 759]], [[294, 759], [302, 760]], [[302, 760], [307, 760]], [[307, 760], [312, 760]], [[312, 760], [315, 760]], [[315, 760], [319, 760]], [[319, 760], [321, 760]], [[321, 760], [323, 760]], [[323, 760], [325, 760]], [[325, 760], [327, 760]], [[327, 760], [328, 760]], [[328, 760], [330, 760]], [[330, 760], [331, 760]], [[331, 760], [332, 759]], [[332, 759], [332, 758]], [[332, 758], [333, 757]], [[333, 757], [333, 755]], [[333, 755], [333, 753]], [[333, 753], [333, 750]], [[333, 750], [333, 746]], [[333, 746], [333, 742]], [[333, 742], [333, 738]], [[333, 738], [332, 731]], [[332, 731], [332, 724]], [[332, 724], [332, 713]], [[332, 713], [332, 706]], [[332, 706], [332, 702]], [[332, 702], [332, 699]], [[332, 699], [332, 698]], [[332, 698], [332, 697]], [[332, 697], [332, 696]], [[332, 696], [332, 696]], [[332, 696], [332, 696]], [[332, 696], [332, 695]], [[332, 695], [332, 695]], [[332, 695], [331, 695]], [[331, 695], [330, 695]], [[330, 695], [327, 695]], [[327, 695], [325, 695]], [[325, 695], [323, 695]], [[323, 695], [320, 694]], [[320, 694], [315, 694]], [[315, 694], [309, 694]], [[309, 694], [303, 693]], [[303, 693], [296, 693]], [[296, 693], [289, 692]], [[289, 692], [282, 691]], [[282, 691], [272, 690]], [[272, 690], [267, 690]], [[267, 690], [261, 689]], [[261, 689], [256, 689]], [[256, 689], [253, 689]], [[253, 689], [250, 689]], [[250, 689], [248, 688]], [[248, 688], [248, 688]], [[248, 688], [248, 688]]]}]

const realLine = [{type: 'line', stroke: [[[1203,418],[1195,418]],[[1195,418],[1173,417]],[[1173,417],[1139,413]],[[1139,413],[1086,412]],[[1086,412],[979,411]],[[979,411],[859,411]],[[859,411],[781,411]],[[781,411],[759,411]],[[759,411],[736,412]],[[736,412],[721,412]],[[721,412],[715,412]]]}]


const testingDataCircle = processTrainingData(realCircle).shapeTrainingDataPoints[0]
const testingDataSquare = processTrainingData(realSquare).shapeTrainingDataPoints[0]
const testingDataLine = processTrainingData(realLine).shapeTrainingDataPoints[0]
// const testingDataLine = processTrainingData(realLine).shapeTrainingDataPoints[0]


const runTraining = () => {
	fetchRawStrokeData()
		.then(({ shapeTrainingDataPoints, shapeCorrespondingOutputData }) => {
			const trainingDataTensor = tf.tensor2d(shapeTrainingDataPoints)
			const outputDataTensor = tf.tensor2d(shapeCorrespondingOutputData)
			const testingDataTensor = tf.tensor2d([testingDataCircle, testingDataSquare, testingDataLine])

			const startTime = Date.now()
			// model
			// 	.fit(trainingDataTensor, outputDataTensor, { epochs: 100 })
			// 	.then(history => {
			// 		console.log(history)
			// 		console.log(Date.now() - startTime)
			// 		// model.predict(testingDataTensor).print()
			// 		// model.save('downloads://shape-recognition')
			// 	})
		})
}

export default runTraining
