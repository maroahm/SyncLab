import express from 'express';

import cors from 'cors';
const app = express();
// const PORT = 4000;


// app.use(cors());
// app.use(express.json());


// app.post('/api/message', (req, res) =>{
    
//     const message = req.body.message || "";

//     console.log('recieved');
    
//      res.json({ 
//         status: 'success', 
//         reply: message
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

import {WebSocketServer} from 'ws';


const myHttpServer = app.listen(4000);

const wscon = new WebSocketServer({server: myHttpServer});


wscon.on('connection', (ws) =>{
    console.log('new connection established');


    ws.on('message' , (rawdata) =>{
        const message = rawdata.toString();
    console.log(`server recived ${message}`);
        wscon.clients.forEach((client) => {
            if(client.readyState == 1){
                client.send(message);
            }
        });
        // wscon.send(message);
    });
    ws.on('close', ()=>{
        console.log('client disconnected');
    });

});