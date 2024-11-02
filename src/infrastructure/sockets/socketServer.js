const { Server } = require('socket.io');
const TransactionController = require('../../application/controllers/TransactionController');
const WeatherController = require('../../application/controllers/WeatherController');
const NewsApiController = require('../../application/controllers/NewsApiController');

async function createSocketServer(server) {
  const io = new Server(server);
  const wController = await WeatherController.init({ io });
  const nController = await NewsApiController.init({ io })

  io.on('connection', socket => {
    wController.addClient(socket);
    nController.connect();
  });

  return { io, wController }
}

module.exports = createSocketServer;