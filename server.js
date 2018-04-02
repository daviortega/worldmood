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