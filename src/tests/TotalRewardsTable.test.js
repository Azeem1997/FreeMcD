import { render, screen } from "@testing-library/react";
import TotalRewardsTable from "../components/TotalRewardsTable";

test("renders Total Rewards heading", () => {
  render(<TotalRewardsTable data={[]} />);
  expect(screen.getByText(/Total Rewards/i)).toBeInTheDocument();
});
