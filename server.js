require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const tasksRoutes = require('./routes/tasks')
const userRoutes = require('./routes/users')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


app.use('/api/tasks', tasksRoutes)

app.use('/api/users', userRoutes)


mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB and listening on port', process.env.PORT)
        }) 
    })
    .catch((error) => {
        console.log(error)
    })

