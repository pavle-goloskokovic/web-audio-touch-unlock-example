let positionFooter = () =>
{
    let pre = document.getElementsByTagName('pre')[0];
    let footer = document.getElementsByTagName('footer')[0];

    footer.style.bottom = Math.min(window.innerHeight - pre.offsetHeight, 0) + 'px';
};

export let hideFooter = () =>
{
    let footer = document.getElementsByTagName('footer')[0];
    footer.style.display = 'none';
};

export let setMessage = (id: string, key: string) =>
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

export let printError = (error: any) =>
{
    let message = <HTMLElement>document.getElementById('message');
    message.innerHTML = `<span class="error">ERROR!</span><br><br><span class="error-message">${error}</span>`;

    let status = <HTMLElement>document.getElementById('status');
    status.innerHTML = `<span class="error-message">Seems like this approach can't be used with current implementation of Web Audio API. We're sorry about that, however you can open an issue <a href="https://github.com/pavle-goloskokovic/web-audio-touch-unlock/issues">here</a> and we'll try to sort it out.</span>`;

    resizeErrors();

    hideFooter();
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
