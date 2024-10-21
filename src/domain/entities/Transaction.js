class Transaction {
  constructor({ id, amount, type, date }) {
    this.id = id || Date.now();
    this.amount = amount;
    this.type = type;
    this.date = date || new Date().toISOString();
  }
}

module.exports = Transaction;