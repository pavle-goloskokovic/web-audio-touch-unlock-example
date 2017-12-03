import webAudioTouchUnlock from 'web-audio-touch-unlock';
import { printError, setMessage } from './ui';

let AudioContext = (<any>window).AudioContext || (<any>window).webkitAudioContext;

if(!AudioContext)
{
    printError('Seems like Web Audio API is not supported here :(');
}
else
{
    let loaded = false;
    let locked = true;
    let userUnlocked = false;
    let errored = false;

    let context = new AudioContext();

    webAudioTouchUnlock(context).then((unlocked: boolean) => {

            if (errored)
            {
                return;
            }

            locked = false;
            userUnlocked = unlocked;

            if (userUnlocked)
            {
                if (loaded)
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
        (reason: any) =>
        {
            errored = true;

            printError(reason);
        }
    );

    let request = new XMLHttpRequest();
    request.open('GET', 'assets/audio/3667624464.mp3', true);
    request.responseType = 'arraybuffer';
    request.onload = () =>
    {
        if (errored)
        {
            return;
        }

        setMessage('status', 'decoding');

        context.decodeAudioData(request.response, (buffer: AudioBuffer) => {

                if (errored)
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
                    if (userUnlocked)
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

    window.onblur = () =>
    {
        if (!locked)
        {
            context.suspend();
        }
    };

    window.onfocus = () =>
    {
        if (!locked)
        {
            context.resume();
        }
    };
}
