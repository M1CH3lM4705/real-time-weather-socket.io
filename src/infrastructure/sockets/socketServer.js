const { Server } = require('socket.io');
const TransactionController = require('../../application/controllers/TransactionController');
const WeatherController = require('../../application/controllers/WeatherController');

async function createSocketServer(server) {
  const io = new Server(server);
  const controller = await WeatherController.init({ io });

  io.on('connection', socket => controller.addClient(socket));

  return { io, controller }
}

module.exports = createSocketServer;