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
var ui_1 = __webpack_require__(2);
var AudioContext = window.AudioContext || window.webkitAudioContext;
if (!AudioContext) {
    ui_1.printError('Seems like Web Audio API is not supported here :(');
}
else {
    var loaded_1 = false;
    var locked_1 = true;
    var userUnlocked_1 = false;
    var errored_1 = false;
    var context_1 = new AudioContext();
    web_audio_touch_unlock_1.default(context_1).then(function (unlocked) {
        if (errored_1) {
            return;
        }
        locked_1 = false;
        userUnlocked_1 = unlocked;
        if (userUnlocked_1) {
            if (loaded_1) {
                ui_1.setMessage('message', 'there');
                ui_1.setMessage('status', 'playing');
            }
            else {
                ui_1.setMessage('message', 'abit');
            }
        }
        else {
            ui_1.setMessage('message', 'fine');
        }
    }, function (reason) {
        errored_1 = true;
        ui_1.printError(reason);
    });
    var request_1 = new XMLHttpRequest();
    request_1.open('GET', 'assets/audio/3667624464.mp3', true);
    request_1.responseType = 'arraybuffer';
    request_1.onload = function () {
        if (errored_1) {
            return;
        }
        ui_1.setMessage('status', 'decoding');
        context_1.decodeAudioData(request_1.response, function (buffer) {
            if (errored_1) {
                return;
            }
            var source = context_1.createBufferSource();
            source.buffer = buffer;
            source.connect(context_1.destination);
            source.start();
            loaded_1 = true;
            if (locked_1) {
                ui_1.setMessage('status', 'waiting');
            }
            else {
                if (userUnlocked_1) {
                    ui_1.setMessage('message', 'there');
                }
                ui_1.setMessage('status', 'playing');
            }
        }, function (e) {
            errored_1 = true;
            ui_1.printError(e);
        });
    };
    request_1.send();
    window.onblur = function () {
        if (!locked_1) {
            context_1.suspend();
        }
    };
    window.onfocus = function () {
        if (!locked_1) {
            context_1.resume();
        }
    };
}


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
        if (context.state === 'suspended' && 'ontouchstart' in window) {
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
    });
}
exports.default = webAudioTouchUnlock;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var positionFooter = function () {
    var pre = document.getElementsByTagName('pre')[0];
    var footer = document.getElementsByTagName('footer')[0];
    footer.style.bottom = Math.min(window.innerHeight - pre.offsetHeight, 0) + 'px';
};
exports.hideFooter = function () {
    var footer = document.getElementsByTagName('footer')[0];
    footer.style.display = 'none';
};
exports.setMessage = function (id, key) {
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
exports.setMessage('message', 'tap');
exports.setMessage('status', 'loading');
var resizeErrors = function () {
    var row = document.getElementById('row');
    var errors = document.getElementsByClassName('error-message');
    for (var i = 0; i < errors.length; i++) {
        errors[i].style.width = (row.offsetWidth * 0.7) + 'px';
    }
};
exports.printError = function (error) {
    var message = document.getElementById('message');
    message.innerHTML = "<span class=\"error\">ERROR!</span><br><br><span class=\"error-message\">" + error + "</span>";
    var status = document.getElementById('status');
    status.innerHTML = "<span class=\"error-message\">Seems like this approach can't be used with current implementation of Web Audio API. We're sorry about that, however you can open an issue <a href=\"https://github.com/pavle-goloskokovic/web-audio-touch-unlock/issues\">here</a> and we'll try to sort it out.</span>";
    resizeErrors();
    exports.hideFooter();
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


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMWQ5ZTljOWFmOGFhNTBiYmM4NDAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWItYXVkaW8tdG91Y2gtdW5sb2NrL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSxzREFBeUQ7QUFDekQsa0NBQThDO0FBRTlDLElBQUksWUFBWSxHQUFTLE1BQU8sQ0FBQyxZQUFZLElBQVUsTUFBTyxDQUFDLGtCQUFrQixDQUFDO0FBRWxGLEVBQUUsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUNqQixDQUFDO0lBQ0csZUFBVSxDQUFDLG1EQUFtRCxDQUFDLENBQUM7QUFDcEUsQ0FBQztBQUNELElBQUksQ0FDSixDQUFDO0lBQ0csSUFBSSxRQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ25CLElBQUksUUFBTSxHQUFHLElBQUksQ0FBQztJQUNsQixJQUFJLGNBQVksR0FBRyxLQUFLLENBQUM7SUFDekIsSUFBSSxTQUFPLEdBQUcsS0FBSyxDQUFDO0lBRXBCLElBQUksU0FBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFF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Q0FBQyxDQUFDO0FBRUYsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLFVBQUMsQ0FBUTtJQUV2QyxJQUFJLEdBQUcsR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0RCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7SUFFZCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxDQUM3QixDQUFDO1FBQ0csSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFNLEtBQUssT0FBSSxDQUFDO0lBRTVDLFlBQVksRUFBRSxDQUFDO0lBRWYsY0FBYyxFQUFFLENBQUM7QUFDckIsQ0FBQyxDQUFDIiwiZmlsZSI6IndlYi1hdWRpby10b3VjaC11bmxvY2stZXhhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDFkOWU5YzlhZjhhYTUwYmJjODQwIiwiaW1wb3J0IHdlYkF1ZGlvVG91Y2hVbmxvY2sgZnJvbSAnd2ViLWF1ZGlvLXRvdWNoLXVubG9jayc7XHJcbmltcG9ydCB7IHByaW50RXJyb3IsIHNldE1lc3NhZ2UgfSBmcm9tICcuL3VpJztcclxuXHJcbmxldCBBdWRpb0NvbnRleHQgPSAoPGFueT53aW5kb3cpLkF1ZGlvQ29udGV4dCB8fCAoPGFueT53aW5kb3cpLndlYmtpdEF1ZGlvQ29udGV4dDtcclxuXHJcbmlmKCFBdWRpb0NvbnRleHQpXHJcbntcclxuICAgIHByaW50RXJyb3IoJ1NlZW1zIGxpa2UgV2ViIEF1ZGlvIEFQSSBpcyBub3Qgc3VwcG9ydGVkIGhlcmUgOignKTtcclxufVxyXG5lbHNlXHJcbntcclxuICAgIGxldCBsb2FkZWQgPSBmYWxzZTtcclxuICAgIGxldCBsb2NrZWQgPSB0cnVlO1xyXG4gICAgbGV0IHVzZXJVbmxvY2tlZCA9IGZhbHNlO1xyXG4gICAgbGV0IGVycm9yZWQgPSBmYWxzZTtcclxuXHJcbiAgICBsZXQgY29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcclxuXHJcbiAgICB3ZWJBdWRpb1RvdWNoVW5sb2NrKGNvbnRleHQpLnRoZW4oKHVubG9ja2VkOiBib29sZWFuKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyb3JlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsb2NrZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdXNlclVubG9ja2VkID0gdW5sb2NrZWQ7XHJcblxyXG4gICAgICAgICAgICBpZiAodXNlclVubG9ja2VkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9hZGVkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2UoJ21lc3NhZ2UnLCAndGhlcmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnc3RhdHVzJywgJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdtZXNzYWdlJywgJ2FiaXQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHNldE1lc3NhZ2UoJ21lc3NhZ2UnLCAnZmluZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAocmVhc29uOiBhbnkpID0+XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlcnJvcmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIHByaW50RXJyb3IocmVhc29uKTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG5cclxuICAgIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsICdhc3NldHMvYXVkaW8vMzY2NzYyNDQ2NC5tcDMnLCB0cnVlKTtcclxuICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcclxuICAgIHJlcXVlc3Qub25sb2FkID0gKCkgPT5cclxuICAgIHtcclxuICAgICAgICBpZiAoZXJyb3JlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldE1lc3NhZ2UoJ3N0YXR1cycsICdkZWNvZGluZycpO1xyXG5cclxuICAgICAgICBjb250ZXh0LmRlY29kZUF1ZGlvRGF0YShyZXF1ZXN0LnJlc3BvbnNlLCAoYnVmZmVyOiBBdWRpb0J1ZmZlcikgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChlcnJvcmVkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc291cmNlID0gY29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZS5idWZmZXIgPSBidWZmZXI7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UuY29ubmVjdChjb250ZXh0LmRlc3RpbmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIHNvdXJjZS5zdGFydCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGxvY2tlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdzdGF0dXMnLCAnd2FpdGluZycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyVW5sb2NrZWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdtZXNzYWdlJywgJ3RoZXJlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdzdGF0dXMnLCAncGxheWluZycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZTogRXJyb3JFdmVudCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGVycm9yZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIHByaW50RXJyb3IoZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgfTtcclxuICAgIHJlcXVlc3Quc2VuZCgpO1xyXG5cclxuICAgIHdpbmRvdy5vbmJsdXIgPSAoKSA9PlxyXG4gICAge1xyXG4gICAgICAgIGlmICghbG9ja2VkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGV4dC5zdXNwZW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cub25mb2N1cyA9ICgpID0+XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKCFsb2NrZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb250ZXh0LnJlc3VtZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LnRzIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZnVuY3Rpb24gd2ViQXVkaW9Ub3VjaFVubG9jayhjb250ZXh0KSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGlmICghY29udGV4dCB8fCAhKGNvbnRleHQgaW5zdGFuY2VvZiAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSkpIHtcclxuICAgICAgICAgICAgcmVqZWN0KCdXZWJBdWRpb1RvdWNoVW5sb2NrOiBZb3UgbmVlZCB0byBwYXNzIGFuIGluc3RhbmNlIG9mIEF1ZGlvQ29udGV4dCB0byB0aGlzIG1ldGhvZCBjYWxsJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNvbnRleHQuc3RhdGUgPT09ICdzdXNwZW5kZWQnICYmICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykge1xyXG4gICAgICAgICAgICB2YXIgdW5sb2NrXzEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlc3VtZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHVubG9ja18xKTtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdW5sb2NrXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVhc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlYXNvbik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdW5sb2NrXzEsIGZhbHNlKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHVubG9ja18xLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5leHBvcnRzLmRlZmF1bHQgPSB3ZWJBdWRpb1RvdWNoVW5sb2NrO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZWItYXVkaW8tdG91Y2gtdW5sb2NrL2Rpc3QvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibGV0IHBvc2l0aW9uRm9vdGVyID0gKCkgPT5cclxue1xyXG4gICAgbGV0IHByZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwcmUnKVswXTtcclxuICAgIGxldCBmb290ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZm9vdGVyJylbMF07XHJcblxyXG4gICAgZm9vdGVyLnN0eWxlLmJvdHRvbSA9IE1hdGgubWluKHdpbmRvdy5pbm5lckhlaWdodCAtIHByZS5vZmZzZXRIZWlnaHQsIDApICsgJ3B4JztcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgaGlkZUZvb3RlciA9ICgpID0+XHJcbntcclxuICAgIGxldCBmb290ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZm9vdGVyJylbMF07XHJcbiAgICBmb290ZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgc2V0TWVzc2FnZSA9IChpZDogc3RyaW5nLCBrZXk6IHN0cmluZykgPT5cclxue1xyXG4gICAgbGV0IG1lc3NhZ2VzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xyXG4gICAgICAgIHRhcDogICAgICBgVGFwIGFueXdoZXJlIHRvIHVubG9jay4uLmAsXHJcbiAgICAgICAgbG9hZGluZzogIGBMb2FkaW5nIGF1ZGlvLi4uYCxcclxuICAgICAgICB0aGVyZTogICAgYFRoZXJlIHlvdSBnbyFgLFxyXG4gICAgICAgIHBsYXlpbmc6ICBgUGxheWluZyBzd2VldCwgc3dlZXQgbXVzaWMhYCxcclxuICAgICAgICBhYml0OiAgICAgYEp1c3QgYSBiaXQgbW9yZS4uLmAsXHJcbiAgICAgICAgZmluZTogICAgIGBZb3UncmUgZmluZSBoZXJlLFxcbnRyeSBpdCBvbiBhbiBpT1MgZGV2aWNlLmAsXHJcbiAgICAgICAgZGVjb2Rpbmc6IGBEZWNvZGluZyBhdWRpby4uLmAsXHJcbiAgICAgICAgd2FpdGluZzogIGBXYWl0aW5nIGZvciB0b3VjaCB1bmxvY2suLi5gXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBlbGVtZW50ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgIGVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlc1trZXldO1xyXG5cclxuICAgIHBvc2l0aW9uRm9vdGVyKCk7XHJcbn07XHJcblxyXG5zZXRNZXNzYWdlKCdtZXNzYWdlJywgJ3RhcCcpO1xyXG5zZXRNZXNzYWdlKCdzdGF0dXMnLCAnbG9hZGluZycpO1xyXG5cclxubGV0IHJlc2l6ZUVycm9ycyA9ICgpID0+XHJcbntcclxuICAgIGxldCByb3cgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdycpO1xyXG4gICAgbGV0IGVycm9ycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Vycm9yLW1lc3NhZ2UnKTtcclxuXHJcbiAgICBmb3IgKGxldCBpPTA7IGk8ZXJyb3JzLmxlbmd0aDsgaSsrKVxyXG4gICAge1xyXG4gICAgICAgICg8SFRNTEVsZW1lbnQ+ZXJyb3JzW2ldKS5zdHlsZS53aWR0aCA9IChyb3cub2Zmc2V0V2lkdGggKiAwLjcpICsgJ3B4JztcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBsZXQgcHJpbnRFcnJvciA9IChlcnJvcjogYW55KSA9PlxyXG57XHJcbiAgICBsZXQgbWVzc2FnZSA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZScpO1xyXG4gICAgbWVzc2FnZS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCJlcnJvclwiPkVSUk9SITwvc3Bhbj48YnI+PGJyPjxzcGFuIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPiR7ZXJyb3J9PC9zcGFuPmA7XHJcblxyXG4gICAgbGV0IHN0YXR1cyA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdHVzJyk7XHJcbiAgICBzdGF0dXMuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPlNlZW1zIGxpa2UgdGhpcyBhcHByb2FjaCBjYW4ndCBiZSB1c2VkIHdpdGggY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiBXZWIgQXVkaW8gQVBJLiBXZSdyZSBzb3JyeSBhYm91dCB0aGF0LCBob3dldmVyIHlvdSBjYW4gb3BlbiBhbiBpc3N1ZSA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3BhdmxlLWdvbG9za29rb3ZpYy93ZWItYXVkaW8tdG91Y2gtdW5sb2NrL2lzc3Vlc1wiPmhlcmU8L2E+IGFuZCB3ZSdsbCB0cnkgdG8gc29ydCBpdCBvdXQuPC9zcGFuPmA7XHJcblxyXG4gICAgcmVzaXplRXJyb3JzKCk7XHJcblxyXG4gICAgaGlkZUZvb3RlcigpO1xyXG59O1xyXG5cclxud2luZG93Lm9ubG9hZCA9IHdpbmRvdy5vbnJlc2l6ZSA9IChlOiBFdmVudCkgPT5cclxue1xyXG4gICAgbGV0IHJvdyA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm93Jyk7XHJcbiAgICBsZXQgc2NhbGUgPSAxO1xyXG5cclxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8PSA0NTApXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IG1hcmdpbiA9IDg7XHJcbiAgICAgICAgc2NhbGUgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIChyb3cub2Zmc2V0V2lkdGggKyAyKm1hcmdpbik7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250U2l6ZSA9IGAke3NjYWxlfWVtYDtcclxuXHJcbiAgICByZXNpemVFcnJvcnMoKTtcclxuXHJcbiAgICBwb3NpdGlvbkZvb3RlcigpO1xyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdWkudHMiXSwic291cmNlUm9vdCI6IiJ9