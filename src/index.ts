import webAudioTouchUnlock from 'web-audio-touch-unlock';

let loaded = false;
let locked = true;
let userUnlocked = false;

let context = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();

webAudioTouchUnlock(context).then((unlocked: boolean) => {

        locked = false;
        userUnlocked = unlocked;

        if(userUnlocked)
        {
            if(loaded)
            {
                setMessage('message', 'there');

                setMessage('status', 'playing');
            }
            else
            {
                setMessage('message', 'abit');
            }
        }
        else
        {
            setMessage('message', 'fine');
        }
    },
    (reason: any) => {
        // TODO print error
        console.log(reason);
    }
);

// ERROR!
// [error message]
/*Seems like this approach can not be used with current ' +
'implementation of AudioContext. We\'re sorry about that, however you can open an issue here: ' +
'https://github.com/pavle-goloskokovic/web-audio-touch-unlock/issues and we\'ll try to sort it out.');*/

let request = new XMLHttpRequest();
request.open('GET', 'assets/audio/3667624464.mp3', true);
request.responseType = 'arraybuffer';
request.onload = () =>
{
    setMessage('status', 'decoding');

    context.decodeAudioData(request.response, (buffer: AudioBuffer) => {

            let source = context.createBufferSource();
            source.buffer = buffer;
            source.connect(context.destination);
            source.start();

            loaded = true;

            if (locked)
            {
                setMessage('status', 'waiting');
            }
            else
            {
                if(userUnlocked)
                {
                    setMessage('message', 'there');
                }

                setMessage('status', 'playing');
            }
        },
        (e: ErrorEvent) => {
            // TODO print error
            console.log("Error with decoding audio data" + e);
        }
    );
};
request.send();

let positionFooter = () =>
{
    let pre = document.getElementsByTagName('pre')[0];
    let footer = document.getElementsByTagName('footer')[0];

    footer.style.bottom = Math.min(window.innerHeight - pre.offsetHeight, 0) + 'px';
};

let setMessage = (id: string, key: string) =>
{
    let messages: { [key: string]: string } = {
        tap:      `Tap anywhere to unlock...`,
        loading:  `Loading audio...`,
        there:    `There you go!`,
        playing:  `Playing sweet, sweet music!`,
        abit:     `Just a bit more...`,
        fine:     `You're fine here,\ntry it on an iOS device.`,
        decoding: `Decoding audio...`,
        waiting:  `Waiting for touch unlock...`
    };

    let element = document.getElementById(id);
    element && (element.textContent = messages[key]);

    positionFooter();
};

setMessage('message', 'tap');
setMessage('status', 'loading');

window.onblur = () =>
{
    if(!locked)
    {
        context.suspend();
    }
};

window.onfocus = () =>
{
    if(!locked) {
        context.resume();
    }
};

window.onload = window.onresize = (e: Event) =>
{
    let pre = document.getElementsByTagName('pre')[0];
    let scale = 1;

    if (window.innerWidth <= 450)
    {
        let margin = 8;
        scale = window.innerWidth / (pre.offsetWidth + 2*margin);
    }

    document.body.style.fontSize = `${scale}em`;

    positionFooter();
};
