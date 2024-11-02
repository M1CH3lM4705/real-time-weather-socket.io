require('dotenv').config();
const express = require('express');
const http = require('http');
const createSocketServer = require('../sockets/socketServer');
const PORT = 3000;
const path = require('path');
const app = express();

const server = http.createServer(app);

async function startServer() {
  try {

    const { io, wController } = await createSocketServer(server);

    app.use(express.static('public'));

    app.use((err, req, res, next) => {
      res.status(500).sendFile(path.join(__dirname, '../public/500.html'));
    })

    const PORT = process.env.PORT;
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    setInterval(() => wController.sendWeatherNotification(), 5 * 60 * 1000); // 5 * 60 * 1000
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

startServer();
