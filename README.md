# break-nerdle
Run `node break_nerdle.mjs` to get the answer of today's nerdle.
Download `node.js` if you don't already have it.

You can change mode to `'mini'` or change the date to a specific date with `new Date('the specific date')`, e.g. `new Date('2022-02-04')`. You may just increase or decrease the `diff` variable as well to get your specific date.

# How it works?

I read the code of Nerdle (https://nerdlegame.com/static/js/main.e25ab9b9.js) and discover how it gets the answer.

Nerdle will fetch a encrpyted answer from the the link `https://nerdlegame.com/words/{md5_hash}` where `md5_hash` is the hash of the number of days between today and 20th Jan, 2022, which is 16426368e5 in unix timestamp.

We can actually see this encrpyted answer via the Network tab in the devtool.

We can decode the answer as it is in the source code. It justs add the ascii code of each character in the encrpyted string with 133 and get the remainder by dividing it with 126.

Since they have stored the answer of near future, we can even "predict" the answer of tomorrow.
