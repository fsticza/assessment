/* global describe, it */
const expect = require('chai').expect
const jsNumeral = require('./')

describe('jsNumeral', () => {
  it('module should exist', () => {
    expect(jsNumeral).to.exist
  })
  describe('.toWords()', () => {
    it('should return a Promise', () => {
      expect(jsNumeral.toWords(0)).to.be.a('promise')
    })
    it('should reject string inputs', done => {
      return jsNumeral.toWords('a')
        .then(() => done(new Error('Bad input: string')))
        .catch(err => {
          expect(err).to.be.an('error')
          done()
        })
    })
    it('should reject negative inputs', done => {
      return jsNumeral.toWords(-1)
        .then(() => done(new Error('Bad input: negative number')))
        .catch(err => {
          expect(err).to.be.an('error')
          done()
        })
    })
    it('should return "seven" for input 7', done => {
      return jsNumeral.toWords(7)
        .then(result => {
          expect(result).to.equal('seven')
          done()
        })
        .catch(done)
    })
    it('should return "forty-two" for input 42', done => {
      return jsNumeral.toWords(42)
        .then(result => {
          expect(result).to.equal('forty-two')
          done()
        })
        .catch(done)
    })
    it('should return "one hundred and twenty" for input 120', done => {
      return jsNumeral.toWords(120)
        .then(result => {
          expect(result).to.equal('one hundred and twenty')
          done()
        })
        .catch(done)
    })
    it('should return "two thousand and one" for input 2001', done => {
      return jsNumeral.toWords(2001)
        .then(result => {
          expect(result).to.equal('two thousand and one')
          done()
        })
        .catch(done)
    })
    it('should return "one thousand nine hundred and ninety-nine" for input 1999', done => {
      return jsNumeral.toWords(1999)
        .then(result => {
          expect(result).to.equal('one thousand nine hundred and ninety-nine')
          done()
        })
        .catch(done)
    })
    it('should return "twelve thousand six hundred and twenty-five" for input 12625', done => {
      return jsNumeral.toWords(12625)
        .then(result => {
          expect(result).to.equal('twelve thousand six hundred and twenty-five')
          done()
        })
        .catch(done)
    })
    it('should return "three million, six hundred and thirty-six thousand and seventy-one" for input 3636071', done => {
      return jsNumeral.toWords(3636071)
        .then(result => {
          expect(result).to.equal('three million, six hundred and thirty-six thousand and seventy-one')
          done()
        })
        .catch(done)
    })
  })
})
