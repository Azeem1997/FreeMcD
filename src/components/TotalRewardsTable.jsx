import React from 'react';
import PropTypes from 'prop-types';

const TotalRewardsTable = ({ totals }) => (
  <div className="container mt-4">
    <h4 className="text-warning mb-3">Total Rewards</h4>
    <table className="table table-bordered table-hover">
      <thead className="table-dark">
        <tr>
          <th>Customer Name</th>
          <th>Total Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {totals && totals.map((t, idx) => (
          <tr key={idx}>
            <td>{t.name}</td>
            <td>{t.totalPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

TotalRewardsTable.propTypes = {
  totals: PropTypes.array.isRequired,
};

export default TotalRewardsTable;
