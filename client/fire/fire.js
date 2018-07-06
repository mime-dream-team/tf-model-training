import fire from 'firebase'
import { config } from '../fireconfig'

fire.initializeApp(config)

export default fire
