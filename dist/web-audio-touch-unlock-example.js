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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var web_audio_touch_unlock_1 = __webpack_require__(1);
var loaded = false;
var locked = true;
var userUnlocked = false;
var context = new (window.AudioContext || window.webkitAudioContext)();
web_audio_touch_unlock_1.default(context).then(function (unlocked) {
    locked = false;
    userUnlocked = unlocked;
    if (userUnlocked) {
        if (loaded) {
            setMessage('message', 'there');
            setMessage('status', 'playing');
        }
        else {
            setMessage('message', 'abit');
        }
    }
    else {
        setMessage('message', 'fine');
    }
}, function (reason) {
    // TODO print error
    console.log(reason);
});
// ERROR!
// [error message]
/*Seems like this approach can not be used with current ' +
'implementation of AudioContext. We\'re sorry about that, however you can open an issue here: ' +
'https://github.com/pavle-goloskokovic/web-audio-touch-unlock/issues and we\'ll try to sort it out.');*/
var request = new XMLHttpRequest();
request.open('GET', 'assets/audio/3667624464.mp3', true);
request.responseType = 'arraybuffer';
request.onload = function () {
    setMessage('status', 'decoding');
    context.decodeAudioData(request.response, function (buffer) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start();
        loaded = true;
        if (locked) {
            setMessage('status', 'waiting');
        }
        else {
            if (userUnlocked) {
                setMessage('message', 'there');
            }
            setMessage('status', 'playing');
        }
    }, function (e) {
        // TODO print error
        console.log("Error with decoding audio data" + e);
    });
};
request.send();
var positionFooter = function () {
    var pre = document.getElementsByTagName('pre')[0];
    var footer = document.getElementsByTagName('footer')[0];
    footer.style.bottom = Math.min(window.innerHeight - pre.offsetHeight, 0) + 'px';
};
var setMessage = function (id, key) {
    var messages = {
        tap: "Tap anywhere to unlock...",
        loading: "Loading audio...",
        there: "There you go!",
        playing: "Playing sweet, sweet music!",
        abit: "Just a bit more...",
        fine: "You're fine here,\ntry it on an iOS device.",
        decoding: "Decoding audio...",
        waiting: "Waiting for touch unlock..."
    };
    var element = document.getElementById(id);
    element && (element.textContent = messages[key]);
    positionFooter();
};
setMessage('message', 'tap');
setMessage('status', 'loading');
window.onblur = function () {
    if (!locked) {
        context.suspend();
    }
};
window.onfocus = function () {
    if (!locked) {
        context.resume();
    }
};
window.onload = window.onresize = function (e) {
    var pre = document.getElementsByTagName('pre')[0];
    var scale = 1;
    if (window.innerWidth <= 450) {
        var margin = 8;
        scale = window.innerWidth / (pre.offsetWidth + 2 * margin);
    }
    document.body.style.fontSize = scale + "em";
    positionFooter();
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function webAudioTouchUnlock(context) {
    return new Promise(function (resolve, reject) {
        if (!context || !(context instanceof (window.AudioContext || window.webkitAudioContext))) {
            reject('WebAudioTouchUnlock - You need to pass an instance of AudioContext to this method call!');
            return;
        }
        try {
            if (context.state === 'suspended') {
                var unlock_1 = function () {
                    document.body.removeEventListener('touchstart', unlock_1);
                    context.resume().then(function () {
                        resolve(true);
                    }, function (reason) {
                        reject(reason);
                    });
                };
                document.body.addEventListener('touchstart', unlock_1, false);
            }
            else {
                resolve(false);
            }
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.default = webAudioTouchUnlock;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjhlOWFiMTQ4OWJiOWZlNzQ3MmQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWItYXVkaW8tdG91Y2gtdW5sb2NrL2Rpc3QvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLHNEQUF5RDtBQUV6RCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDbkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztBQUV6QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQU8sTUFBTyxDQUFDLFlBQVksSUFBVSxNQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDO0FBRXJGLGdDQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQWlCO0lBRTVDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDZixZQUFZLEdBQUcsUUFBUSxDQUFDO0lBRXhCLEVBQUUsRUFBQyxZQUFZLENBQUMsQ0FDaEIsQ0FBQztRQUNHLEVBQUUsRUFBQyxNQUFNLENBQUMsQ0FDVixDQUFDO1lBQ0csVUFBVSxDQUFDLFNBQVMs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QyxDQUFDOzs7Ozs7OztBQzVJRjtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBIiwiZmlsZSI6IndlYi1hdWRpby10b3VjaC11bmxvY2stZXhhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGI4ZTlhYjE0ODliYjlmZTc0NzJkIiwiaW1wb3J0IHdlYkF1ZGlvVG91Y2hVbmxvY2sgZnJvbSAnd2ViLWF1ZGlvLXRvdWNoLXVubG9jayc7XHJcblxyXG5sZXQgbG9hZGVkID0gZmFsc2U7XHJcbmxldCBsb2NrZWQgPSB0cnVlO1xyXG5sZXQgdXNlclVubG9ja2VkID0gZmFsc2U7XHJcblxyXG5sZXQgY29udGV4dCA9IG5ldyAoKDxhbnk+d2luZG93KS5BdWRpb0NvbnRleHQgfHwgKDxhbnk+d2luZG93KS53ZWJraXRBdWRpb0NvbnRleHQpKCk7XHJcblxyXG53ZWJBdWRpb1RvdWNoVW5sb2NrKGNvbnRleHQpLnRoZW4oKHVubG9ja2VkOiBib29sZWFuKSA9PiB7XHJcblxyXG4gICAgICAgIGxvY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHVzZXJVbmxvY2tlZCA9IHVubG9ja2VkO1xyXG5cclxuICAgICAgICBpZih1c2VyVW5sb2NrZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihsb2FkZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNldE1lc3NhZ2UoJ21lc3NhZ2UnLCAndGhlcmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdzdGF0dXMnLCAncGxheWluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnbWVzc2FnZScsICdhYml0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0TWVzc2FnZSgnbWVzc2FnZScsICdmaW5lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIChyZWFzb246IGFueSkgPT4ge1xyXG4gICAgICAgIC8vIFRPRE8gcHJpbnQgZXJyb3JcclxuICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pO1xyXG4gICAgfVxyXG4pO1xyXG5cclxuLy8gRVJST1IhXHJcbi8vIFtlcnJvciBtZXNzYWdlXVxyXG4vKlNlZW1zIGxpa2UgdGhpcyBhcHByb2FjaCBjYW4gbm90IGJlIHVzZWQgd2l0aCBjdXJyZW50ICcgK1xyXG4naW1wbGVtZW50YXRpb24gb2YgQXVkaW9Db250ZXh0LiBXZVxcJ3JlIHNvcnJ5IGFib3V0IHRoYXQsIGhvd2V2ZXIgeW91IGNhbiBvcGVuIGFuIGlzc3VlIGhlcmU6ICcgK1xyXG4naHR0cHM6Ly9naXRodWIuY29tL3BhdmxlLWdvbG9za29rb3ZpYy93ZWItYXVkaW8tdG91Y2gtdW5sb2NrL2lzc3VlcyBhbmQgd2VcXCdsbCB0cnkgdG8gc29ydCBpdCBvdXQuJyk7Ki9cclxuXHJcbmxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbnJlcXVlc3Qub3BlbignR0VUJywgJ2Fzc2V0cy9hdWRpby8zNjY3NjI0NDY0Lm1wMycsIHRydWUpO1xyXG5yZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcbnJlcXVlc3Qub25sb2FkID0gKCkgPT5cclxue1xyXG4gICAgc2V0TWVzc2FnZSgnc3RhdHVzJywgJ2RlY29kaW5nJyk7XHJcblxyXG4gICAgY29udGV4dC5kZWNvZGVBdWRpb0RhdGEocmVxdWVzdC5yZXNwb25zZSwgKGJ1ZmZlcjogQXVkaW9CdWZmZXIpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzb3VyY2UgPSBjb250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xyXG4gICAgICAgICAgICBzb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xyXG4gICAgICAgICAgICBzb3VyY2UuY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgc291cmNlLnN0YXJ0KCk7XHJcblxyXG4gICAgICAgICAgICBsb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvY2tlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnc3RhdHVzJywgJ3dhaXRpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHVzZXJVbmxvY2tlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdtZXNzYWdlJywgJ3RoZXJlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnc3RhdHVzJywgJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKGU6IEVycm9yRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgLy8gVE9ETyBwcmludCBlcnJvclxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdpdGggZGVjb2RpbmcgYXVkaW8gZGF0YVwiICsgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufTtcclxucmVxdWVzdC5zZW5kKCk7XHJcblxyXG5sZXQgcG9zaXRpb25Gb290ZXIgPSAoKSA9PlxyXG57XHJcbiAgICBsZXQgcHJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3ByZScpWzBdO1xyXG4gICAgbGV0IGZvb3RlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb290ZXInKVswXTtcclxuXHJcbiAgICBmb290ZXIuc3R5bGUuYm90dG9tID0gTWF0aC5taW4od2luZG93LmlubmVySGVpZ2h0IC0gcHJlLm9mZnNldEhlaWdodCwgMCkgKyAncHgnO1xyXG59O1xyXG5cclxubGV0IHNldE1lc3NhZ2UgPSAoaWQ6IHN0cmluZywga2V5OiBzdHJpbmcpID0+XHJcbntcclxuICAgIGxldCBtZXNzYWdlczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICB0YXA6ICAgICAgYFRhcCBhbnl3aGVyZSB0byB1bmxvY2suLi5gLFxyXG4gICAgICAgIGxvYWRpbmc6ICBgTG9hZGluZyBhdWRpby4uLmAsXHJcbiAgICAgICAgdGhlcmU6ICAgIGBUaGVyZSB5b3UgZ28hYCxcclxuICAgICAgICBwbGF5aW5nOiAgYFBsYXlpbmcgc3dlZXQsIHN3ZWV0IG11c2ljIWAsXHJcbiAgICAgICAgYWJpdDogICAgIGBKdXN0IGEgYml0IG1vcmUuLi5gLFxyXG4gICAgICAgIGZpbmU6ICAgICBgWW91J3JlIGZpbmUgaGVyZSxcXG50cnkgaXQgb24gYW4gaU9TIGRldmljZS5gLFxyXG4gICAgICAgIGRlY29kaW5nOiBgRGVjb2RpbmcgYXVkaW8uLi5gLFxyXG4gICAgICAgIHdhaXRpbmc6ICBgV2FpdGluZyBmb3IgdG91Y2ggdW5sb2NrLi4uYFxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgIGVsZW1lbnQgJiYgKGVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlc1trZXldKTtcclxuXHJcbiAgICBwb3NpdGlvbkZvb3RlcigpO1xyXG59O1xyXG5cclxuc2V0TWVzc2FnZSgnbWVzc2FnZScsICd0YXAnKTtcclxuc2V0TWVzc2FnZSgnc3RhdHVzJywgJ2xvYWRpbmcnKTtcclxuXHJcbndpbmRvdy5vbmJsdXIgPSAoKSA9PlxyXG57XHJcbiAgICBpZighbG9ja2VkKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHQuc3VzcGVuZCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxud2luZG93Lm9uZm9jdXMgPSAoKSA9PlxyXG57XHJcbiAgICBpZighbG9ja2VkKSB7XHJcbiAgICAgICAgY29udGV4dC5yZXN1bWUoKTtcclxuICAgIH1cclxufTtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSB3aW5kb3cub25yZXNpemUgPSAoZTogRXZlbnQpID0+XHJcbntcclxuICAgIGxldCBwcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgncHJlJylbMF07XHJcbiAgICBsZXQgc2NhbGUgPSAxO1xyXG5cclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA0NTApXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG1hcmdpbiA9IDg7XHJcbiAgICAgICAgc2NhbGUgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIChwcmUub2Zmc2V0V2lkdGggKyAyKm1hcmdpbik7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250U2l6ZSA9IGAke3NjYWxlfWVtYDtcclxuXHJcbiAgICBwb3NpdGlvbkZvb3RlcigpO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXgudHMiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5mdW5jdGlvbiB3ZWJBdWRpb1RvdWNoVW5sb2NrKGNvbnRleHQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgaWYgKCFjb250ZXh0IHx8ICEoY29udGV4dCBpbnN0YW5jZW9mICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKSkge1xyXG4gICAgICAgICAgICByZWplY3QoJ1dlYkF1ZGlvVG91Y2hVbmxvY2sgLSBZb3UgbmVlZCB0byBwYXNzIGFuIGluc3RhbmNlIG9mIEF1ZGlvQ29udGV4dCB0byB0aGlzIG1ldGhvZCBjYWxsIScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LnN0YXRlID09PSAnc3VzcGVuZGVkJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHVubG9ja18xID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHVubG9ja18xKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnJlc3VtZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlYXNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdW5sb2NrXzEsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSB3ZWJBdWRpb1RvdWNoVW5sb2NrO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZWItYXVkaW8tdG91Y2gtdW5sb2NrL2Rpc3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==