import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "../components/Dashboard";
import { fetchData } from "../utils/fetchRewardsData";

jest.mock("../components/DashboardTabs", () => jest.fn(() => <div>MockDashboardTabs</div>));
jest.mock("../components/FilterBar", () => jest.fn(({ onFilter, onReset }) => (
    <div>
        <button onClick={() => onFilter({ name: "john", product: "laptop" })}>Apply Filter</button>
        <button onClick={onReset}>Reset</button>
    </div>
)));
jest.mock("../components/AiAssistant", () => jest.fn(() => <div>MockAIAssistant</div>));
jest.mock("../utils/fetchRewardsData", () => ({
    fetchData: jest.fn(),
}));

jest.mock("dayjs", () => {
    const actual = jest.requireActual("dayjs");
    const mockFn = jest.fn((input) => actual(input));
    mockFn.isAfter = jest.fn(() => true);
    mockFn.isBefore = jest.fn(() => true);
    mockFn.subtract = jest.fn(() => mockFn);
    mockFn.add = jest.fn(() => mockFn);
    return Object.assign(mockFn, actual);
});

describe("Dashboard Component", () => {
    const mockTransactions = [
        {
            customerName: "John Doe",
            productPurchased: "Laptop",
            purchaseDate: "2023-10-10",
        },
        {
            customerName: "Alice",
            productPurchased: "Phone",
            purchaseDate: "2023-10-12",
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders Dashboard and fetches data successfully", async () => {
        fetchData.mockImplementation(async (
            selectedData,
            setTransactions,
            setMonthlyRewards,
            setTotalRewards,
            setLoading,
            setError
        ) => {
            setTransactions(mockTransactions);
            setMonthlyRewards([{ month: "Oct", rewards: 200 }]);
            setTotalRewards([{ total: 500 }]);
            setLoading(false);
            setError(null);
        });

        render(<Dashboard />);

        expect(screen.getByText("Customer Reward Points Dashboard")).toBeInTheDocument();
        expect(fetchData).toHaveBeenCalledTimes(1);

        await waitFor(() => {
            expect(screen.getByText("MockDashboardTabs")).toBeInTheDocument();
            expect(screen.getByText("MockAIAssistant")).toBeInTheDocument();
        });
    });

    test("handles error state correctly", async () => {
        fetchData.mockImplementation(async (
            selectedData,
            setTransactions,
            setMonthlyRewards,
            setTotalRewards,
            setLoading,
            setError
        ) => {
            setError("Network Error");
            setLoading(false);
        });

        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.getByText(/Error:/)).toHaveTextContent("Error: Network Error");
        });
    });

    test("applies filter and reset correctly", async () => {
        fetchData.mockImplementation(async (
            selectedData,
            setTransactions,
            setMonthlyRewards,
            setTotalRewards,
            setLoading,
            setError
        ) => {
            setTransactions(mockTransactions);
            setMonthlyRewards([]);
            setTotalRewards([]);
            setLoading(false);
            setError(null);
        });

        render(<Dashboard />);

        await waitFor(() => {
            expect(screen.getByText("MockDashboardTabs")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText("Apply Filter"));
        fireEvent.click(screen.getByText("Reset"));
    });
});
