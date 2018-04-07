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

app.get('/more', (request, respond) => {
    respond.render('more')
})

app.listen(port, () => {
    console.log(`Serving on port: ${port}`)
})
