/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_js__);




var formEl = document.querySelector('form[data-js="form"]');
var resultEl = formEl.result;
var onSubmit = function onSubmit(ev) {
  ev.preventDefault();
  resultEl.value = 'pending...';
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__index_js__["toWords"])(parseInt(ev.target.value, 10)).then(function (result) {
    resultEl.value = result;
    return result;
  }).catch(function (err) {
    resultEl.value = err.message;
  });
};

formEl.addEventListener('submit', onSubmit, false);
formEl.addEventListener('input', onSubmit, false);

/***/ })
/******/ ]);