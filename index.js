const express = require('express');
const bodyParser= require('body-parser');
// const cors =require('cors');
// const helmet =require('helmet');





const port =4500;


const app=express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('Welcome to my chat server');
});
app.get('/webhook', (req, res) => {
    let verifyToken = "EmmanuelBassey460";
    let mode = req.query['hub.mode'];
    let token =req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    if(mode && token){
        if (mode === 'subscribe' && token === verifyToken) {
            console.log('Yay! Our webhook is verified');
            res.status(200).send(challenge);;
        }else{
            res.sendStatus(403);
        }
    }
    
});
app.post('/webhook', (req, res) => {
    let body = req.body;
    if(body.object === 'page'){
        body.entry.forEach(entry => {
            let webhookEvent = entry.messaging[0];
            console.log(webhookEvent);
        });
        res.status(200).send('EVENT_RECIEVED');
    }else{
        res.sendStatus(404);
    }
    
});

app.listen(port, () => {
    console.log('Chat Server started on port', port);
});