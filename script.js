'use strict';

let iframe = document.querySelector('iframe'),
    domain = 'https://dimastus.github.io',
    // domain = 'http://localstorage-for-virtual-users',
    listCallbacks = {};

document.querySelector('#set').addEventListener('click', () => {
    let user = {
        username: prompt('Enter the username', 'John'),
        phone: prompt('Enter the number phone', '111-22-33'),
        email: prompt('Enter the email', 'john@domain.com'),
        city: prompt('Enter the city', 'New-York'),
        pay: prompt('Enter the pay', '0.00$'),
        address: prompt('Enter the address', 'st. Madison 124'),
        img: prompt('Choose img', 'file IMG'),
        dateReg: new Date().toLocaleString('ru-RU').replace(/,/, ''),
        dateUpd: 'not updated',
        action: 'set'
    };

    isCallback(user, (data) => console.log('after SET: this is call of callback ' + data));

    iframe.contentWindow.postMessage(JSON.stringify(user), domain);
});

document.querySelector('#get').addEventListener('click', () => {
    let user = {
        action: 'get',
        email: prompt('Enter the email', 'john@domain.com')
    };

    isCallback(user, (data) => console.log('after GET: this is call of callback ' + data));

    iframe.contentWindow.postMessage(JSON.stringify(user), domain);
});

document.querySelector('#del').addEventListener('click', () => {
    let user = {
        action: 'del',
        email: prompt('Enter the email', 'john@domain.com')
    };

    isCallback(user, (data) => console.log('after DEL: this is call of callback ' + data));

    iframe.contentWindow.postMessage(JSON.stringify(user), domain);
});

function isCallback(obj, cb) {
    if (cb) {
        obj.callback = true;
        listCallbacks[obj.email] = cb;
    } else {
        obj.callback = false;
    }
}

window.addEventListener('message', (e) => {
    if (e.origin != domain) {
        console.log('чужой домен');
        return;
    }

    let { callback, email } = JSON.parse(e.data);

    if (callback) {
        listCallbacks[email](e.data);
    } else {
        console.log('something wrong ' + e.data);
    }
});