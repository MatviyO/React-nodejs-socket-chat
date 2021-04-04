const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = 5000;

const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))


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
app.get('/rooms/:id', function (req, res) {

    const {id: roomId} = req.params;
    const obj =  rooms.has(roomId) ? {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()]
    } : { users: [], messages: []}
    res.json(obj);
});

app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body;
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []]
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
        socket.to(roomId).emit('ROOM:SET_USERS', users)
    })

    socket.on('disconnect', () => {
        console.log("Client disconnected");
        console.log(rooms, 'rooms')
        rooms.forEach((value, roomId) => {
            console.log( value, ' value')
            if ((value.length || value.size) && value.get('users').delete(socket.id)) {
                const users = [...value.get('users').values()]
                console.log(users, 'user delte')
                socket.to(roomId).emit('ROOM:SET_USERS', users)

            }
        })

    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

