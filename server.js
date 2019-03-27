const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
var fs = require('fs');
const https = require('https');
var list;
fs.readFile('response/response.json', 'utf8', function (err, data) {
    if (err) throw err;
    list = JSON.parse(data);
});
app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'build'));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.enable("trust proxy");
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('build', options))

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*')
        // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader("Cache-Control", "public, max-age=100000000, must-revalidate");
    res.setHeader("Expires", new Date(Date.now() + 100000000).toUTCString());
        // Pass to next layer of middleware
//    if (req.secure) {
//    console.log("next");
//    	next();
//    } else {
//    console.log("redirect");
//    console.log('https://' + req.headers.host + req.url);
//    	res.redirect('https://' + req.headers.host + req.url);
//    }
next();
})
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build'));
});
app.set('port', (5000))
app.get('/getCharacterList', function (req, res) {
    res.json(list)
});

app.get('/getCharacterDeatils/:name', function (req, res) {
    const arr = req.params.name.split('-');
    const data = list.filter(function(item){ return item.character == arr[0]});
    res.json(data[0])
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'))
})

