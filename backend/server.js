const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = 5000;

const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors())


const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: '*',
    }
});
const rooms = new Map([
    ['rooms', []],
    ['messages', []]
])
app.get('/rooms', function (req, res) {
    res.json(rooms);
});

app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body;
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['message', []]
        ]));
    }
    res.json([...rooms.keys()]);
})

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId)
        rooms.get(roomId).get('users').set(socket.id, userName)
        const users = [...rooms.get(roomId).get('users').values()]
        socket.to(roomId).broadcast.emit('ROOM:JOINED', users)
    })

    socket.on("disconnected", () => {
        console.log("Client disconnected");
        rooms.forEach((value, roomId) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...value.get('users').values()]
                socket.to(roomId).broadcast.emit('ROOM:LEAVE', users)

            }
        })

    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

