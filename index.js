const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const tasks = require('./models/task')
const userrouter = require('./routers/user')
const taskrouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(userrouter)
app.use(taskrouter)

app.listen(port,()=>{
    console.log("Running on port "+port)
})   
