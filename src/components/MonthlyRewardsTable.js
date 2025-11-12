import TableWrapperHOC from './TableWrapperHOC';

const MonthlyRewardsTable = ({ rewards, loading }) => {
  const columns = [
    { field: 'customerId', headerName: 'Customer ID' },
    { field: 'name', headerName: 'Name' },
    { field: 'month', headerName: 'Month' },
    { field: 'year', headerName: 'Year' },
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
