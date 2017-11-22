import webAudioTouchUnlock from 'web-audio-touch-unlock'

let context = ((<any>window).AudioContext || (<any>window).webkitAudioContext)();

webAudioTouchUnlock(context);

let request = new XMLHttpRequest();
request.open('GET', 'viper.ogg', true);
request.responseType = 'arraybuffer';
request.onload = function()
{
    context.decodeAudioData(request.response,
        (buffer: AudioBuffer) =>
        {
            let source = context.createBufferSource();
            source.buffer = buffer;
            source.connect(context.destination);
            source.start();
        },
        (e: ErrorEvent) =>
        {
            console.log("Error with decoding audio data" + e);
        }
    );
};
request.send();
