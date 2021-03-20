const express = rquire('express');

const app = express();

const rooms = {
    rooms: [],
    messages: ['hello']
}
app.get('/users', function (req, res) {
    console.log('hello')
    res.json('')

});


app.listen(9999);
