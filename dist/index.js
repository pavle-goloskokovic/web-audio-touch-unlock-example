"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web_audio_touch_unlock_1 = require("web-audio-touch-unlock");
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
