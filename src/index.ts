import webAudioTouchUnlock from 'web-audio-touch-unlock';

let loaded = false;
let locked = true;
let userUnlocked = false;
let errored = false;

let context = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();

webAudioTouchUnlock(context).then((unlocked: boolean) => {

        if(errored)
        {
            return;
        }

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

        errored = true;

        printError(reason);
    }
);

let request = new XMLHttpRequest();
request.open('GET', 'assets/audio/3667624464.mp3', true);
request.responseType = 'arraybuffer';
request.onload = () =>
{
    if(errored)
    {
        return;
    }

    setMessage('status', 'decoding');

    context.decodeAudioData(request.response, (buffer: AudioBuffer) => {

            if(errored)
            {
                return;
            }

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

            errored = true;

            printError(e);
        }
    );
};
request.send();


// UI relevant logic

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

    let element = <HTMLElement>document.getElementById(id);
    element.textContent = messages[key];

    positionFooter();
};

setMessage('message', 'tap');
setMessage('status', 'loading');

let resizeErrors = () =>
{
    let row = <HTMLElement>document.getElementById('row');
    let errors = document.getElementsByClassName('error-message');

    for (let i=0; i<errors.length; i++)
    {
        (<HTMLElement>errors[i]).style.width = (row.offsetWidth * 0.7) + 'px';
    }
};

let printError = (error: any) =>
{
    let message = <HTMLElement>document.getElementById('message');
    message.innerHTML = `<span class="error">ERROR!</span><br><br><span class="error-message">${error}</span>`;

    let status = <HTMLElement>document.getElementById('status');
    status.innerHTML = `<span class="error-message">Seems like this approach can't be used with current implementation of Web Audio API. We're sorry about that, however you can open an issue <a href="https://github.com/pavle-goloskokovic/web-audio-touch-unlock/issues">here</a> and we'll try to sort it out.</span>`;

    resizeErrors();

    positionFooter();
};

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
    let row = <HTMLElement>document.getElementById('row');
    let scale = 1;

    if (window.innerWidth <= 450)
    {
        let margin = 8;
        scale = window.innerWidth / (row.offsetWidth + 2*margin);
    }

    document.body.style.fontSize = `${scale}em`;

    resizeErrors();

    positionFooter();
};
