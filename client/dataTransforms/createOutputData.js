export default function createOutputData(shape) {
  return [
    shape === 'circle' ? 1 : 0,
    shape === 'square' ? 1 : 0,
    shape === 'line' ? 1 : 0
  ]
}
