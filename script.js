'use strict';

let iframe = document.querySelector('iframe'),
    listCallbacks = {};

document.querySelector('#set').addEventListener('click', () => {
    let user = {
        action: 'set',
        username: prompt('Enter the username', 'John'),
        phone: prompt('Enter the number phone', '111-22-33'),
        email: prompt('Enter the email', 'john@domain.com'),
        city: prompt('Enter the city', 'New-York'),
        pay: prompt('Enter the pay', '0.00$'),
        address: prompt('Enter the address', 'st. Madison 124'),
        img: prompt('Choose img', 'file IMG'),
        dateReg: new Date().toLocaleString('ru-RU').replace(/,/, ''),
        dateUpd: 'not updated'
    };

    isCallback(user);

    iframe.contentWindow.postMessage(JSON.stringify(user), 'https://dimastus.github.io');
});

document.querySelector('#get').addEventListener('click', () => {
    let user = JSON.stringify({
        action: 'get',
        email: prompt('Enter the email', 'john@domain.com')
    });

    isCallback(user);

    iframe.contentWindow.postMessage(user, 'https://dimastus.github.io');
});

document.querySelector('#del').addEventListener('click', () => {
    let user = JSON.stringify({
        action: 'del',
        email: prompt('Enter the email', 'john@domain.com')
    });

    isCallback(user);

    iframe.contentWindow.postMessage(user, 'https://dimastus.github.io');
});

window.addEventListener('message', (e) => {
    if (e.origin != 'https://dimastus.github.io') {
        console.log('чужой домен');
        return;
    }

    const parseData = (data) => {
        return JSON.parse(data);
    };

    let { action, callback, ...props } = parseData(e.data);

    if (action == 'set') {
        console.log(`written: key --> ${props.email}`);
        if (callback) listCallbacks[props.email];
    } else if (action == 'get') {
        console.dir(`gotten data: ${JSON.parse(props)}`);
        if (callback) listCallbacks[props.email];
    } else if (action == 'del') {
        console.log(`removed: key --> ${props.email}`);
        if (callback) listCallbacks[props.email];
    } else {
        console.log('something wrong ' + props);
    }
});

function isCallback(obj) {
    const cb = confirm('is callback?');
    obj.callback = cb;
    if (cb) listCallbacks[obj.email] = () => alert('this is call of callback ' + obj.email);
}
