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

With the new `oip-js` it is too easy to make a transaction. To use the full power of the `oip-js` we should get a Alexandria account [here](https://alexandria.io/publisher/register.html)

Just register an account. In our case we will be `worldmood@obviously.not.my.username.duh` and pick a nice password.

When you register to Alexandria, they are so nice that they will give you 1 FLO. :)

So let's install `oip-js`:

```bash
npm install --save oip-js
```

To use `oip-js` we need to require it:

```javascript
const OIPJS = require('oip-js').OIPJS
const Core = OIPJS()
```

and to make a transaction we need to login to our account first:

```javascript
Core.Wallet.Login(username, password, function(success){
	console.log("Login Successful!");
}, function(error){
	console.error(error);
})
```

obviously `username` and `password` are the ones we picked before. To avoid posting my username and password in the code, I use [foreman](https://www.npmjs.com/package/foreman). To use foreman, we need to make a `Procfile` saying what we are up to when we run the script:

```bash
web: node server.js
```

and we need to make a `.env` file:

```
FLOWALLET_USERNAME="worldmood@obviously.not.my.username.duh"
FLOWALLET_PASSWORD=notMyPassword
```

and then let's edit our `packege.json` start script:

```json
  "scripts": {
    "start": "node_modules/foreman/nf.js start"
  },
```

so, the next time we run `npm start`, we will be running `foreman` which will read the content of `.env` and make up environmental variables with our username and password for the `oip-js`. Then it will run the instructions in the `Procfile` which is basically to run our `server.js` program with `node`.

> Obviously, add the `.env` to your `.gitignore`. DO NOT COMMIT YOUR PASSWORD.

Now node has a simple way to deal with environmental variables:

```javascript
const username = process.env.FLOWALLET_USERNAME
const password = process.env.FLOWALLET_PASSWORD
```

Now, let's add all this in our `server.js` file to make a transaction:

```javascript
const express = require('express')
const OIPJS = require('oip-js').OIPJS
const Core = OIPJS()

const username = process.env.FLOWALLET_USERNAME
const password = process.env.FLOWALLET_PASSWORD

Core.Wallet.Login(username, password, function(success){
	console.log("Login Successful!");
}, function(error){
	console.error(error);
})


const app = express()

const port = process.env.PORT || 3000

app.use(express.static(__dirname))

app.set('view engine', 'pug')

app.get('/', (request, respond) => {
    respond.render('index')
})

app.get('/register', (request, respond) => {
    const mood = request.query.mood
    const message = `Worldmood-0.1 : ${mood}`
    Core.Wallet.sendTxComment({txComment: message}, function(success){
        console.log("Success!", success)
        respond.send(JSON.stringify({
            mood,
            success
        }, null, ' '))
    }, function(error){ console.error(error) })

})

app.listen(port, () => {
    console.log(`Serving on port: ${port}`)
})
```

The part that matters here is the route where we setup the route `/register` and to make a transaction this is the magical code:

```javascript
Core.Wallet.sendTxComment({txComment: message}, function(success){
    console.log("Success!", success)
    respond.send(JSON.stringify({
        mood,
        success
    }, null, ' '))
}, function(error){ console.error(error) })
```

That's it.

Now just run `npm start` and wherever is the port your server is serving you can take a look at our site, running localy in your browser here: `http://localhost:portNumber` (sub your portnumber for the port number)

## Deploying to Heroku.

[Heroku](heroku.com) is a fantastic platform for making small apps and what not.

Make an account with Heroku and then from your dashboard click in `New` and then `create a new app`. Give your app a name and then click in `Github` as our `Deployment method`. Type the name of your git repository to search and then click on it.

Now the next time you push it to master, Heroku will automatically get the code and reload the app. But now we need to remember that we won't commit the `.env` file with our credentials to our Alexandria wallet. So we need to config them in the Heroku environment. To do that click in Settings, and Show config.

We need to setup two environmental variables: `FLOWALLET_USERNAME` and `FLOWALLET_PASSWORD`.

Now I think we are all set.

Lets commit our changes to github and push.




