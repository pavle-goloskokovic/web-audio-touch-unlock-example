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
var setMessage = function (id, key) {
    var messages = {
        tap: "         Tap anywhere to unlock...",
        loading: "             Loading audio...",
        there: "              There you go!",
        playing: "        Playing sweet, sweet music!",
        abit: "            Just a bit more...",
        fine: "             You're fine here," + "\n" +
            "         try it on an iOS device.",
        decoding: "             Decoding audio... ",
        waiting: "        Waiting for touch unlock..."
    };
    var element = document.getElementById(id);
    element && (element.textContent = messages[key]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGJiMmJiNGQ1ZjJhZTM4NjEwZDYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWItYXVkaW8tdG91Y2gtdW5sb2NrL2Rpc3QvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLHNEQUF5RDtBQUV6RCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDbkIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztBQUV6QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQU8sTUFBTyxDQUFDLFlBQVksSUFBVSxNQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRSxDQUFDO0FBRXJGLGdDQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFFBQWlCO0lBRTVDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDZixZQUFZLEdBQUcsUUFBUSxDQUFDO0lBRXhCLEVBQUUsRUFBQyxZQUFZLENBQUMsQ0FDaEIsQ0FBQztRQUNHLEVBQUUsRUFBQyxNQUFNLENBQUMsQ0FDVixDQUFDO1lBQ0csVUFBVSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUUvQixVQUFVLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFDRCxJQUFJLENBQ0osQ0FBQztZQUNHLFVBQVUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEMsQ0FBQztJQUNMLENBQUM7SUFDRCxJQUFJLENBQ0osQ0FBQztRQUNHLFVBQVUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEMsQ0FBQztBQUNMLENBQUMsRUFDRCxVQUFDLE1BQVc7SUFDUixtQkFBbUI7SUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4QixDQUFDLENBQ0osQ0FBQztBQUVGLFNBQVM7QUFDVCxrQkFBa0I7QUFDbEI7O3dHQUV3RztBQUV4RyxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0FBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLDZCQUE2QixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3pELE9BQU8sQ0FBQyxZQUFZLEdBQUcsYUFBYSxDQUFDO0FBQ3JDLE9BQU8sQ0FBQyxNQUFNLEdBQUc7SUFFYixVQUFVLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRWpDLE9BQU8sQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFDLE1BQW1CO1FBRXRELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVmLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFZCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FDWCxDQUFDO1lBQ0csVUFBVSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsSUFBSSxDQUNKLENBQUM7WUFDRyxFQUFFLEVBQUMsWUFBWSxDQUFDLENBQ2hCLENBQUM7Z0JBQ0csVUFBVSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNuQyxDQUFDO1lBRUQsVUFBVSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwQyxDQUFDO0lBQ0wsQ0FBQyxFQUNELFVBQUMsQ0FBYTtRQUNWLG1CQUFtQjtRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FDSixDQUFDO0FBQ04sQ0FBQyxDQUFDO0FBQ0YsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBRWYsSUFBSSxVQUFVLEdBQUcsVUFBQyxFQUFVLEVBQUUsR0FBVztJQUVyQyxJQUFJLFFBQVEsR0FBOEI7UUFDdEMsR0FBRyxFQUFPLG9DQUFvQztRQUM5QyxPQUFPLEVBQUcsK0JBQStCO1FBQ3pDLEtBQUssRUFBSyw2QkFBNkI7UUFDdkMsT0FBTyxFQUFHLHFDQUFxQztRQUMvQyxJQUFJLEVBQU0sZ0NBQWdDO1FBQzFDLElBQUksRUFBTSxnQ0FBZ0MsR0FBRyxJQUFJO1lBQ3ZDLG1DQUFtQztRQUM3QyxRQUFRLEVBQUUsaUNBQWlDO1FBQzNDLE9BQU8sRUFBRyxxQ0FBcUM7S0FDbEQsQ0FBQztJQUVGLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNyRCxDQUFDLENBQUM7QUFFRixVQUFVLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzdCLFVBQVUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFFaEMsTUFBTSxDQUFDLE1BQU0sR0FBRztJQUVaLEVBQUUsRUFBQyxDQUFDLE1BQU0sQ0FBQyxDQUNYLENBQUM7UUFDRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEIsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFFYixFQUFFLEVBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ1QsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3JCLENBQUM7QUFDTCxDQUFDLENBQUM7Ozs7Ozs7O0FDbkhGO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EiLCJmaWxlIjoid2ViLWF1ZGlvLXRvdWNoLXVubG9jay1leGFtcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGJiMmJiNGQ1ZjJhZTM4NjEwZDYiLCJpbXBvcnQgd2ViQXVkaW9Ub3VjaFVubG9jayBmcm9tICd3ZWItYXVkaW8tdG91Y2gtdW5sb2NrJztcclxuXHJcbmxldCBsb2FkZWQgPSBmYWxzZTtcclxubGV0IGxvY2tlZCA9IHRydWU7XHJcbmxldCB1c2VyVW5sb2NrZWQgPSBmYWxzZTtcclxuXHJcbmxldCBjb250ZXh0ID0gbmV3ICgoPGFueT53aW5kb3cpLkF1ZGlvQ29udGV4dCB8fCAoPGFueT53aW5kb3cpLndlYmtpdEF1ZGlvQ29udGV4dCkoKTtcclxuXHJcbndlYkF1ZGlvVG91Y2hVbmxvY2soY29udGV4dCkudGhlbigodW5sb2NrZWQ6IGJvb2xlYW4pID0+IHtcclxuXHJcbiAgICAgICAgbG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdXNlclVubG9ja2VkID0gdW5sb2NrZWQ7XHJcblxyXG4gICAgICAgIGlmKHVzZXJVbmxvY2tlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGxvYWRlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc2V0TWVzc2FnZSgnbWVzc2FnZScsICd0aGVyZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHNldE1lc3NhZ2UoJ3N0YXR1cycsICdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdtZXNzYWdlJywgJ2FiaXQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzZXRNZXNzYWdlKCdtZXNzYWdlJywgJ2ZpbmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgKHJlYXNvbjogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gVE9ETyBwcmludCBlcnJvclxyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbik7XHJcbiAgICB9XHJcbik7XHJcblxyXG4vLyBFUlJPUiFcclxuLy8gW2Vycm9yIG1lc3NhZ2VdXHJcbi8qU2VlbXMgbGlrZSB0aGlzIGFwcHJvYWNoIGNhbiBub3QgYmUgdXNlZCB3aXRoIGN1cnJlbnQgJyArXHJcbidpbXBsZW1lbnRhdGlvbiBvZiBBdWRpb0NvbnRleHQuIFdlXFwncmUgc29ycnkgYWJvdXQgdGhhdCwgaG93ZXZlciB5b3UgY2FuIG9wZW4gYW4gaXNzdWUgaGVyZTogJyArXHJcbidodHRwczovL2dpdGh1Yi5jb20vcGF2bGUtZ29sb3Nrb2tvdmljL3dlYi1hdWRpby10b3VjaC11bmxvY2svaXNzdWVzIGFuZCB3ZVxcJ2xsIHRyeSB0byBzb3J0IGl0IG91dC4nKTsqL1xyXG5cclxubGV0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxucmVxdWVzdC5vcGVuKCdHRVQnLCAnYXNzZXRzL2F1ZGlvLzM2Njc2MjQ0NjQubXAzJywgdHJ1ZSk7XHJcbnJlcXVlc3QucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcclxucmVxdWVzdC5vbmxvYWQgPSAoKSA9PlxyXG57XHJcbiAgICBzZXRNZXNzYWdlKCdzdGF0dXMnLCAnZGVjb2RpbmcnKTtcclxuXHJcbiAgICBjb250ZXh0LmRlY29kZUF1ZGlvRGF0YShyZXF1ZXN0LnJlc3BvbnNlLCAoYnVmZmVyOiBBdWRpb0J1ZmZlcikgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IGNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICAgICAgICAgIHNvdXJjZS5idWZmZXIgPSBidWZmZXI7XHJcbiAgICAgICAgICAgIHNvdXJjZS5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgICAgICAgICBzb3VyY2Uuc3RhcnQoKTtcclxuXHJcbiAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAobG9ja2VkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdzdGF0dXMnLCAnd2FpdGluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYodXNlclVubG9ja2VkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldE1lc3NhZ2UoJ21lc3NhZ2UnLCAndGhlcmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZXRNZXNzYWdlKCdzdGF0dXMnLCAncGxheWluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICAoZTogRXJyb3JFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAvLyBUT0RPIHByaW50IGVycm9yXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2l0aCBkZWNvZGluZyBhdWRpbyBkYXRhXCIgKyBlKTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG59O1xyXG5yZXF1ZXN0LnNlbmQoKTtcclxuXHJcbmxldCBzZXRNZXNzYWdlID0gKGlkOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PlxyXG57XHJcbiAgICBsZXQgbWVzc2FnZXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7XHJcbiAgICAgICAgdGFwOiAgICAgIGAgICAgICAgICBUYXAgYW55d2hlcmUgdG8gdW5sb2NrLi4uYCxcclxuICAgICAgICBsb2FkaW5nOiAgYCAgICAgICAgICAgICBMb2FkaW5nIGF1ZGlvLi4uYCxcclxuICAgICAgICB0aGVyZTogICAgYCAgICAgICAgICAgICAgVGhlcmUgeW91IGdvIWAsXHJcbiAgICAgICAgcGxheWluZzogIGAgICAgICAgIFBsYXlpbmcgc3dlZXQsIHN3ZWV0IG11c2ljIWAsXHJcbiAgICAgICAgYWJpdDogICAgIGAgICAgICAgICAgICBKdXN0IGEgYml0IG1vcmUuLi5gLFxyXG4gICAgICAgIGZpbmU6ICAgICBgICAgICAgICAgICAgIFlvdSdyZSBmaW5lIGhlcmUsYCArIGBcXG5gICtcclxuICAgICAgICAgICAgICAgICAgYCAgICAgICAgIHRyeSBpdCBvbiBhbiBpT1MgZGV2aWNlLmAsXHJcbiAgICAgICAgZGVjb2Rpbmc6IGAgICAgICAgICAgICAgRGVjb2RpbmcgYXVkaW8uLi4gYCxcclxuICAgICAgICB3YWl0aW5nOiAgYCAgICAgICAgV2FpdGluZyBmb3IgdG91Y2ggdW5sb2NrLi4uYFxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuICAgIGVsZW1lbnQgJiYgKGVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlc1trZXldKTtcclxufTtcclxuXHJcbnNldE1lc3NhZ2UoJ21lc3NhZ2UnLCAndGFwJyk7XHJcbnNldE1lc3NhZ2UoJ3N0YXR1cycsICdsb2FkaW5nJyk7XHJcblxyXG53aW5kb3cub25ibHVyID0gKCkgPT5cclxue1xyXG4gICAgaWYoIWxvY2tlZClcclxuICAgIHtcclxuICAgICAgICBjb250ZXh0LnN1c3BlbmQoKTtcclxuICAgIH1cclxufTtcclxuXHJcbndpbmRvdy5vbmZvY3VzID0gKCkgPT5cclxue1xyXG4gICAgaWYoIWxvY2tlZCkge1xyXG4gICAgICAgIGNvbnRleHQucmVzdW1lKCk7XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9pbmRleC50cyIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmZ1bmN0aW9uIHdlYkF1ZGlvVG91Y2hVbmxvY2soY29udGV4dCkge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBpZiAoIWNvbnRleHQgfHwgIShjb250ZXh0IGluc3RhbmNlb2YgKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCkpKSB7XHJcbiAgICAgICAgICAgIHJlamVjdCgnV2ViQXVkaW9Ub3VjaFVubG9jayAtIFlvdSBuZWVkIHRvIHBhc3MgYW4gaW5zdGFuY2Ugb2YgQXVkaW9Db250ZXh0IHRvIHRoaXMgbWV0aG9kIGNhbGwhJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQuc3RhdGUgPT09ICdzdXNwZW5kZWQnKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdW5sb2NrXzEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdW5sb2NrXzEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQucmVzdW1lKCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlYXNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVhc29uKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB1bmxvY2tfMSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmVqZWN0KGUpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IHdlYkF1ZGlvVG91Y2hVbmxvY2s7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlYi1hdWRpby10b3VjaC11bmxvY2svZGlzdC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9