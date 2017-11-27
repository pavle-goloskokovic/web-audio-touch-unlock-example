import webAudioTouchUnlock from 'web-audio-touch-unlock'

let loaded = false;
let locked = true;

let context = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();

webAudioTouchUnlock(context).then((ulocked: boolean)=>{
    console.log('All good!');
}, (string: string)=>{
    console.log(string);
});

// You're fine, try it on a mobile device.
// Tap anywhere to unlock... -> There you go!

// ERROR!
// [error message]
/*Seems like this approach can not be used with current ' +
'implementation of AudioContext. We\'re sorry about that, however you can open an issue here: ' +
'https://github.com/pavle-goloskokovic/web-audio-touch-unlock/issues and we\'ll try to sort it out.');*/

// Loading audio... -> Decoding audio... -> Waiting for touch unlock... -> Playing audio!

let request = new XMLHttpRequest();
request.open('GET', 'assets/audio/3667624464.mp3', true);
request.responseType = 'arraybuffer';
request.onload = function()
{
    context.decodeAudioData(request.response, (buffer: AudioBuffer) =>
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
