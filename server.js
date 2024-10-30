const WebSocket = require('ws');

//create websocket server listening on port 8080
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) =>{
    console.log('New User connected');


//Handle incoming message from client
ws.on('message',(message)=>{
    console.log(`Recieved message:${message}`);
// });//End of wss.on

//Handled broadcasting: when client sends message it broadcasts to all other connected clients so everyone in chat recieves messages
wss.clients.forEach((client=>{
    if(client !== ws && client.readyState ===WebSocket.OPEN){
        client.send(`User: ${message}`)
    }
}));

    //Send response message back to client
    ws.send(`Server says: You sent: ${message}`);
});
    //Handle client disconnection
    ws.on('close',()=>{
        console.log('User disconnected');
    });
});//closing connection
console.log('Chat server is listening on port 8080');