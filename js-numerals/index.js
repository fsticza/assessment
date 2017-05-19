const U20 = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split(' ')
const TENS = ' twenty thirty forty fifty sixty seventy eighty ninety'.split(' ')
const SCALE = 'hundred thousand million billion'.split(' ')

const range = size => [...Array(size).keys()]
const reverseString = str => str.split('').reverse().join('')
const addTens = num => {
  let remaining = num % 10
  let result = TENS[Math.floor(num / 10) - 1]
  if (remaining) {
    result += '-' + U20[remaining]
  }
  return result
}

const jsNumeral = {
  toWords (num) {
    num = parseInt(num, 10)
    return new Promise((resolve, reject) => {
      if (!Number.isInteger(num) || !isFinite(num) || num < 0) {
        return reject(new Error('Feed me with positive integers!'))
      } else if (num < 20) {
        return resolve(U20[num])
      } else if (num > 1000000000) {
        return resolve(`dude, that's a loot`)
      }

      let numAsString = reverseString(String(num))
      let length = numAsString.length
      // split it up to make ddd groups
      let result = range(Math.ceil(length / 3))
        .map(i => reverseString(numAsString.slice(i * 3, i * 3 + 3)))
        .reverse()
        .reduce((curr, next, index, chunks) => {
          let nextInt = parseInt(next, 10)
          let chunkIndex = chunks.length - 1 - index
          let isFirst = index === 0
          let isLast = index === chunks.length - 1
          next = ''
          if (nextInt < 20) {
            if (!isFirst) {
              next += 'and '
            }
            next += U20[nextInt]
            if (!isLast) {
              next += ' ' + SCALE[chunkIndex]
            }
            if (num > 1000000) {
              next += ','
            }
          } else if (nextInt < 100) {
            if (!isFirst) {
              next += 'and '
            }
            next += addTens(nextInt)
          } else {
            let remaining = nextInt % 100
            next = U20[Math.floor(nextInt / 100)]
            if (remaining) {
              next += ' ' + SCALE[0] + ' and ' + addTens(remaining)
            }
            if (!isLast) {
              next += ' ' + SCALE[chunkIndex]
            }
          }
          curr.push(next)
          return curr
        }, []).join(' ')

      resolve(result)
    })
  }
}
module.exports = jsNumeral
