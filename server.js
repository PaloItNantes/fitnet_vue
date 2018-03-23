const express = require('express')
var httpProxy = require('http-proxy');
var proxy = require('http-proxy-middleware');
// var http = require('http');
var https = require('https');
var fs = require('fs');
const router = express.Router()

//Création des deux serveurs express
const app = express()
var httpApp = express();

//Configuration https
var key = fs.readFileSync('fitnet.key');
var cert = fs.readFileSync('fitnet.crt');

var httpsOptions = {
    key: key,
    cert: cert
};

//Redirection des requêtes http vers https
// httpApp.set('port', 80);
// httpApp.get("*", function(req, res, next) {
//     res.redirect("https://" + req.headers.host + "/" + req.path);
// });

//Utilisation d'un proxy pour la récupération des données
app.use('/fitnet', proxy({
    target: 'https://evaluation.fitnetmanager.com',
    changeOrigin: true,
    pathRewrite: {
        '^/fitnet': ''
    }
}));

app.use(express.static(`${__dirname}/dist`)) // set the static files location for the static html

app.engine('.html', require('ejs').renderFile)

app.set('views', `${__dirname}/dist`)

app.set('port', 443);

router.get('/*', (req, res, next) => {
    res.sendFile(`${__dirname}/dist/index.html`)
})
app.use('/', router)

//http.createServer(httpApp).listen(httpApp.get('port'));
https.createServer(httpsOptions, app).listen(app.get('port'));