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
            reject('WebAudioTouchUnlock: You need to pass an instance of AudioContext to this method call');
            return;
        }
        try {
            if (context.state === 'suspended') {
                var unlock_1 = function () {
                    context.resume().then(function () {
                        document.body.removeEventListener('touchstart', unlock_1);
                        document.body.removeEventListener('touchend', unlock_1);
                        resolve(true);
                    }, function (reason) {
                        reject(reason);
                    });
                };
                document.body.addEventListener('touchstart', unlock_1, false);
                document.body.addEventListener('touchend', unlock_1, false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDc4ZmNiYjljMTNiODMyNWIwZjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWItYXVkaW8tdG91Y2gtdW5sb2NrL2Rpc3QvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLHNEQUF5RDtBQUV6RCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDbkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztBQUN6QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFFcEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFPLE1BQU8sQ0FBQyxZQUFZLElBQVUsTUFBTyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztBQUVyRixnQ0FBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxRQUFpQjtJQUU1QyxFQUFFLEVBQUMsT0FBTyxDQUFDLENBQ1gsQ0FBQztRQUNHLE1BQU0sQ0FBQztJQUNYLENBQUM7SUFFRCxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ2YsWUFBWSxHQUFHLFFBQVEsQ0FBQztJ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QTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBIiwiZmlsZSI6IndlYi1hdWRpby10b3VjaC11bmxvY2stZXhhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDA3OGZjYmI5YzEzYjgzMjViMGY2IiwiaW1wb3J0IHdlYkF1ZGlvVG91Y2hVbmxvY2sgZnJvbSAnd2ViLWF1ZGlvLXRvdWNoLXVubG9jayc7XHJcblxyXG5sZXQgbG9hZGVkID0gZmFsc2U7XHJcbmxldCBsb2NrZWQgPSB0cnVlO1xyXG5sZXQgdXNlclVubG9ja2VkID0gZmFsc2U7XHJcbmxldCBlcnJvcmVkID0gZmFsc2U7XHJcblxyXG5sZXQgY29udGV4dCA9IG5ldyAoKDxhbnk+d2luZG93KS5BdWRpb0NvbnRleHQgfHwgKDxhbnk+d2luZG93KS53ZWJraXRBdWRpb0NvbnRleHQpKCk7XHJcblxyXG53ZWJBdWRpb1RvdWNoVW5sb2NrKGNvbnRleHQpLnRoZW4oKHVubG9ja2VkOiBib29sZWFuKSA9PiB7XHJcblxyXG4gICAgICAgIGlmKGVycm9yZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2NrZWQgPSBmYWxzZTtcclxuICAgICAgICB1c2VyVW5sb2NrZWQgPSB1bmxvY2tlZDtcclxuXHJcbiAgICAgICAgaWYodXNlclVubG9ja2VkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYobG9hZGVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdtZXNzYWdlJywgJ3RoZXJlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnc3RhdHVzJywgJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNldE1lc3NhZ2UoJ21lc3NhZ2UnLCAnYWJpdCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNldE1lc3NhZ2UoJ21lc3NhZ2UnLCAnZmluZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAocmVhc29uOiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgZXJyb3JlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIHByaW50RXJyb3IocmVhc29uKTtcclxuICAgIH1cclxuKTtcclxuXHJcbmxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbnJlcXVlc3Qub3BlbignR0VUJywgJ2Fzc2V0cy9hdWRpby8zNjY3NjI0NDY0Lm1wMycsIHRydWUpO1xyXG5yZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcbnJlcXVlc3Qub25sb2FkID0gKCkgPT5cclxue1xyXG4gICAgaWYoZXJyb3JlZClcclxuICAgIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TWVzc2FnZSgnc3RhdHVzJywgJ2RlY29kaW5nJyk7XHJcblxyXG4gICAgY29udGV4dC5kZWNvZGVBdWRpb0RhdGEocmVxdWVzdC5yZXNwb25zZSwgKGJ1ZmZlcjogQXVkaW9CdWZmZXIpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmKGVycm9yZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IGNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICAgICAgICAgIHNvdXJjZS5idWZmZXIgPSBidWZmZXI7XHJcbiAgICAgICAgICAgIHNvdXJjZS5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgICAgICAgICBzb3VyY2Uuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9ja2VkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdzdGF0dXMnLCAnd2FpdGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodXNlclVubG9ja2VkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2UoJ21lc3NhZ2UnLCAndGhlcmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdzdGF0dXMnLCAncGxheWluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZTogRXJyb3JFdmVudCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgZXJyb3JlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBwcmludEVycm9yKGUpO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn07XHJcbnJlcXVlc3Quc2VuZCgpO1xyXG5cclxuXHJcbi8vIFVJIHJlbGV2YW50IGxvZ2ljXHJcblxyXG5sZXQgcG9zaXRpb25Gb290ZXIgPSAoKSA9PlxyXG57XHJcbiAgICBsZXQgcHJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3ByZScpWzBdO1xyXG4gICAgbGV0IGZvb3RlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb290ZXInKVswXTtcclxuXHJcbiAgICBmb290ZXIuc3R5bGUuYm90dG9tID0gTWF0aC5taW4od2luZG93LmlubmVySGVpZ2h0IC0gcHJlLm9mZnNldEhlaWdodCwgMCkgKyAncHgnO1xyXG59O1xyXG5cclxubGV0IHNldE1lc3NhZ2UgPSAoaWQ6IHN0cmluZywga2V5OiBzdHJpbmcpID0+XHJcbntcclxuICAgIGxldCBtZXNzYWdlczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICB0YXA6ICAgICAgYFRhcCBhbnl3aGVyZSB0byB1bmxvY2suLi5gLFxyXG4gICAgICAgIGxvYWRpbmc6ICBgTG9hZGluZyBhdWRpby4uLmAsXHJcbiAgICAgICAgdGhlcmU6ICAgIGBUaGVyZSB5b3UgZ28hYCxcclxuICAgICAgICBwbGF5aW5nOiAgYFBsYXlpbmcgc3dlZXQsIHN3ZWV0IG11c2ljIWAsXHJcbiAgICAgICAgYWJpdDogICAgIGBKdXN0IGEgYml0IG1vcmUuLi5gLFxyXG4gICAgICAgIGZpbmU6ICAgICBgWW91J3JlIGZpbmUgaGVyZSxcXG50cnkgaXQgb24gYW4gaU9TIGRldmljZS5gLFxyXG4gICAgICAgIGRlY29kaW5nOiBgRGVjb2RpbmcgYXVkaW8uLi5gLFxyXG4gICAgICAgIHdhaXRpbmc6ICBgV2FpdGluZyBmb3IgdG91Y2ggdW5sb2NrLi4uYFxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZWxlbWVudCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZXNba2V5XTtcclxuXHJcbiAgICBwb3NpdGlvbkZvb3RlcigpO1xyXG59O1xyXG5cclxuc2V0TWVzc2FnZSgnbWVzc2FnZScsICd0YXAnKTtcclxuc2V0TWVzc2FnZSgnc3RhdHVzJywgJ2xvYWRpbmcnKTtcclxuXHJcbmxldCByZXNpemVFcnJvcnMgPSAoKSA9PlxyXG57XHJcbiAgICBsZXQgcm93ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3cnKTtcclxuICAgIGxldCBlcnJvcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdlcnJvci1tZXNzYWdlJyk7XHJcblxyXG4gICAgZm9yIChsZXQgaT0wOyBpPGVycm9ycy5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICAoPEhUTUxFbGVtZW50PmVycm9yc1tpXSkuc3R5bGUud2lkdGggPSAocm93Lm9mZnNldFdpZHRoICogMC43KSArICdweCc7XHJcbiAgICB9XHJcbn07XHJcblxyXG5sZXQgcHJpbnRFcnJvciA9IChlcnJvcjogYW55KSA9PlxyXG57XHJcbiAgICBsZXQgbWVzc2FnZSA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZScpO1xyXG4gICAgbWVzc2FnZS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJlcnJvclwiPkVSUk9SITwvc3Bhbj48YnI+PGJyPjxzcGFuIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPiR7ZXJyb3J9PC9zcGFuPmA7XHJcblxyXG4gICAgbGV0IHN0YXR1cyA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdHVzJyk7XHJcbiAgICBzdGF0dXMuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPlNlZW1zIGxpa2UgdGhpcyBhcHByb2FjaCBjYW4ndCBiZSB1c2VkIHdpdGggY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiBXZWIgQXVkaW8gQVBJLiBXZSdyZSBzb3JyeSBhYm91dCB0aGF0LCBob3dldmVyIHlvdSBjYW4gb3BlbiBhbiBpc3N1ZSA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3BhdmxlLWdvbG9za29rb3ZpYy93ZWItYXVkaW8tdG91Y2gtdW5sb2NrL2lzc3Vlc1wiPmhlcmU8L2E+IGFuZCB3ZSdsbCB0cnkgdG8gc29ydCBpdCBvdXQuPC9zcGFuPmA7XHJcblxyXG4gICAgcmVzaXplRXJyb3JzKCk7XHJcblxyXG4gICAgcG9zaXRpb25Gb290ZXIoKTtcclxufTtcclxuXHJcbndpbmRvdy5vbmJsdXIgPSAoKSA9PlxyXG57XHJcbiAgICBpZighbG9ja2VkKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnRleHQuc3VzcGVuZCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxud2luZG93Lm9uZm9jdXMgPSAoKSA9PlxyXG57XHJcbiAgICBpZighbG9ja2VkKSB7XHJcbiAgICAgICAgY29udGV4dC5yZXN1bWUoKTtcclxuICAgIH1cclxufTtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSB3aW5kb3cub25yZXNpemUgPSAoZTogRXZlbnQpID0+XHJcbntcclxuICAgIGxldCByb3cgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdycpO1xyXG4gICAgbGV0IHNjYWxlID0gMTtcclxuXHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gNDUwKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBtYXJnaW4gPSA4O1xyXG4gICAgICAgIHNjYWxlID0gd2luZG93LmlubmVyV2lkdGggLyAocm93Lm9mZnNldFdpZHRoICsgMiptYXJnaW4pO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSBgJHtzY2FsZX1lbWA7XHJcblxyXG4gICAgcmVzaXplRXJyb3JzKCk7XHJcblxyXG4gICAgcG9zaXRpb25Gb290ZXIoKTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZnVuY3Rpb24gd2ViQXVkaW9Ub3VjaFVubG9jayhjb250ZXh0KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGlmICghY29udGV4dCB8fCAhKGNvbnRleHQgaW5zdGFuY2VvZiAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSkpIHtcclxuICAgICAgICAgICAgcmVqZWN0KCdXZWJBdWRpb1RvdWNoVW5sb2NrOiBZb3UgbmVlZCB0byBwYXNzIGFuIGluc3RhbmNlIG9mIEF1ZGlvQ29udGV4dCB0byB0aGlzIG1ldGhvZCBjYWxsJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuc3RhdGUgPT09ICdzdXNwZW5kZWQnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdW5sb2NrXzEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5yZXN1bWUoKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdW5sb2NrXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdW5sb2NrXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlYXNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdW5sb2NrXzEsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB1bmxvY2tfMSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IHdlYkF1ZGlvVG91Y2hVbmxvY2s7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlYi1hdWRpby10b3VjaC11bmxvY2svZGlzdC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9