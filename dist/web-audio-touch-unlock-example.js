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
        try {
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
        }
        catch (e) {
            reject(e);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgN2ZkZjNkYTEyMzU4YmY0NGMwY2MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWItYXVkaW8tdG91Y2gtdW5sb2NrL2Rpc3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3VpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQSxzREFBeUQ7QUFDekQsa0NBQThDO0FBRTlDLElBQUksWUFBWSxHQUFTLE1BQU8sQ0FBQyxZQUFZLElBQVUsTUFBTyxDQUFDLGtCQUFrQixDQUFDO0FBRWxGLEVBQUUsRUFBQyxDQUFDLFlBQVksQ0FBQyxDQUNqQixDQUFDO0lBQ0csZUFBVSxDQUFDLG1EQUFtRCxDQUFDLENBQUM7QUFDcEUsQ0FBQztBQUNELElBQUksQ0FDSixDQUFDO0lBQ0csSUFBSSxRQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ25CLElBQUksUUFBTSxHQUFHLElBQUksQ0FBQztJQUNsQixJQUFJLGNBQVksR0FBRyxLQUFLLENBQUM7SUFDekIsSUFBSSxTQUFPLEdBQUcsS0FBSyxDQUFDO0lBRXBCLElBQUksU0FBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFF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RWYsa0JBQVUsRUFBRSxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsR0FBRyxVQUFDLENBQVE7SUFFdkMsSUFBSSxHQUFHLEdBQWdCLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBRWQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxHQUFHLENBQUMsQ0FDN0IsQ0FBQztRQUNHLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxDQUFDLEdBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBTSxLQUFLLE9BQUksQ0FBQztJQUU1QyxZQUFZLEVBQUUsQ0FBQztJQUVmLGNBQWMsRUFBRSxDQUFDO0FBQ3JCLENBQUMsQ0FBQyIsImZpbGUiOiJ3ZWItYXVkaW8tdG91Y2gtdW5sb2NrLWV4YW1wbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA3ZmRmM2RhMTIzNThiZjQ0YzBjYyIsImltcG9ydCB3ZWJBdWRpb1RvdWNoVW5sb2NrIGZyb20gJ3dlYi1hdWRpby10b3VjaC11bmxvY2snO1xyXG5pbXBvcnQgeyBwcmludEVycm9yLCBzZXRNZXNzYWdlIH0gZnJvbSAnLi91aSc7XHJcblxyXG5sZXQgQXVkaW9Db250ZXh0ID0gKDxhbnk+d2luZG93KS5BdWRpb0NvbnRleHQgfHwgKDxhbnk+d2luZG93KS53ZWJraXRBdWRpb0NvbnRleHQ7XHJcblxyXG5pZighQXVkaW9Db250ZXh0KVxyXG57XHJcbiAgICBwcmludEVycm9yKCdTZWVtcyBsaWtlIFdlYiBBdWRpbyBBUEkgaXMgbm90IHN1cHBvcnRlZCBoZXJlIDooJyk7XHJcbn1cclxuZWxzZVxyXG57XHJcbiAgICBsZXQgbG9hZGVkID0gZmFsc2U7XHJcbiAgICBsZXQgbG9ja2VkID0gdHJ1ZTtcclxuICAgIGxldCB1c2VyVW5sb2NrZWQgPSBmYWxzZTtcclxuICAgIGxldCBlcnJvcmVkID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IGNvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XHJcblxyXG4gICAgd2ViQXVkaW9Ub3VjaFVubG9jayhjb250ZXh0KS50aGVuKCh1bmxvY2tlZDogYm9vbGVhbikgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGVycm9yZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHVzZXJVbmxvY2tlZCA9IHVubG9ja2VkO1xyXG5cclxuICAgICAgICAgICAgaWYgKHVzZXJVbmxvY2tlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdtZXNzYWdlJywgJ3RoZXJlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2UoJ3N0YXR1cycsICdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnbWVzc2FnZScsICdhYml0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdtZXNzYWdlJywgJ2ZpbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKHJlYXNvbjogYW55KSA9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZXJyb3JlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBwcmludEVycm9yKHJlYXNvbik7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuXHJcbiAgICBsZXQgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgcmVxdWVzdC5vcGVuKCdHRVQnLCAnYXNzZXRzL2F1ZGlvLzM2Njc2MjQ0NjQubXAzJywgdHJ1ZSk7XHJcbiAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcbiAgICByZXF1ZXN0Lm9ubG9hZCA9ICgpID0+XHJcbiAgICB7XHJcbiAgICAgICAgaWYgKGVycm9yZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRNZXNzYWdlKCdzdGF0dXMnLCAnZGVjb2RpbmcnKTtcclxuXHJcbiAgICAgICAgY29udGV4dC5kZWNvZGVBdWRpb0RhdGEocmVxdWVzdC5yZXNwb25zZSwgKGJ1ZmZlcjogQXVkaW9CdWZmZXIpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JlZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHNvdXJjZSA9IGNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2UuYnVmZmVyID0gYnVmZmVyO1xyXG4gICAgICAgICAgICAgICAgc291cmNlLmNvbm5lY3QoY29udGV4dC5kZXN0aW5hdGlvbik7XHJcbiAgICAgICAgICAgICAgICBzb3VyY2Uuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChsb2NrZWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnc3RhdHVzJywgJ3dhaXRpbmcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodXNlclVubG9ja2VkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnbWVzc2FnZScsICd0aGVyZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnc3RhdHVzJywgJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgKGU6IEVycm9yRXZlbnQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBlcnJvcmVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICBwcmludEVycm9yKGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH07XHJcbiAgICByZXF1ZXN0LnNlbmQoKTtcclxuXHJcbiAgICB3aW5kb3cub25ibHVyID0gKCkgPT5cclxuICAgIHtcclxuICAgICAgICBpZiAoIWxvY2tlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnRleHQuc3VzcGVuZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgd2luZG93Lm9uZm9jdXMgPSAoKSA9PlxyXG4gICAge1xyXG4gICAgICAgIGlmICghbG9ja2VkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29udGV4dC5yZXN1bWUoKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmZ1bmN0aW9uIHdlYkF1ZGlvVG91Y2hVbmxvY2soY29udGV4dCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBpZiAoIWNvbnRleHQgfHwgIShjb250ZXh0IGluc3RhbmNlb2YgKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCkpKSB7XHJcbiAgICAgICAgICAgIHJlamVjdCgnV2ViQXVkaW9Ub3VjaFVubG9jazogWW91IG5lZWQgdG8gcGFzcyBhbiBpbnN0YW5jZSBvZiBBdWRpb0NvbnRleHQgdG8gdGhpcyBtZXRob2QgY2FsbCcpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0LnN0YXRlID09PSAnc3VzcGVuZGVkJyAmJiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHtcclxuICAgICAgICAgICAgICAgIHZhciB1bmxvY2tfMSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnJlc3VtZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB1bmxvY2tfMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB1bmxvY2tfMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVhc29uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB1bmxvY2tfMSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHVubG9ja18xLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZWplY3QoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0cy5kZWZhdWx0ID0gd2ViQXVkaW9Ub3VjaFVubG9jaztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2ViLWF1ZGlvLXRvdWNoLXVubG9jay9kaXN0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImxldCBwb3NpdGlvbkZvb3RlciA9ICgpID0+XHJcbntcclxuICAgIGxldCBwcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgncHJlJylbMF07XHJcbiAgICBsZXQgZm9vdGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Zvb3RlcicpWzBdO1xyXG5cclxuICAgIGZvb3Rlci5zdHlsZS5ib3R0b20gPSBNYXRoLm1pbih3aW5kb3cuaW5uZXJIZWlnaHQgLSBwcmUub2Zmc2V0SGVpZ2h0LCAwKSArICdweCc7XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IGhpZGVGb290ZXIgPSAoKSA9PlxyXG57XHJcbiAgICBsZXQgZm9vdGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Zvb3RlcicpWzBdO1xyXG4gICAgZm9vdGVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IHNldE1lc3NhZ2UgPSAoaWQ6IHN0cmluZywga2V5OiBzdHJpbmcpID0+XHJcbntcclxuICAgIGxldCBtZXNzYWdlczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcclxuICAgICAgICB0YXA6ICAgICAgYFRhcCBhbnl3aGVyZSB0byB1bmxvY2suLi5gLFxyXG4gICAgICAgIGxvYWRpbmc6ICBgTG9hZGluZyBhdWRpby4uLmAsXHJcbiAgICAgICAgdGhlcmU6ICAgIGBUaGVyZSB5b3UgZ28hYCxcclxuICAgICAgICBwbGF5aW5nOiAgYFBsYXlpbmcgc3dlZXQsIHN3ZWV0IG11c2ljIWAsXHJcbiAgICAgICAgYWJpdDogICAgIGBKdXN0IGEgYml0IG1vcmUuLi5gLFxyXG4gICAgICAgIGZpbmU6ICAgICBgWW91J3JlIGZpbmUgaGVyZSxcXG50cnkgaXQgb24gYW4gaU9TIGRldmljZS5gLFxyXG4gICAgICAgIGRlY29kaW5nOiBgRGVjb2RpbmcgYXVkaW8uLi5gLFxyXG4gICAgICAgIHdhaXRpbmc6ICBgV2FpdGluZyBmb3IgdG91Y2ggdW5sb2NrLi4uYFxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZWxlbWVudCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbiAgICBlbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZXNba2V5XTtcclxuXHJcbiAgICBwb3NpdGlvbkZvb3RlcigpO1xyXG59O1xyXG5cclxuc2V0TWVzc2FnZSgnbWVzc2FnZScsICd0YXAnKTtcclxuc2V0TWVzc2FnZSgnc3RhdHVzJywgJ2xvYWRpbmcnKTtcclxuXHJcbmxldCByZXNpemVFcnJvcnMgPSAoKSA9PlxyXG57XHJcbiAgICBsZXQgcm93ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3cnKTtcclxuICAgIGxldCBlcnJvcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdlcnJvci1tZXNzYWdlJyk7XHJcblxyXG4gICAgZm9yIChsZXQgaT0wOyBpPGVycm9ycy5sZW5ndGg7IGkrKylcclxuICAgIHtcclxuICAgICAgICAoPEhUTUxFbGVtZW50PmVycm9yc1tpXSkuc3R5bGUud2lkdGggPSAocm93Lm9mZnNldFdpZHRoICogMC43KSArICdweCc7XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgbGV0IHByaW50RXJyb3IgPSAoZXJyb3I6IGFueSkgPT5cclxue1xyXG4gICAgbGV0IG1lc3NhZ2UgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2UnKTtcclxuICAgIG1lc3NhZ2UuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPVwiZXJyb3JcIj5FUlJPUiE8L3NwYW4+PGJyPjxicj48c3BhbiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIj4ke2Vycm9yfTwvc3Bhbj5gO1xyXG5cclxuICAgIGxldCBzdGF0dXMgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXR1cycpO1xyXG4gICAgc3RhdHVzLmlubmVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIj5TZWVtcyBsaWtlIHRoaXMgYXBwcm9hY2ggY2FuJ3QgYmUgdXNlZCB3aXRoIGN1cnJlbnQgaW1wbGVtZW50YXRpb24gb2YgV2ViIEF1ZGlvIEFQSS4gV2UncmUgc29ycnkgYWJvdXQgdGhhdCwgaG93ZXZlciB5b3UgY2FuIG9wZW4gYW4gaXNzdWUgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9wYXZsZS1nb2xvc2tva292aWMvd2ViLWF1ZGlvLXRvdWNoLXVubG9jay9pc3N1ZXNcIj5oZXJlPC9hPiBhbmQgd2UnbGwgdHJ5IHRvIHNvcnQgaXQgb3V0Ljwvc3Bhbj5gO1xyXG5cclxuICAgIHJlc2l6ZUVycm9ycygpO1xyXG5cclxuICAgIGhpZGVGb290ZXIoKTtcclxufTtcclxuXHJcbndpbmRvdy5vbmxvYWQgPSB3aW5kb3cub25yZXNpemUgPSAoZTogRXZlbnQpID0+XHJcbntcclxuICAgIGxldCByb3cgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvdycpO1xyXG4gICAgbGV0IHNjYWxlID0gMTtcclxuXHJcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPD0gNDUwKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBtYXJnaW4gPSA4O1xyXG4gICAgICAgIHNjYWxlID0gd2luZG93LmlubmVyV2lkdGggLyAocm93Lm9mZnNldFdpZHRoICsgMiptYXJnaW4pO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSBgJHtzY2FsZX1lbWA7XHJcblxyXG4gICAgcmVzaXplRXJyb3JzKCk7XHJcblxyXG4gICAgcG9zaXRpb25Gb290ZXIoKTtcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3VpLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==