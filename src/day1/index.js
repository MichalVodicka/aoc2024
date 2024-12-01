const fs = require('fs/promises');
const path = require('path');

const filePath = 'input.txt'

fs.readFile(filePath).then(fileBuffer => {
  const fileByLine = fileBuffer.toString().split(/(?:\r\n|\r|\n)/g)
  const unsortedLines = fileByLine.reduce((sum, currLine) => {
    const [first, second] = currLine.split(' ').filter(Boolean)
    return [
      [...sum[0], first],
      [...sum[1], second]
    ]
  }, Array([], []))

  // sort arrays and cleanup
  const [left, right] =
    [
      unsortedLines[0].sort((a, b) => a - b).filter(Number).map(Number),
      unsortedLines[1].sort((a, b) => a - b).filter(Number).map(Number)
    ]
  // similiarity - second task
  const rightListSimil = right.reduce((hashmap, entity) => ({
    ...hashmap,
    [entity]: (hashmap[entity] || 0) + 1
  }
  ), {})

  const sumSimiliarity = left.reduce((sum, entity) => {
    return sum + entity * (rightListSimil[entity] || 0)
  }, 0)

  // distance - first task
  let sumDistance = 0
  while (left.length) {
    sumDistance += Math.abs(left.pop() - right.pop())
  }

  console.log("Distance: ", sumDistance)
  console.log("Similiarity: ", sumSimiliarity)
})

fs.readFile(path.resolve(__dirname, filePath), 'utf8'); 
