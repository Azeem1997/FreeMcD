import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import MonthlyRewardsTable from "../components/MonthlyRewardsTable";

describe("MonthlyRewardsTable", () => {
  test("renders table headers correctly", () => {
    render(<MonthlyRewardsTable rewards={[]} />);
    expect(screen.getByText("Customer ID")).toBeInTheDocument();
    expect(screen.getByText("Reward Points")).toBeInTheDocument();
  });

  test("renders data rows correctly", () => {
    const rewards = [
      { customerId: "C001", name: "John", month: "January", year: 2024, points: 90 },
    ];
    render(<MonthlyRewardsTable rewards={rewards} />);
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();
  });
});
