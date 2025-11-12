import axios from "axios";
import { calculateRewardPoints } from "./calculatePoints";
import { v4 as uuidv4 } from 'uuid';

export const fetchData = async (selectedData, setTransactions, setMonthlyRewards, setTotalRewards, setLoading, setError) => {
      try {
        setTotalRewards([]);setMonthlyRewards([]);setTransactions([]);setLoading(true);
        const response = await axios.get(`/${selectedData}`);
        if (!response.data) throw new Error('Failed to fetch data');
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await delay(1000);
        const txns = response.data
          .filter(t => t && t.price && !isNaN(t.price))
          .map(txn => ({
            ...txn,
            rewardPoints: calculateRewardPoints(Number(txn.price)),
            _id: uuidv4()
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