"use strict";

import https from 'https';
import {md5} from "./md5.mjs";

function hash(diff) {
    return md5(diff.toString());
}

function get_diff(date) {
    return Math.floor((date - 16426368e5) / 864e5);
}

function decode(encrpyted) {
    const n = 126, magic_num = 113;
    let arr = encrpyted.split("");
    for (let a = 0; a < arr.length; a++) {
        let ascii = encrpyted.charCodeAt(a);
        if (ascii <= n) {
            arr[a] = String.fromCharCode((ascii + magic_num) % n);
        }
    }
    return arr.join("");
}
const argv = process.argv.slice(2);
const args = parse_argv(argv);

function parse_argv(argv) {
    // TODO
}

const mode = ""; // -m "mini"
const date = new Date(); // new Date("2022-02-05") -D
const diff = get_diff(date); // can add number of days -d

const req = https.request({
    hostname: 'nerdlegame.com',
    port: 443,
    method: 'GET',
    path: '/'.concat(mode, 'words/', hash(diff))
}, res => {
    res.on('data', data => {
        console.log(decode(data.toString()));
    });
});

req.end();
