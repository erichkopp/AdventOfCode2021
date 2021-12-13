
const parsePuzzleInput = () => {
    let parsedData = []

    const fs = require('fs')
    let puzzleInput = fs.readFileSync('day04_data.txt', 'utf8').split('\n')

    let drawNumbers = puzzleInput[0].split(',')
    parsedData.push(drawNumbers)

    // Sanitize & format data
    puzzleInput.splice(0, 2)
    puzzleInput.push('')

    let allPuzzles = []
    let singlePuzzle = []
    puzzleInput.forEach((line, i) => {
        if (line.length !== 0) {
            singlePuzzle.push(line.trim().split(/\s+/))
        } else {
            allPuzzles.push(singlePuzzle)
            singlePuzzle = []
        }
    });

    parsedData.push(allPuzzles)

    return parsedData
}


const playBingoPt1 = (drawNumbers, allPuzzles) => {

    let sumOfRemainingNums = 0

    mainLoop:
    for (let drawNumIndex = 0; drawNumIndex < drawNumbers.length; drawNumIndex++) {
        for (let puzzleIndex = 0; puzzleIndex < allPuzzles.length; puzzleIndex++) {
            for (let lineIndex = 0; lineIndex < allPuzzles[puzzleIndex].length; lineIndex++) {
                for (let boardNumIndex = 0; boardNumIndex < allPuzzles[puzzleIndex][lineIndex].length; boardNumIndex++) {
                    if (drawNumbers[drawNumIndex] === allPuzzles[puzzleIndex][lineIndex][boardNumIndex]) {
                        allPuzzles[puzzleIndex][lineIndex][boardNumIndex] = '*'

                        // Find horizontal bingo
                        for (let puzzleIndex = 0; puzzleIndex < allPuzzles.length; puzzleIndex++) {
                            for (let lineIndex = 0; lineIndex < allPuzzles[puzzleIndex].length; lineIndex++) {

                                if (allPuzzles[puzzleIndex][lineIndex].join('') === '*****') {
                                    console.log(`BINGO! Puzzle ${puzzleIndex + 1}`)
                                    console.log(allPuzzles[puzzleIndex])

                                    allPuzzles[puzzleIndex].flat().filter(num => num !== '*').forEach(num => {
                                        sumOfRemainingNums += parseInt(num)
                                    })

                                    console.log(sumOfRemainingNums)
                                    console.log(sumOfRemainingNums * drawNumbers[drawNumIndex])

                                    break mainLoop
                                }
                            }
                        }

                        // Find vertical bingo
                        for (let i = 0; i < allPuzzles[0].length; i++) {
                            let vertical = []
                            for (let puzzleIndex = 0; puzzleIndex < allPuzzles.length; puzzleIndex++) {
                                for (let lineIndex = 0; lineIndex < allPuzzles[puzzleIndex].length; lineIndex++) {
                                    vertical.push(allPuzzles[puzzleIndex][lineIndex][i])

                                    if (vertical.join('') === '*****') {
                                        console.log(`BINGO! Puzzle ${puzzleIndex + 1}`)
                                        console.log(allPuzzles[puzzleIndex])

                                        allPuzzles[puzzleIndex].flat().filter(num => num !== '*').forEach(num => {
                                            sumOfRemainingNums += parseInt(num)
                                        })

                                        console.log(sumOfRemainingNums)
                                        console.log(sumOfRemainingNums * drawNumbers[drawNumIndex])

                                        break mainLoop
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    // console.log(allPuzzles)
}


playBingoPt1(parsePuzzleInput()[0], parsePuzzleInput()[1])
