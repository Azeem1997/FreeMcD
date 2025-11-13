import { render, screen, fireEvent } from "@testing-library/react";
import DashboardTabs from "../components/DashboardTabs";

describe("DashboardTabs Component", () => {
  test("renders tabs and switches correctly", () => {
    render(<DashboardTabs />);
    const totalTab = screen.getByText(/Total Rewards/i);
    const monthlyTab = screen.getByText(/Monthly Rewards/i);
    expect(totalTab).toBeInTheDocument();
    expect(monthlyTab).toBeInTheDocument();

    fireEvent.click(monthlyTab);
    expect(screen.getByText(/Monthly Rewards/i)).toBeInTheDocument();
  });
});
