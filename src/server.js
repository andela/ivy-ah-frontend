// server.js
const express = require('express');
const path = require('path');

const port = process.env.PORT || 2019;
const app = express();

// the __dirname is the current directory from where the script is running

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.use(require('prerender-node').set('prerenderServiceUrl', 'https://service.prerender.io/').set('prerenderToken', 'QW3cj98BGoKzV8C4GSdH'));

app.get('/ping', (req, res) => res.send('pong'));
app.get('/:path', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', req.params.path));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(port);
