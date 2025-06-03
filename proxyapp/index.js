const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
var cookieParser = require('cookie-parser')

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173',
        'http://127.0.0.1:5173'],
    credentials: true,
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'X-Requested-With',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Credentials'
    ]
}))


require('./routes/user.routes')(app);
const onProxyReq = (proxyReq, req, res) => {
    const token = req.cookies.session;
    if (token) {
        proxyReq.setHeader('Authorization', 'Bearer ' + token);
    }
    if (req.body && Object.keys(req.body).length) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
};

app.use('/webproxy',
    createProxyMiddleware({
        target: 'http://127.0.0.1:8000/api/',
        changeOrigin: true,
        pathRewrite: (path, req) => {
            return path.replace('/webproxy', '');
        },
        on: {
            proxyReq: onProxyReq
        }
    })
);

app.listen(3000);