import { useEffect, useState, useMemo } from "react";
import DashboardTabs from "../components/DashboardTabs";
import FilterBar from "../components/FilterBar";
import { fetchData } from "../utils/fetchRewardsData";
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AIAssistant from "./AiAssistant";

/**
 * Dashboard - Main data management and UI orchestration component
 * 
 * Responsible for:
 * - Fetching and loading transaction data from mock data files
 * - Managing application state for transactions, monthly rewards, and total rewards
 * - Providing filtering capabilities for transactions by customer name, product, and date range
 * - Rendering the complete dashboard with tabs for different data views
 * - Integrating the AI assistant for insights
 * 
 * @component
 * @returns {React.ReactElement} The dashboard UI with data visualization and filtering
 * 
 * @example
 * // In App.js
 * import Dashboard from './components/Dashboard';
 * export default function App() {
 *   return <Dashboard />;
 * }
 */
export default function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [monthlyRewards, setMonthlyRewards] = useState([]);
    const [totalRewards, setTotalRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});
    const selectedData = "mockData1.json";

    useEffect(() => {
        const fetchDataAsync = (selectedData) => {
            fetchData(
                selectedData,
                setTransactions,
                setMonthlyRewards,
                setTotalRewards,
                setLoading,
                setError
            );
        };
        fetchDataAsync(selectedData);
    }, [selectedData]);

    const handleFilter = (filterValues) => {
        setFilters(filterValues);
    };

    /**
     * Resets all applied filters
     */
    const handleReset = () => {
        setFilters({});
    };

    /**
     * Memoized filtered transactions based on current filter state
     * Filters by:
     * - Customer name (case-insensitive partial match)
     * - Product (case-insensitive partial match)
     * - Purchase date range (from and to dates)
     */
    const filteredTransactions = useMemo(() => {
        return transactions.filter((row) => {
            const nameMatch = filters.name
                ? row.customerName.toLowerCase().includes(filters.name.toLowerCase())
                : true;

            const productMatch = filters.product
                ? row.productPurchased.toLowerCase().includes(filters.product.toLowerCase())
                : true;

            const fromMatch = filters.fromDate
                ? dayjs(row.purchaseDate).isAfter(dayjs(filters.fromDate).subtract(1, "day"))
                : true;

            const toMatch = filters.toDate
                ? dayjs(row.purchaseDate).isBefore(dayjs(filters.toDate).add(1, "day"))
                : true;

            return nameMatch && productMatch && fromMatch && toMatch;
        });
    }, [transactions, filters]);

    if (error)
        return <div className="text-danger text-center mt-5">Error: {error}</div>;

    return (
        <div className="container">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <h2 className="text-center mt-4 mb-4">Customer Reward Points Dashboard</h2>

                <FilterBar onFilter={handleFilter} onReset={handleReset} />

                <DashboardTabs
                    transactions={filteredTransactions}
                    rewards={monthlyRewards}
                    totals={totalRewards}
                    loading={loading}
                />

                <AIAssistant transactions={filteredTransactions} />
            </LocalizationProvider>
        </div>
    );
}
