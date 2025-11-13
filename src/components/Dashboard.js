import { useEffect, useState, useMemo } from "react";
import DashboardTabs from "../components/DashboardTabs";
import FilterBar from "../components/FilterBar";
import { fetchData } from "../utils/fetchRewardsData";
import dayjs from "dayjs";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AIAssistant from "./AiAssistant";

export default function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [monthlyRewards, setMonthlyRewards] = useState([]);
    const [totalRewards, setTotalRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});
    const selectedData = "mockData1.json";

    useEffect(() => {
        const fetchDataAsync = async (selectedData) => {
            await fetchData(
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

    const handleReset = () => {
        setFilters({});
    };

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
