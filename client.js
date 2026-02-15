// const websockets = require('ws');
import  WebSocket from 'ws';
// const readline = require('readline');
import readline from 'node:readline';

const rl = readline.createInterface({
    input : process.stdin,
    output: process.stdout
});


const wscon = new websockets('ws://localhost:8080');


wscon.on('open', ()=>{
    console.log('connected to server');
    promptForMessage();
})


wscon.on('message', (message)=>{
    console.log(message);
})
wscon.on('error', (error)=>{
    console.log("disconnected from server")
    process.exit(0);
})



function promptForMessage(){
    rl.question("enter a message or type exit to quit", (message)=>{
        if(message.toLowerCase() == "exit"){
            wscon.close();
            rl.close();
            return;
        }

        wscon.send(message);
        promptForMessage();

    })
}