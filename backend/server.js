const express = require('express')
const cors = require('cors')
const http = require('http')
const PORT = process.env.PORT || 5000
const socketServer = require('./socket')

const app = express()
const server = http.createServer(app)
socketServer.registerSocketServer(server)

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


server.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})
