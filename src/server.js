const express = require('express')


const db = require('../database/db')
const routes = require('../routes/routes')

const app = express()
db.connect()


app.use(express.json())

app.use('/api', routes)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server listening on port ${port}`))