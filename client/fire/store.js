import firebase from './fire'
import 'firebase/firestore'

const settings = {timestampsInSnapshots: true};
const db = firebase.firestore()
db.settings(settings)

export const circlesDb = db.collection('circles')
export const squaresDb = db.collection('squares')
export const trianglesDb = db.collection('triangles')
export const linesDb = db.collection('lines')