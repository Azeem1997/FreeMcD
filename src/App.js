import { useEffect, useState } from 'react';
import { calculateRewardPoints } from './utils/calculatePoints';
import Tabs from './components/Tabs';
import axios from 'axios';

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [monthlyRewards, setMonthlyRewards] = useState([]);
  const [totalRewards, setTotalRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState('mockData1.json');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/${selectedData}`);
        if (!response.data) throw new Error('Failed to fetch data');

        const txns = response.data
          .filter(t => t && t.price && !isNaN(t.price))
          .map(txn => ({
            ...txn,
            rewardPoints: calculateRewardPoints(Number(txn.price))
          }));
        setTransactions(txns);

        // Aggregate monthly rewards
        const monthly = txns ? txns.reduce((acc, t) => {
          const date = new Date(t.purchaseDate);
          if (isNaN(date)) return acc;
          const month = date.toLocaleString('default', { month: 'long' });
          const year = date.getFullYear();
          const key = `${t.customerId}-${month}-${year}`;

          if (!acc[key]) {
            acc[key] = {
              customerId: t.customerId,
              name: t.customerName,
              month,
              year,
              points: 0,
            };
          }
          acc[key].points += t.rewardPoints;
          return acc;
        }, {}) : {};
        setMonthlyRewards(Object.values(monthly));

        // Aggregate total rewards
        const total = txns && txns.reduce((acc, t) => {
          acc[t.customerName] = (acc[t.customerName] || 0) + t.rewardPoints;
          return acc;
        }, {});
        const totalArr = total ? Object.entries(total).map(([name, totalPoints]) => ({
          name,
          totalPoints,
        })) : [];
        setTotalRewards(totalArr);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
