const fs = require('fs/promises');
const path = require('path');
const { listeners, nextTick } = require('process');

const filePath = 'input.txt'

fs.readFile(filePath).then(fileBuffer => {
  const fileByLine = fileBuffer.toString().split(/(?:\r\n|\r|\n)/g)

  const directions = [
    // H V
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ];

  const Xdirections = [
    // H V
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ];


  const findIt = (pattern, directions, haystack, currX, currY) => {
    if (pattern.length === 0) {
      //console.log('end')
      return true;
    }
    const searchLetter = pattern.shift()
    return haystack[currX]?.[currY] === searchLetter && findIt(pattern, directions, haystack, currX + directions[0], currY + directions[1])
  }

  let sum = 0

  for (let i = 0; i < fileByLine.length; ++i) {
    //for (let i = 0; i < 2; ++i) {
    const line = fileByLine[i];

    //for (let j = 0; j < 10; ++j) {
    for (let j = 0; j < line.length; ++j) {
      for (let dir = 0; dir < directions.length; ++dir) {
        if (findIt('XMAS'.split(''), directions[dir], fileByLine, i, j)) {
          sum += 1
        }
      }

    }
  }

  const findX = (haystack, currX, currY) => {
    let text = Xdirections.reduce((text, currDirection) => {
      const newX = currX + currDirection[0]
      const newY = currY + currDirection[1]
      //console.log(haystack[c]?.[currDirection[1]], ' ', text)
      return text.concat(['M', 'S'].includes(haystack[newX]?.[newY]) ? haystack[newX][newY] : '')
    }, '')

    //console.log(text, ': ', text.length,'_',  text.length === 4)
    //console.log(text, ': ', text.length,'_',  text.length === 4 && text.shift() !== text.pop() && text.shift() !== text.pop()
    //)

    text = (text || '').split('')


    return text.length === 4 && text.shift() !== text.pop() && text.shift() !== text.pop()

  }
  let sumX = 0

  for (let i = 0; i < fileByLine.length; ++i) {
    //for (let i = 0; i < 2; ++i) {
    const line = fileByLine[i];

    //for (let j = 0; j < 10; ++j) {
    for (let j = 0; j < line.length; ++j) {
      if (fileByLine[i][j] === 'A' && findX(fileByLine, i, j)) {
        sumX += 1
      }

    }
  }



  console.log(fileByLine.length)
  console.log(fileByLine[1])
  console.log("Sum: ", sum)
  console.log("SumX: ", sumX)
})

fs.readFile(path.resolve(__dirname, filePath), 'utf8'); 
