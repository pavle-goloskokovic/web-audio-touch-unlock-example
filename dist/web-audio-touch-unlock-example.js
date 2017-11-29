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
var errored = false;
var context = new (window.AudioContext || window.webkitAudioContext)();
web_audio_touch_unlock_1.default(context).then(function (unlocked) {
    if (errored) {
        return;
    }
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
    errored = true;
    printError(reason);
});
var request = new XMLHttpRequest();
request.open('GET', 'assets/audio/3667624464.mp3', true);
request.responseType = 'arraybuffer';
request.onload = function () {
    if (errored) {
        return;
    }
    setMessage('status', 'decoding');
    context.decodeAudioData(request.response, function (buffer) {
        if (errored) {
            return;
        }
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
        errored = true;
        printError(e);
    });
};
request.send();
// UI relevant logic
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
    element.textContent = messages[key];
    positionFooter();
};
setMessage('message', 'tap');
setMessage('status', 'loading');
var resizeErrors = function () {
    var row = document.getElementById('row');
    var errors = document.getElementsByClassName('error-message');
    for (var i = 0; i < errors.length; i++) {
        errors[i].style.width = (row.offsetWidth * 0.7) + 'px';
    }
};
var printError = function (error) {
    var message = document.getElementById('message');
    message.innerHTML = "<span class=\"error\">ERROR!</span><br><br><span class=\"error-message\">" + error + "</span>";
    var status = document.getElementById('status');
    status.innerHTML = "<span class=\"error-message\">Seems like this approach can't be used with current implementation of Web Audio API. We're sorry about that, however you can open an issue <a href=\"https://github.com/pavle-goloskokovic/web-audio-touch-unlock/issues\">here</a> and we'll try to sort it out.</span>";
    resizeErrors();
    positionFooter();
};
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
    var row = document.getElementById('row');
    var scale = 1;
    if (window.innerWidth <= 450) {
        var margin = 8;
        scale = window.innerWidth / (row.offsetWidth + 2 * margin);
    }
    document.body.style.fontSize = scale + "em";
    resizeErrors();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGYyZDlmOGQzZWQ4MTFlZmRlZmMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWItYXVkaW8tdG91Y2gtdW5sb2NrL2Rpc3QvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLHNEQUF5RDtBQUV6RCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDbkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztBQUN6QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFFcEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFPLE1BQU8sQ0FBQyxZQUFZLElBQVUsTUFBTyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztBQUVyRixnQ0FBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFpQjtJQUU1QyxFQUFFLEVBQUMsT0FBTyxDQUFDLENBQ1gsQ0FBQztRQUNHLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ2YsWUFBWSxHQUFHLFFBQVEsQ0FBQztJ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QTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EiLCJmaWxlIjoid2ViLWF1ZGlvLXRvdWNoLXVubG9jay1leGFtcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMGYyZDlmOGQzZWQ4MTFlZmRlZmMiLCJpbXBvcnQgd2ViQXVkaW9Ub3VjaFVubG9jayBmcm9tICd3ZWItYXVkaW8tdG91Y2gtdW5sb2NrJztcclxuXHJcbmxldCBsb2FkZWQgPSBmYWxzZTtcclxubGV0IGxvY2tlZCA9IHRydWU7XHJcbmxldCB1c2VyVW5sb2NrZWQgPSBmYWxzZTtcclxubGV0IGVycm9yZWQgPSBmYWxzZTtcclxuXHJcbmxldCBjb250ZXh0ID0gbmV3ICgoPGFueT53aW5kb3cpLkF1ZGlvQ29udGV4dCB8fCAoPGFueT53aW5kb3cpLndlYmtpdEF1ZGlvQ29udGV4dCkoKTtcclxuXHJcbndlYkF1ZGlvVG91Y2hVbmxvY2soY29udGV4dCkudGhlbigodW5sb2NrZWQ6IGJvb2xlYW4pID0+IHtcclxuXHJcbiAgICAgICAgaWYoZXJyb3JlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHVzZXJVbmxvY2tlZCA9IHVubG9ja2VkO1xyXG5cclxuICAgICAgICBpZih1c2VyVW5sb2NrZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihsb2FkZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNldE1lc3NhZ2UoJ21lc3NhZ2UnLCAndGhlcmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdzdGF0dXMnLCAncGxheWluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnbWVzc2FnZScsICdhYml0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc2V0TWVzc2FnZSgnbWVzc2FnZScsICdmaW5lJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIChyZWFzb246IGFueSkgPT4ge1xyXG5cclxuICAgICAgICBlcnJvcmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgcHJpbnRFcnJvcihyZWFzb24pO1xyXG4gICAgfVxyXG4pO1xyXG5cclxubGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxucmVxdWVzdC5vcGVuKCdHRVQnLCAnYXNzZXRzL2F1ZGlvLzM2Njc2MjQ0NjQubXAzJywgdHJ1ZSk7XHJcbnJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcclxucmVxdWVzdC5vbmxvYWQgPSAoKSA9PlxyXG57XHJcbiAgICBpZihlcnJvcmVkKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRNZXNzYWdlKCdzdGF0dXMnLCAnZGVjb2RpbmcnKTtcclxuXHJcbiAgICBjb250ZXh0LmRlY29kZUF1ZGlvRGF0YShyZXF1ZXN0LnJlc3BvbnNlLCAoYnVmZmVyOiBBdWRpb0J1ZmZlcikgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYoZXJyb3JlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgc291cmNlID0gY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgICAgICAgICAgc291cmNlLmJ1ZmZlciA9IGJ1ZmZlcjtcclxuICAgICAgICAgICAgc291cmNlLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zdGFydCgpO1xyXG5cclxuICAgICAgICAgICAgbG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsb2NrZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNldE1lc3NhZ2UoJ3N0YXR1cycsICd3YWl0aW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZih1c2VyVW5sb2NrZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnbWVzc2FnZScsICd0aGVyZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNldE1lc3NhZ2UoJ3N0YXR1cycsICdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIChlOiBFcnJvckV2ZW50KSA9PiB7XHJcblxyXG4gICAgICAgICAgICBlcnJvcmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHByaW50RXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxufTtcclxucmVxdWVzdC5zZW5kKCk7XHJcblxyXG5cclxuLy8gVUkgcmVsZXZhbnQgbG9naWNcclxuXHJcbmxldCBwb3NpdGlvbkZvb3RlciA9ICgpID0+XHJcbntcclxuICAgIGxldCBwcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgncHJlJylbMF07XHJcbiAgICBsZXQgZm9vdGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Zvb3RlcicpWzBdO1xyXG5cclxuICAgIGZvb3Rlci5zdHlsZS5ib3R0b20gPSBNYXRoLm1pbih3aW5kb3cuaW5uZXJIZWlnaHQgLSBwcmUub2Zmc2V0SGVpZ2h0LCAwKSArICdweCc7XHJcbn07XHJcblxyXG5sZXQgc2V0TWVzc2FnZSA9IChpZDogc3RyaW5nLCBrZXk6IHN0cmluZykgPT5cclxue1xyXG4gICAgbGV0IG1lc3NhZ2VzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIHRhcDogICAgICBgVGFwIGFueXdoZXJlIHRvIHVubG9jay4uLmAsXHJcbiAgICAgICAgbG9hZGluZzogIGBMb2FkaW5nIGF1ZGlvLi4uYCxcclxuICAgICAgICB0aGVyZTogICAgYFRoZXJlIHlvdSBnbyFgLFxyXG4gICAgICAgIHBsYXlpbmc6ICBgUGxheWluZyBzd2VldCwgc3dlZXQgbXVzaWMhYCxcclxuICAgICAgICBhYml0OiAgICAgYEp1c3QgYSBiaXQgbW9yZS4uLmAsXHJcbiAgICAgICAgZmluZTogICAgIGBZb3UncmUgZmluZSBoZXJlLFxcbnRyeSBpdCBvbiBhbiBpT1MgZGV2aWNlLmAsXHJcbiAgICAgICAgZGVjb2Rpbmc6IGBEZWNvZGluZyBhdWRpby4uLmAsXHJcbiAgICAgICAgd2FpdGluZzogIGBXYWl0aW5nIGZvciB0b3VjaCB1bmxvY2suLi5gXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBlbGVtZW50ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlc1trZXldO1xyXG5cclxuICAgIHBvc2l0aW9uRm9vdGVyKCk7XHJcbn07XHJcblxyXG5zZXRNZXNzYWdlKCdtZXNzYWdlJywgJ3RhcCcpO1xyXG5zZXRNZXNzYWdlKCdzdGF0dXMnLCAnbG9hZGluZycpO1xyXG5cclxubGV0IHJlc2l6ZUVycm9ycyA9ICgpID0+XHJcbntcclxuICAgIGxldCByb3cgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdycpO1xyXG4gICAgbGV0IGVycm9ycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Vycm9yLW1lc3NhZ2UnKTtcclxuXHJcbiAgICBmb3IgKGxldCBpPTA7IGk8ZXJyb3JzLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgICg8SFRNTEVsZW1lbnQ+ZXJyb3JzW2ldKS5zdHlsZS53aWR0aCA9IChyb3cub2Zmc2V0V2lkdGggKiAwLjcpICsgJ3B4JztcclxuICAgIH1cclxufTtcclxuXHJcbmxldCBwcmludEVycm9yID0gKGVycm9yOiBhbnkpID0+XHJcbntcclxuICAgIGxldCBtZXNzYWdlID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlJyk7XHJcbiAgICBtZXNzYWdlLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImVycm9yXCI+RVJST1IhPC9zcGFuPjxicj48YnI+PHNwYW4gY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+JHtlcnJvcn08L3NwYW4+YDtcclxuXHJcbiAgICBsZXQgc3RhdHVzID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGF0dXMnKTtcclxuICAgIHN0YXR1cy5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+U2VlbXMgbGlrZSB0aGlzIGFwcHJvYWNoIGNhbid0IGJlIHVzZWQgd2l0aCBjdXJyZW50IGltcGxlbWVudGF0aW9uIG9mIFdlYiBBdWRpbyBBUEkuIFdlJ3JlIHNvcnJ5IGFib3V0IHRoYXQsIGhvd2V2ZXIgeW91IGNhbiBvcGVuIGFuIGlzc3VlIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vcGF2bGUtZ29sb3Nrb2tvdmljL3dlYi1hdWRpby10b3VjaC11bmxvY2svaXNzdWVzXCI+aGVyZTwvYT4gYW5kIHdlJ2xsIHRyeSB0byBzb3J0IGl0IG91dC48L3NwYW4+YDtcclxuXHJcbiAgICByZXNpemVFcnJvcnMoKTtcclxuXHJcbiAgICBwb3NpdGlvbkZvb3RlcigpO1xyXG59O1xyXG5cclxud2luZG93Lm9uYmx1ciA9ICgpID0+XHJcbntcclxuICAgIGlmKCFsb2NrZWQpXHJcbiAgICB7XHJcbiAgICAgICAgY29udGV4dC5zdXNwZW5kKCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG53aW5kb3cub25mb2N1cyA9ICgpID0+XHJcbntcclxuICAgIGlmKCFsb2NrZWQpIHtcclxuICAgICAgICBjb250ZXh0LnJlc3VtZSgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxud2luZG93Lm9ubG9hZCA9IHdpbmRvdy5vbnJlc2l6ZSA9IChlOiBFdmVudCkgPT5cclxue1xyXG4gICAgbGV0IHJvdyA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm93Jyk7XHJcbiAgICBsZXQgc2NhbGUgPSAxO1xyXG5cclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA0NTApXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG1hcmdpbiA9IDg7XHJcbiAgICAgICAgc2NhbGUgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIChyb3cub2Zmc2V0V2lkdGggKyAyKm1hcmdpbik7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250U2l6ZSA9IGAke3NjYWxlfWVtYDtcclxuXHJcbiAgICByZXNpemVFcnJvcnMoKTtcclxuXHJcbiAgICBwb3NpdGlvbkZvb3RlcigpO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXgudHMiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5mdW5jdGlvbiB3ZWJBdWRpb1RvdWNoVW5sb2NrKGNvbnRleHQpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgaWYgKCFjb250ZXh0IHx8ICEoY29udGV4dCBpbnN0YW5jZW9mICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKSkge1xyXG4gICAgICAgICAgICByZWplY3QoJ1dlYkF1ZGlvVG91Y2hVbmxvY2sgLSBZb3UgbmVlZCB0byBwYXNzIGFuIGluc3RhbmNlIG9mIEF1ZGlvQ29udGV4dCB0byB0aGlzIG1ldGhvZCBjYWxsIScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LnN0YXRlID09PSAnc3VzcGVuZGVkJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHVubG9ja18xID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHVubG9ja18xKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnJlc3VtZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlYXNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdW5sb2NrXzEsIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJlamVjdChlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSB3ZWJBdWRpb1RvdWNoVW5sb2NrO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZWItYXVkaW8tdG91Y2gtdW5sb2NrL2Rpc3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==