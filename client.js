//Establish websocket connection
const socket = new WebSocket('ws://localhost:8080');
//Listen for connection opening
socket.addEventListener('open',()=>{
    console.log('Connected to Chat server');
});
//Listen for incoming messages
socket.addEventListener('message',(event)=>{
    const messagesDiv = document.getElementById('messages');
    const message = document.createElement('div');//create New div for Incoming message

    message.textContent = event.data;
    messagesDiv.append(message);//appending new message to message div
    //auto scroll to the bottom when new message arrives
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    console.log(`Message from server:${event.data}`);
 document.getElementById('output').textContent =+ `Server: ${event.data}\n`
});
//Send a message to the server when the send message button is clicked
document.getElementById('sendMessage').addEventListener('click',()=>{
    const message = document.getElementById('messageInput');
    // const messageBox = message.value;
    console.log(`Message to send: ${message}`);
    //Check if message is not empty
    if(messageInput !==''){
        socket.send(messageInput.value);//both post simultaniously(create same instance as server side or utilize one of the 2 messageInputs vs having a name and message{client___ + server___})
        if(messageInput2 !== ''){                       socket.send(`:${messageInput2.value}`);
        messageInput2.value ='';//clear input field after send button clicked
        
    }
        console.log(`Sent message:${message}`);
        //clear input field after sending 
        messageInput.value = '';
        setTimeout(()=>{
            document.getElementById('output').textContent ='';
            reload();
        },1000);
    }else{
        console.log('Message is empty or null');
    }
//clears the message box conversation upon clicking RESET button
//NOT WORKING
document.getElementById('reset').addEventListener('click',()=>{
    document.getElementById('output').textContent ='';
    window.location.reload();
});
       
});
//Handle WebSocket closure
socket.addEventListener('close',()=>{
    console.log('Disconnected from Chat server');
});