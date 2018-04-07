const express = require('express')

const AlexandriaHelper = require('./src/AlexandriaHelper')

const OIPJS = require('oip-js').OIPJS
const Core = OIPJS()

const username = process.env.FLOWALLET_USERNAME
const password = process.env.FLOWALLET_PASSWORD

Core.Wallet.Login(username, password, function(success){
	console.log("Login Successful!");
}, function(error){
	console.error(error);
})

const ah = new AlexandriaHelper()

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(__dirname))

app.set('view engine', 'pug')

app.get('/', (request, respond) => {
    respond.render('index')
})

app.get('/record', (request, respond) => {
    const mood = request.query.mood
    const message = `Worldmood-0.1 : ${mood}`
    Core.Wallet.sendTxComment({txComment: message}, function(success){
        console.log("Success!", success)
        const txid = success.txid
        console.log(txid)
        respond.render('recorded', {
            mood,
            txid
        })
    }, function(error){ console.error(error) })

})

app.get('/more', (request, respond) => {
    respond.render('more')
})

app.get('/stats', (request, respond) => {
    ah.getTransactions('Worldmood').then((transactions) => {
        const entries = []
        transactions.reverse()
        transactions.forEach((transaction) => {
            mood = transaction.Message.split(':')[1].replace(' ','')
            entries.push(mood)
            console.log(transaction)
        })
        respond.render('stats', {
            moods: entries
        })
    })
})

app.listen(port, () => {
    console.log(`Serving on port: ${port}`)
})
