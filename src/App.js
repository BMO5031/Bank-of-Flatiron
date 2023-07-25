import React, { useState, useEffect } from 'react';
import TransactionsTable from './TransactionsTable';
import TransactionForm from './TransactionForm';
import SearchBar from './SearchBar';
import axios from 'axios';
import './styles.css'; // Import the custom styles


const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Add a new transaction to the table
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  // Filter transactions based on the search term
  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort transactions by category or description
  const sortTransactions = (key) => {
    const sortedTransactions = [...transactions].sort((a, b) =>
      a[key].localeCompare(b[key])
    );
    setTransactions(sortedTransactions);
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);
  };

  return (
    <div>
      <h1>Bank Transactions</h1>
      <TransactionForm addTransaction={addTransaction} />
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <button onClick={() => sortTransactions('category')}>
        Sort by Category
      </button>
      <button onClick={() => sortTransactions('description')}>
        Sort by Description
      </button>
      <TransactionsTable
        transactions={filteredTransactions}
        deleteTransaction={deleteTransaction}
      />
    </div>
  );
};

export default App;
