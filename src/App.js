import { useEffect, useState } from 'react';
import Tabs from './components/Tabs';
import './styles/skeleton.css';
import { fetchData } from './utils/fetchRewardsData';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [monthlyRewards, setMonthlyRewards] = useState([]);
  const [totalRewards, setTotalRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState('mockData1.json');

  useEffect(() => {
    const fetchDataAsync = async (selectedData) => {
      await fetchData(selectedData, setTransactions, setMonthlyRewards, setTotalRewards, setLoading, setError);
    };
    fetchDataAsync(selectedData);
  }, [selectedData]);

  const handleSelectChange = (e) => {
    setSelectedData(e.target.value);
  };

  if (error) return <div className="text-danger text-center mt-5">Error: {error}</div>;

  return (
    <div className="container">
      <h2 className="text-center mt-4 mb-4">Customer Reward Points Dashboard</h2>
      <div className="d-flex justify-content-center mb-4">
        <div className="form-group">
          <label htmlFor="dataSelector" className="form-label fw-bold">Select Dataset:</label>
          <select
            id="dataSelector"
            className="form-select"
            value={selectedData}
            onChange={handleSelectChange}
          >
            <option value="mockData1.json">Mock Data 1</option>
            <option value="mockData2.json">Mock Data 2</option>
            <option value="mockData3.json">Mock Data 3</option>
            <option value="mockData4.json">Mock Data 4</option>
            <option value="mockData5.json">Mock Data 5</option>
          </select>
        </div>
      </div>
      <Tabs
        transactions={transactions}
        rewards={monthlyRewards}
        totals={totalRewards}
        loading={loading}
      />
    </div>
  );
}
