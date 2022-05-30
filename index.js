
const fetch = require('node-fetch'); // for get and post requests
const express = require('express')
const app = express()
app.set('view engine', 'ejs');

const querystring = require("querystring");
const fs = require('fs');

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());
app.use(express.static('public'))



conbreak = a=> console.log("------------------")


app.listen(3000, () => console.log('server on port 3000'))








var ip= null
app.get('/', function(req, res) {
    let config = JSON.parse(fs.readFileSync('config.json'));
    console.log(config.presets)
    res.render('pages/index', {
        areas: [
            {preset: '1', coords:'3111,1026,3769,1531'},
            {preset: '2', coords:'3072,1650,4313,2398'},
            {preset: '3', coords:'1568,1072,2789,1822'}
        ]
    });
});
app.get('/config', (req, res) => {
    let config = JSON.parse(fs.readFileSync('config.json'));
    console.log(config.presets)

    let jslist = []
    for (preset in config.presets){
        jscript = '<area title="'+preset+'" onclick="zoneClicked(\''+preset+'\')" coords="'+config.presets[preset]+'" shape="rect"> \n'
        jslist += jscript
    } 
    ip = config.ip
    console.log(ip)
    console.log(jslist)
    res.json(jslist)

})
app.get('/zoneClicked', async (req, res) => {
    zone = querystring.parse(req.url)["/zoneClicked?zone"]
    console.log(zone)
    console.log("http://"+ip+"/cgi-bin/ptzctrl.cgi?ptzcmd&poscall&"+zone)
    res.json(zone)
})
