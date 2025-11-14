import TableWrapperHOC from './TableWrapperHOC';

/**
 * TransactionTable - Displays individual transactions with details
 * 
 * Renders a table of all transactions including:
 * - Transaction ID
 * - Customer ID and Name
 * - Purchase Date
 * - Product Purchased
 * - Price (formatted to 2 decimal places)
 * - Calculated Reward Points
 * 
 * Supports sorting, filtering, and pagination through TableWrapperHOC.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array<Object>} props.transactions - Array of transaction objects
 * @param {string} props.transactions[].transactionId - Unique transaction identifier
 * @param {string} props.transactions[].customerId - Customer identifier
 * @param {string} props.transactions[].customerName - Customer name
 * @param {string} props.transactions[].purchaseDate - ISO formatted date string
 * @param {string} props.transactions[].productPurchased - Product name
 * @param {number} props.transactions[].price - Purchase price
       * Renders purchase date in localized format
       * @param {Object} row - The transaction row
       * @returns {string} Formatted date or 'N/A'
       * * Renders price with 2 decimal places
       * @param {Object} row - The transaction row
       * @returns {string} Formatted price
 * @param {number} props.transactions[].rewardPoints - Calculated reward points
 * @param {boolean} props.loading - Loading state indicator
 * @returns {React.ReactElement} Transaction table wrapped with sorting/filtering/pagination
 */
const TransactionsTable = ({ transactions, loading }) => {
  const columns = [
    { field: 'transactionId', headerName: 'Transaction ID' },
    { field: 'customerId', headerName: 'Customer ID' },
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
