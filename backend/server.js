const express = require('express');
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})
const cors = require('cors')

app.use(cors())

const rooms = new Map([
    ['rooms', []],
    ['messages', []]
])
app.get('/rooms', function (req, res) {
    res.json(rooms)
});

io.on('connection', (socket) => {
    console.log('socked connected', socket.id)
})

app.listen(5000, (err) => {
    if (err) {
        throw Error(err)
    }
    console.log(`Server has been started`)
});
