import TableWrapperHOC from './TableWrapperHOC';

/**
 * MonthlyRewardsTable - Displays aggregated rewards by customer and month
 * 
 * Renders a table showing reward points earned by each customer for each month,
 * allowing users to track reward accumulation trends over time.
 * 
 * Supports sorting, filtering, and pagination through TableWrapperHOC.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.rewards - Array of monthly reward objects
 * @param {string} props.rewards[].customerId - Customer identifier
 * @param {string} props.rewards[].name - Customer name
 * @param {string} props.rewards[].monthYear - Month and year in "Month Year" format
 * @param {number} props.rewards[].points - Reward points earned that month
 * @param {boolean} props.loading - Loading state indicator
 * @returns {React.ReactElement} Monthly rewards table wrapped with sorting/filtering/pagination
 */
const MonthlyRewardsTable = ({ rewards, loading }) => {
  const columns = [
    { field: 'customerId', headerName: 'Customer ID' },
    { field: 'name', headerName: 'Customer Name' },
    { field: 'monthYear', headerName: 'Month-Year' },
    { field: 'points', headerName: 'Reward Points' },
  ];

  return (
    <TableWrapperHOC
      title="User Monthly Rewards"
      colorClass="success"
      columns={columns}
      data={rewards}
      loading={loading}
    />
  );
};

export default MonthlyRewardsTable;
