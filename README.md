# break-nerdle

Clone the repo or copy the two `.mjs` and store them under the same directory.

Download `node.js` if you don't already have it.

Then, run `node break_nerdle.mjs` to get the answer of today's Nerdle(https://nerdlegame.com/).

Usage: node break_nerdle.mjs [options]
Options:
    -m or --mini: set mode to "mini".
    -d or --diff <number of days>: set the date to the specific date(if -D is used) or today add the number of days.
    -D or --date <date>: set the date to the specific date.
    -h or --help: display this information.

The default date will be today. Note that Nerdle uses UTC time.

Example:

If you run the following command,

`node break_nerdle.mjs -m -D 2022-02-05 -d 1`

you will get the answer of Nerdle on the 6th Feb, 2022. (one day after 5th Feb, 2022).

# How it works?

I read the code of Nerdle (https://nerdlegame.com/static/js/main.e25ab9b9.js) and discover how it gets the answer.

Nerdle will fetch a encrpyted answer from the the link `https://nerdlegame.com/words/{md5_hash}` where `md5_hash` is the hash of the number of days between today and 20th Jan, 2022, which is 16426368e5 in unix timestamp.

We can actually see this encrpyted answer via the Network tab in the devtool.

We can decode the answer as it is in the source code. It justs add the ascii code of each character in the encrpyted string with 133 and get the remainder by dividing it with 126.

Since they have stored the answer of near future, we can even "predict" the answer of tomorrow.
