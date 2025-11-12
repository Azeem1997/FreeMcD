import TableWrapperHOC from './TableWrapperHOC';

const TransactionsTable = ({ transactions, loading }) => {
  const columns = [
    { field: 'transactionId', headerName: 'Transaction ID' },
    { field: 'customerName', headerName: 'Customer Name' },
    {
      field: 'purchaseDate',
      headerName: 'Purchase Date',
      render: (row) => {
        const date = new Date(row.purchaseDate);
        return isNaN(date) ? 'N/A' : date.toLocaleDateString('en-US');
      },
    },
    { field: 'productPurchased', headerName: 'Product Purchased' },
    { field: 'price', headerName: 'Price ($)', render: (row) => row.price?.toFixed(2) },
    { field: 'rewardPoints', headerName: 'Reward Points' },
  ];

  return (
    <TableWrapperHOC
      title="User Transactions"
      color="primary"
      columns={columns}
      data={transactions}
      loading={loading}
    />
  );
};

export default TransactionsTable;
