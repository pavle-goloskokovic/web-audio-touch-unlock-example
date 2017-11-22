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
var context = (window.AudioContext || window.webkitAudioContext)();
web_audio_touch_unlock_1.default(context);
var request = new XMLHttpRequest();
request.open('GET', 'viper.ogg', true);
request.responseType = 'arraybuffer';
request.onload = function () {
    context.decodeAudioData(request.response, function (buffer) {
        var source = context.createBufferSource();
        source.buffer = buffer;
        source.connect(context.destination);
        source.start();
    }, function (e) {
        console.log("Error with decoding audio data" + e);
    });
};
request.send();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function webAudioTouchUnlock(context) {
    if (!context || !(context instanceof (window.AudioContext || window.webkitAudioContext))) {
        console.error('WebAudioTouchUnlock - You need to pass an instance of AudioContext to this method call!');
        return;
    }
    if (typeof context.state !== 'string' || typeof context.resume !== 'function') {
        console.warn('WebAudioTouchUnlock - Seems like this approach can not be used with current ' +
            'implementation of AudioContext. We\'re sorry about that, however you can open an issue here: ' +
            'https://github.com/pavle-goloskokovic/web-audio-touch-unlock/issues and we\'ll try to sort it out.');
        return;
    }
    if (context.state === 'suspended') {
        var unlock_1 = function () {
            document.body.removeEventListener('touchstart', unlock_1);
            context.resume();
        };
        document.body.addEventListener('touchstart', unlock_1, false);
    }
}
exports.default = webAudioTouchUnlock;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjMxZmRkZDA3ZWI0MjU2YmMxNDgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWItYXVkaW8tdG91Y2gtdW5sb2NrL2Rpc3QvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDN0RBLHNEQUF3RDtBQUV4RCxJQUFJLE9BQU8sR0FBRyxDQUFPLE1BQU8sQ0FBQyxZQUFZLElBQVUsTUFBTyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztBQUVqRixnQ0FBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUU3QixJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO0FBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN2QyxPQUFPLENBQUMsWUFBWSxHQUFHLGFBQWEsQ0FBQztBQUNyQyxPQUFPLENBQUMsTUFBTSxHQUFHO0lBRWIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUNwQyxVQUFDLE1BQW1CO1FBRWhCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNuQixDQUFDLEVBQ0QsVUFBQyxDQUFhO1FBRVYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDLENBQ0osQ0FBQztBQUNOLENBQUMsQ0FBQztBQUNGLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7Ozs7Ozs7QUN6QmY7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6IndlYi1hdWRpby10b3VjaC11bmxvY2stZXhhbXBsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDIzMWZkZGQwN2ViNDI1NmJjMTQ4IiwiaW1wb3J0IHdlYkF1ZGlvVG91Y2hVbmxvY2sgZnJvbSAnd2ViLWF1ZGlvLXRvdWNoLXVubG9jaydcclxuXHJcbmxldCBjb250ZXh0ID0gKCg8YW55PndpbmRvdykuQXVkaW9Db250ZXh0IHx8ICg8YW55PndpbmRvdykud2Via2l0QXVkaW9Db250ZXh0KSgpO1xyXG5cclxud2ViQXVkaW9Ub3VjaFVubG9jayhjb250ZXh0KTtcclxuXHJcbmxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbnJlcXVlc3Qub3BlbignR0VUJywgJ3ZpcGVyLm9nZycsIHRydWUpO1xyXG5yZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcic7XHJcbnJlcXVlc3Qub25sb2FkID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICBjb250ZXh0LmRlY29kZUF1ZGlvRGF0YShyZXF1ZXN0LnJlc3BvbnNlLFxyXG4gICAgICAgIChidWZmZXI6IEF1ZGlvQnVmZmVyKSA9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHNvdXJjZSA9IGNvbnRleHQuY3JlYXRlQnVmZmVyU291cmNlKCk7XHJcbiAgICAgICAgICAgIHNvdXJjZS5idWZmZXIgPSBidWZmZXI7XHJcbiAgICAgICAgICAgIHNvdXJjZS5jb25uZWN0KGNvbnRleHQuZGVzdGluYXRpb24pO1xyXG4gICAgICAgICAgICBzb3VyY2Uuc3RhcnQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIChlOiBFcnJvckV2ZW50KSA9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aXRoIGRlY29kaW5nIGF1ZGlvIGRhdGFcIiArIGUpO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbn07XHJcbnJlcXVlc3Quc2VuZCgpO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXgudHMiLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5mdW5jdGlvbiB3ZWJBdWRpb1RvdWNoVW5sb2NrKGNvbnRleHQpIHtcclxuICAgIGlmICghY29udGV4dCB8fCAhKGNvbnRleHQgaW5zdGFuY2VvZiAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSkpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdXZWJBdWRpb1RvdWNoVW5sb2NrIC0gWW91IG5lZWQgdG8gcGFzcyBhbiBpbnN0YW5jZSBvZiBBdWRpb0NvbnRleHQgdG8gdGhpcyBtZXRob2QgY2FsbCEnKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIGNvbnRleHQuc3RhdGUgIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBjb250ZXh0LnJlc3VtZSAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignV2ViQXVkaW9Ub3VjaFVubG9jayAtIFNlZW1zIGxpa2UgdGhpcyBhcHByb2FjaCBjYW4gbm90IGJlIHVzZWQgd2l0aCBjdXJyZW50ICcgK1xyXG4gICAgICAgICAgICAnaW1wbGVtZW50YXRpb24gb2YgQXVkaW9Db250ZXh0LiBXZVxcJ3JlIHNvcnJ5IGFib3V0IHRoYXQsIGhvd2V2ZXIgeW91IGNhbiBvcGVuIGFuIGlzc3VlIGhlcmU6ICcgK1xyXG4gICAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL3BhdmxlLWdvbG9za29rb3ZpYy93ZWItYXVkaW8tdG91Y2gtdW5sb2NrL2lzc3VlcyBhbmQgd2VcXCdsbCB0cnkgdG8gc29ydCBpdCBvdXQuJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKGNvbnRleHQuc3RhdGUgPT09ICdzdXNwZW5kZWQnKSB7XHJcbiAgICAgICAgdmFyIHVubG9ja18xID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB1bmxvY2tfMSk7XHJcbiAgICAgICAgICAgIGNvbnRleHQucmVzdW1lKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB1bmxvY2tfMSwgZmFsc2UpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuZGVmYXVsdCA9IHdlYkF1ZGlvVG91Y2hVbmxvY2s7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlYi1hdWRpby10b3VjaC11bmxvY2svZGlzdC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9