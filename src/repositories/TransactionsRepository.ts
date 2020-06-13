import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (accumulated, transaction) =>
        transaction.type === 'income'
          ? accumulated + transaction.value
          : accumulated,
      0,
    );
    const outcome = this.transactions.reduce(
      (accumulated, transaction) =>
        transaction.type === 'outcome'
          ? accumulated + transaction.value
          : accumulated,
      0,
    );
    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create({ title, type, value }: Request): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
