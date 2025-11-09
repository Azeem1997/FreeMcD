import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './skeleton.css'; // We'll create this small CSS file next

const MonthlyRewardsTable = ({ rewards, loading }) => (
  <div className="container mt-4">
    <h4 className="text-success mb-3">User Monthly Rewards</h4>

    <table className="table table-bordered table-hover">
      <thead className="table-dark">
        <tr>
          <th>Customer ID</th>
          <th>Name</th>
          <th>Month</th>
          <th>Year</th>
          <th>Reward Points</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          // Skeleton loader rows
          Array.from({ length: 4 }).map((_, i) => (
            <tr key={i}>
              <td colSpan="5">
                <div className="skeleton-row"></div>
              </td>
            </tr>
          ))
        ) : rewards && rewards.length > 0 ? (
          rewards.map((r, idx) => (
            <tr key={idx}>
              <td>{r.customerId}</td>
              <td>{r.name}</td>
              <td>{r.month}</td>
              <td>{r.year}</td>
              <td>{r.points}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center text-muted">
              No rewards data available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

MonthlyRewardsTable.propTypes = {
  rewards: PropTypes.array,
  loading: PropTypes.bool
};

export default MonthlyRewardsTable;
