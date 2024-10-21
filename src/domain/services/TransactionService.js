const transactions = require('../../data/transaction.json');
const Transaction = require('../entities/Transaction');

class TransactionService {
  static generateNewTransaction() {
    const newTransaction = new Transaction({
      amount: Math.floor(Math.random() * 1000),
      type: Math.random() > 0.5 ? 'credit' : 'debit'
    });

    transactions.push(newTransaction);
    return transactions;
  }

  static getAllTransaction() {
    return transactions;
  }
}

module.exports = TransactionService;