const express = require('express');
const useSocket = require('socket.io')
const app = express();
const server = require('http').Server(app)
const io = useSocket(server);

const rooms = new Map([
    ['rooms', []],
    ['messages', []]
])
app.get('/rooms', function (req, res) {
    console.log('hello')
    rooms.set('hello', '')
    res.json('')

});

io.on('connection', socket => {
    console.log('socked connected', socket)
})


app.listen(9999, (err) => {
    if (err) {
        throw Error(err)
    }
    console.log(`Server has been started`)
});
