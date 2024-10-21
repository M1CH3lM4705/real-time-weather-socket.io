const TransactionService = require('../../domain/services/TransactionService');

class TransactionController {
  constructor(io) {
    this.io = io;
    this.connectedClients = {};
  }

  static init({ io }) {
    const controller = new TransactionController(io);
    return controller;
  }

  addClient(socket) {
    this.connectedClients[socket.id] = { receiveNotification: true };
    socket.emit('updateTransactions', TransactionService.getAllTransaction());

    socket.on('stopTransactions', stop =>
      this.connectedClients[socket.id].receiveNotification = !stop);

    socket.on('disconnect', () => delete this.connectedClients[socket.id]);
  }

  sendFinanceNotification() {
    const transactions = TransactionService.generateNewTransaction();
    for (const socketId in this.connectedClients) {
      if (this.connectedClients[socketId].receiveNotification) {
        this.io.to(socketId).emit('updateTransactions', transactions);
      }
    }
  }
}

module.exports = TransactionController;