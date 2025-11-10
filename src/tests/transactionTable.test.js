import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import TransactionsTable from "../components/TransactionTable";

test("renders transactions with reward points", () => {
  const transactions = [
    {
      transactionId: "T001",
      customerName: "Jane",
      productPurchased: "TV",
      purchaseDate: "2024-02-10",
      price: 200,
      rewardPoints: 250,
    },
  ];

  render(<TransactionsTable transactions={transactions} />);
  expect(screen.getByText("Jane")).toBeInTheDocument();
  expect(screen.getByText("TV")).toBeInTheDocument();
  expect(screen.getByText("250")).toBeInTheDocument();
});
