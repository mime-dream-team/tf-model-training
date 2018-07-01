import firebase from './fire'
import 'firebase/firestore'

const settings = {timestampsInSnapshots: true};
const db = firebase.firestore()
db.settings(settings)

export const strokeDb = db.collection("strokes")
export const newStrokeDb = db.collection("newStrokes")