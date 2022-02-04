"use strict";

import https from 'https';
import { exit } from 'process';
import { md5 } from "./md5.mjs";

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

function parse_argv(argv) {
    const set_mini = [
        (dict) => {
            dict.mode = "mini";
        },
        0
    ];

    const set_date = [
        (dict, date_str) => {
            const date = new Date(date_str);
            if (isNaN(date)) {
                console.error("invalid date");
                exit(1);
            }
            dict.date = date;
        },
        1
    ];

    const set_diff = [
        (dict, diff_str) => {
            const diff = parseInt(diff_str);
            if (isNaN(diff)) {
                console.error("invalid integer for diff");
                exit(1);
            }
            dict.diff = diff;
        },
        1
    ];

    const arg_mapping = {
        "-m": set_mini,
        "--mini": set_mini,
        "-D": set_date,
        "--Date": set_date,
        "-d": set_diff,
        "--diff": set_diff,
    };

    let ret = {
        mode: "",
        date: new Date(),
        diff: 0
    };

    const it = argv[Symbol.iterator]();

    let arg = it.next();
    while (arg.done === false) {
        if (arg.value in arg_mapping) {
            const flag = arg.value;
            const [func, argc] = arg_mapping[flag];
            const args = [];

            while (args.length < argc) {
                arg = it.next();
                if (arg.done === true) {
                    console.error(`"${flag}" needs to be followed by ${argc} arguments`);
                    exit(1);
                }
                args.push(arg.value);
            }

            func(ret, ...args);
        }

        arg = it.next();
    }

    return ret;
}

const {mode, date, diff} = parse_argv(process.argv.slice(2));

const req = https.request({
    hostname: 'nerdlegame.com',
    port: 443,
    method: 'GET',
    path: '/'.concat(mode, 'words/', hash(get_diff(date) + diff))
}, res => {
    res.on('data', data => {
        console.log(decode(data.toString()));
    });
});

req.end();
