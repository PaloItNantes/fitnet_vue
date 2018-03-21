const express = require('express')
const router = express.Router()
var httpProxy = require('http-proxy');
var proxy = require('http-proxy-middleware');


const app = express()
var port = 3000;

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

router.get('/*', (req, res, next) => {
    res.sendFile(`${__dirname}/dist/index.html`)
})
app.use('/', router)

app.listen(port)

console.log('App running on port', port)