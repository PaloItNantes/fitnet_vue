const express = require('express')
var httpProxy = require('http-proxy');
var proxy = require('http-proxy-middleware');
var https = require('https');
var fs = require('fs');
const router = express.Router();

//Création des deux serveurs express
const app = express();

//A commenter lorsque l'on veut tester en local
var httpsOptions = {
    //PROD
    key: fs.readFileSync('/usr/src/app/ssh/paloUbuntu-key.pem'),
    cert: fs.readFileSync('/usr/src/app/ssh/paloUbuntu-cert.pem')

    //Test
    // key: fs.readFileSync('key.pem'),
    // cert: fs.readFileSync('cert.pem')
};

//Utilisation d'un proxy pour la récupération des données
app.use('/fitnet', proxy({
    target: 'https://palo-it.fitnetmanager.com',
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

https.createServer(httpsOptions, app).listen(app.get('port'));