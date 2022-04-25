const p = require('./helpers');
const http = require('http');
const path = require('path');
const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
const cron = require("node-cron");



const app = express();
app.use(cors());

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.post("/api", (req, res) => {
    console.log(req.body);
    p.add(req.body);
    res.json({ message: "Success"});
});

app.get("/api", (req, res) => {
    p.getLine().then((value) => {
        res.json({ "line": value });
    })
});

app.get('*', (req, res) => {
    res.sendFile(path.join('public', 'index.html'));
})

cron.schedule('0 0 0 * * *', () => {
    console.log('--------------------');
    console.log('Running Cron Job');
    p.delete();
    console.log('Done');
    console.log("--------------------")
});


const PORT = process.env.PORT;
http.createServer(app).listen(PORT);
