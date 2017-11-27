// Import from the module './whiteboard':
//   The default export, naming it draw,
//   An export named `events`, calling it `whiteboard`.
import whiteboard, {draw} from './whiteboard'

// Example: Draw a single stroke.
draw([0, 0], [250, 250], 'red', true)
