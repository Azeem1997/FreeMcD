import React from 'react';
import PropTypes from 'prop-types';

const TotalRewardsTable = ({ totals, loading }) => (
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
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
              <td colSpan="5">
                <div className="skeleton-row"></div>
              </td>
            </tr>
          ))
        ) : totals && totals.length > 0 ? totals.map((t, idx) => (
          <tr key={idx}>
            <td>{t.name}</td>
            <td>{t.totalPoints}</td>
          </tr>
        )) : (
          <tr>
            <td colSpan="5" className="text-center text-muted">
              No reward points data available.
            </td>
          </tr>
        )}
        
      </tbody>
    </table>
  </div>
);

TotalRewardsTable.propTypes = {
  totals: PropTypes.array.isRequired,
  loading: PropTypes.bool
};

export default TotalRewardsTable;
 