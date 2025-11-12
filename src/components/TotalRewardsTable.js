import TableWrapperHOC from './TableWrapperHOC';

const TotalRewardsTable = ({ totals, loading }) => {
  const columns = [
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

