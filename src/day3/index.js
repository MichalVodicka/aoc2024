const fs = require('fs/promises');
const path = require('path');
const { argv0, resourceUsage } = require('process');

const filePath = 'input.txt'

fs.readFile(filePath).then(fileBuffer => {
  const fileByLine = fileBuffer.toString().replace(/(\r\n|\n|\r)/gm, "")

  const incorectInstruction = fileByLine.split('mul').filter(Boolean)
  // with a little help from the internet [:shameful smile:]
  const corruptedInstructions = fileByLine
    .split('do()')
    .map(i => i.split("don't()")[0])
    .filter(Boolean)
    .reduce((instructions, chunk) => {

    return [
      ...instructions,
      ...(chunk.split('mul').filter(Boolean))
    ]
  }, [])

  const separ = instruction => {
    return instruction.substring(0, instruction.indexOf(')') + 1);
  }

  const summul = incorectInstruction.map(separ)
    .filter(Boolean)
    .filter(instruction => instruction.startsWith('(') && instruction.endsWith(')'))
    .map(instruction => instruction.substring(1, instruction.length - 1))
    .filter(Boolean)
    .reduce((sum, instruction) => {
      const [first, second] = instruction.split(',').map(Number)

      if (isNaN(first) || isNaN(second)) {
        return sum
      }
      return sum + first * second
    }, 0)


  // too high 112982545
  const summulCurrupted = corruptedInstructions.map(separ)
    // filter out empty stringsx
    .filter(Boolean)
    // filter out incompleted or corrupted data
    .filter(instruction => instruction.startsWith('(') && instruction.endsWith(')'))
    .map(instruction => instruction.substring(1, instruction.length - 1))
    .filter(Boolean)
    .reduce((sum, instruction) => {
      const [first, second] = instruction.split(',').map(Number)
      if (isNaN(first) || isNaN(second)) {
        return sum
      }

      return sum + first * second
    }, 0)

  console.log("Sum: ", summul)
  console.log("SumFiltered: ", summulCurrupted)
})

fs.readFile(path.resolve(__dirname, filePath), 'utf8'); 
