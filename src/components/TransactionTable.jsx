import React from 'react';
import PropTypes from 'prop-types';

const TransactionsTable = ({ transactions }) => {
  return (
    <div className="container mt-4">
      <h4 className="text-primary mb-3">Transactions</h4>
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Transaction ID</th>
            <th>Customer Name</th>
            <th>Purchase Date</th>
            <th>Product Purchased</th>
            <th>Price ($)</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.map((txn) => (
            <tr key={txn.transactionId}>
              <td>{txn.transactionId}</td>
              <td>{txn.customerName}</td>
              <td>{new Date(txn.purchaseDate).toLocaleDateString() === "Invalid Date" ? "N/A" : new Date(txn.purchaseDate).toLocaleDateString()}</td>
              <td>{txn.productPurchased}</td>
              <td>{txn.price.toFixed(2)}</td>
              <td>{txn.rewardPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TransactionsTable.propTypes = {
  transactions: PropTypes.array.isRequired,
};

export default TransactionsTable;
