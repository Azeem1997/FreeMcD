import TableWrapperHOC from './TableWrapperHOC';

/**
 * TotalRewardsTable - Displays total accumulated rewards per customer
 * 
 * Renders a table showing the total reward points each customer has earned
 * across all transactions, providing an overview of customer loyalty value.
 * 
 * Supports sorting, filtering, and pagination through TableWrapperHOC.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.totals - Array of total reward objects
 * @param {string} props.totals[].customerId - Customer identifier
 * @param {string} props.totals[].name - Customer name
 * @param {number} props.totals[].totalPoints - Total accumulated reward points
 * @param {boolean} props.loading - Loading state indicator
 * @returns {React.ReactElement} Total rewards table wrapped with sorting/filtering/pagination
 */
const TotalRewardsTable = ({ totals, loading }) => {
  const columns = [
    { field: 'customerId', headerName: 'Customer ID' },
    { field: 'name', headerName: 'Customer Name' },
    { field: 'totalPoints', headerName: 'Total Reward Points' },
  ];

  return (
    <TableWrapperHOC
      title="Total Rewards"
      color="warning"
      columns={columns}
      data={totals}
      loading={loading}
    />
  );
};

export default TotalRewardsTable;

