const express = require('express')
const cors = require('cors')
const http = require('http')
const PORT = process.env.PORT || 5000
const socketServer = require('./socket')
const connectDB = require('./db')
const app = express()
const server = http.createServer(app)
socketServer.registerSocketServer(server)

app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.get('/connection', (req,res) => {
    res.send({connection: 'CONNECTED'})
})

const roomRouter = require('./routes/roomRouter')
app.use('/api/room', roomRouter)

connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    })
}).catch((e) => {
    console.log(e)
})
