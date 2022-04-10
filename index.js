let express = require('express');
let socket= require('socket.io');

//app setup
let app = express();

//server setup
let server = app.listen(4000, () => {
    console.log("Project is running at localhost:4000.");
});

//route setup
app.get("/", (res, req) => {
    req.sendFile(__dirname+ "/public/index.html");
})

//socket setup
let io= socket(server);
io.on('connection',(socket)=>{
    socket.on('chat',(data) => {
        io.sockets.emit("chat", data);
    });
    socket.on('typing', (name) =>{
        socket.broadcast.emit('typing',name);
    });
});