const express = require('express')
const router = express.Router()
const {createScheduledRoom, getScheduledRooms} = require('../controllers/room/roomController')

router.get('/schedule/get/:id', getScheduledRooms)
router.post('/schedule/create', createScheduledRoom)

module.exports = router