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
let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const response = new Date();
    socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));

