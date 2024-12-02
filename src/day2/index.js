const fs = require('fs/promises');
const path = require('path');

const filePath = 'input.txt'

fs.readFile(filePath).then(fileBuffer => {
  const fileByLine = fileBuffer.toString().split(/(?:\r\n|\r|\n)/g)
  const unsortedLines = fileByLine.map((currLine) => currLine.split(' ').filter(Boolean))

  const lineTester = lineOrig => {
    const line = lineOrig.map(x => x)
    let decrease = 0;
    let increase = 0;
    let unsafe = 0;
    let refNumber = Number(line.shift());
    if (!refNumber) {
      return false;
    }
    while (line.length) {
      const currNumber = Number(line.shift())
      // find 
      if (currNumber < refNumber) {
        decrease = 1
      }
      if (currNumber > refNumber) {
        increase = 1
      }
      if (Math.abs(currNumber - refNumber) < 1 || Math.abs(currNumber - refNumber) > 3) {
        unsafe = 1
        break;
      }
      refNumber = currNumber
    }
    // logic debugger;
    return unsafe || (decrease && increase) ? false : true
  }

  const safeLines = unsortedLines.reduce((lines, line) => {
    if (line.length < 1) {
      return lines
    }
    return lineTester(line) ? ++lines : lines

  }, 0)

  const badLines = unsortedLines.filter(line => {
    if (line.length < 1) {
      return false
    }
    return !lineTester(line)
  })

  const safeLinesProblemDampener = badLines.reduce((lines, line) => {
    let safeVariants = 0;
    line.filter((_, idx, arrOrig) => {
      const arr = arrOrig.filter((_, idxe) => idx !== idxe)
      if (lineTester(arr)) {
        safeVariants++
      }
    }).length

    return safeVariants > 0 ? ++lines : lines
  }, 0)

  console.log("Safe lines: ", safeLines)
  console.log("Similiarity: ", safeLines + safeLinesProblemDampener)
})

fs.readFile(path.resolve(__dirname, filePath), 'utf8'); 
