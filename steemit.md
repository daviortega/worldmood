# Recording the world mood in the FLO blockchain

> TL;DR: Making distributed apps in the FLO blockchain is even easier after the launch of [oip-js]. This is my experience, step by step, to make our newest (April 2018) app: WorldMood.io

I have been a lot of efforts to register the “world’s mood” based on twitter and other sentiment analysis and I though that it would be interesting to do register people’s mood in the blockchain.

>Sanity check: Obviously, this app will never register the world’s true mood, because tons of people won’t ever even to know about it (or doesn’t even have access to the internet), but it will register my mood and maybe some of the people in the crypto, dapps ecosystem.

This is how the app is suppose to look like:

![splashscreen-0.1.jpg](https://steemitimages.com/DQmTPP1bvi22nUDHqnmDz51Pr8XhouPADsbL7yjT3eWJXmx/splashscreen-0.1.jpg)


The idea is that the people would visit the worldmood.io and just press one of the mood smiley faces accorsing to how they feel. Then this is sent to the server that performs a transaction between to FLO addresses and bam - locked in the blockchain.

## Preparing the environment

So… I started by making a github repository worldmood and cloning it to my local laptop machine. Then after getting in the directory, I initiated a npm package with `npm init` answered some questions and immediately after I wrote the `.gitignore`:

```bash
$ echo "node_modules" > .gitignore
```

Next, I know already that I will build this app using [express.js](https://expressjs.com/) (to build the server),  [pug](https://pugjs.org) (to make the `htmls`) and [foreman](https://strongloop.github.io/node-foreman/) (to make environmental variables) so I will add those to the `node_modules`:

```bash
$ npm install --save express pug foreman
```

## Building a simple node (express) server

Now let's make the backbone of `server.js`

```javascript
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.static(__dirname))

app.set('view engine', 'pug')

app.get('/', (request, respond) => {
    respond.render('index')
})

app.listen(port, () => {
    console.log(`Serving on port: ${port}`)
})
```

and the directory required by pug (`views`) and stick the `index.pug` in there:

```
$ mkdir views
$ touch views/index.pug
```

Next, let's write a simple `index.pug`

```pug
doctype html
html(lang='en')
    head
        title World mood
    body
        h1 What is your mood today?
```

and then we can check if our server does anything:

```bash
$ node server.js
```

You should see something at `http:localhost:3000` asking the question `What is your mood today?`

# Building the rest of the front page

Now we need to work on some `css` to make this pretty.

```
$ mkdir assets
$ touch assets/style.css
```

and inside `style.css` we will put:

```css
h1 {
    text-align: center
}
```
reload the page and it should be there and centered.

Next, let's use the font `Impact`, make it bigger and change the color of the text for #ABABAB.

our `style.css` should be like this now:

```css
h1 {
    font-family: Impact, Charcoal, sans-serif;
    font-size: 25px;
    font-size: 7vw;
    color: #ABABAB;
    text-align: center
}
```

Great, now next we need our emojis. I prepared them and you can see them in the `assets` directory.

So let's alter our `index.pug` to make put them in.

```pug
doctype html
html(lang='en')
    head
        title World mood
        link(href='assets/style.css', rel="stylesheet", type='text/css')
    body
        h1 What is your mood today?
        .moods
            a(href="register?mood=happiest")
                img(src="assets/happiest.svg" )
            a(href="register?mood=happy")
                img(src="assets/happy.svg" )
            a(href="register?mood=meh")
                img(src="assets/meh.svg" )
            a(href="register?mood=sad")
                img(src="assets/sad.svg" )
            a(href="register?mood=saddest")
                img(src="assets/saddest.svg")
```

It is of particular interest the part `href="register?mood=` because that is how we are sending information to our server: `register` is the route, `mood` is the parameter and whatever comes after the `=` sign is the value to be passed. This will make more sense later.


and the `style.css` should add some styling of the emojis:

```css
h1 {
    font-family: Impact, Charcoal, sans-serif;
    font-size: 25px;
    font-size: 7vw;
    color: #ABABAB;
    text-align: center
}

.moods img {
    padding: 1%;
    width: 18%;
}
```

now we need to build our footer whtat includes three items:
* a link to the `World Mood Stats`
* a link to the `FLO` ecosystem
* a link to let people learn more about it.

To do that, and full disclosure, I am not very good at `css` let's append the `index.pug` first:

```pug
doctype html
html(lang='en')
    head
        title World mood
        link(href='assets/style.css', rel="stylesheet", type='text/css')
    body
        h1 What is your mood today?
        .moods
            a(href="register?mood=happiest")
                img(src="assets/happiest.svg" )
            a(href="register?mood=happy")
                img(src="assets/happy.svg" )
            a(href="register?mood=meh")
                img(src="assets/meh.svg" )
            a(href="register?mood=sad")
                img(src="assets/sad.svg" )
            a(href="register?mood=saddest")
                img(src="assets/saddest.svg")
        .footer
            .stats
                a(href="stats")
                    img(src="/assets/world.svg")
                p World mood stats
            .flo
                a(href="https://flo.cash")
                    img(src="/assets/FLOblockchainLogo.svg")
            .more
                a(href="more")
                    p What is this?
```

and our `style.css`

```css
h1 {
    font-family: Impact, Charcoal, sans-serif;
    font-size: 6vw;
    color: #ABABAB;
    text-align: center
}

.moods img {
    padding: 1%;
    width: 18%;
}

.footer {
    padding: 50px;
}

.footer p, a:link {
    font-family: Courier New,Courier,Lucida Sans Typewriter,Lucida Typewriter,monospace;
    color: #ABABAB;
    font-size: calc(10px + 1.5vw);
    height: 100px;
}

.footer img {
    width: 15%;
    display: block;
    margin-left: auto;
    margin-right: auto
}

.stats {
    width: 33%;
    float: left;
}

.stats p {
    text-align: center
}

.flo {
    width: 33%;
    float: left;
}

.flo img {
    width: 20%;
}

.more {
    width: 33%;
    float: right
}

.more p {
    text-align: center;
    text-decoration: underline;
}
```

and that is probably all we need. Reloading the page you will see basically the same as in the [worldmood.io](worldmood.io)

## Routes to the server

When you click in one of the smiley faces you will probably get something like this:

```
Cannot GET /register
```

That's because we don't have any `/register` routes in our `server.js` besides the `/`. So let's make the `/register` by updating the `server.js` to this:

```javascript
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

app.use(express.static(__dirname))

app.set('view engine', 'pug')

app.get('/', (request, respond) => {
    respond.render('index')
})

app.get('/register', (request, respond) => {
    const mood = request.query.mood
    respond.send(mood)
})

app.listen(port, () => {
    console.log(`Serving on port: ${port}`)
})
```

If we restart the server now and click one of the emojis, we will go to a page that simply prints the mood.

Now we need to tell the server what to do with this info: put in the FLO blockchain.

## Posting info in the FLO blockchain with oip-js



