import axios from "axios";
import { calculateRewardPoints } from "./calculatePoints";
import { v4 as uuidv4 } from 'uuid';

/**
 * Fetches mock transaction data from a JSON file
 * 
 * Makes an HTTP GET request to retrieve mock data files (e.g., /mockData1.json)
 * from the public directory.
 * 
 * @async
 * @function
 * @param {string} selectedData - The filename to fetch (e.g., "mockData1.json")
 * @returns {Promise<Array<Object>>} Promise that resolves with the transaction data array
 * @throws {string} Rejects with error message if no data found or request fails
 * 
 * @private
 */

/**
 * Fetches and processes rewards data with state management
 * 
 * Orchestrates the complete data loading pipeline:
 * 1. Fetches mock data from JSON file
 * 2. Enriches transactions with reward points calculation and unique IDs
 * 3. Aggregates data into monthly and total reward views
 * 4. Updates component state with processed data
 * 5. Handles errors and loading states
 * 
 * @function
 * @param {string} selectedData - The mock data filename to load (e.g., "mockData1.json")
 * @param {Function} setTransactions - State setter for raw transaction data
 * @param {Function} setMonthlyRewards - State setter for monthly aggregated rewards
 * @param {Function} setTotalRewards - State setter for total rewards per customer
 * @param {Function} setLoading - State setter for loading status
 * @param {Function} setError - State setter for error messages
 * 
 * @returns {void}
 * 
 * @example
 * const [transactions, setTransactions] = useState([]);
 * const [monthlyRewards, setMonthlyRewards] = useState([]);
 * const [totalRewards, setTotalRewards] = useState([]);
 * const [loading, setLoading] = useState(false);
 * const [error, setError] = useState(null);
 * 
 * fetchData('mockData1.json', setTransactions, setMonthlyRewards, setTotalRewards, setLoading, setError);
 */


function fetchMockData(selectedData) {
  return new Promise((resolve, reject) => {
    axios.get(`/${selectedData}`)
      .then(res => {
        if (!res.data) reject("No data found");
        else resolve(res.data);
      })
      .catch(err => reject(err));
  });
}

export function fetchData(selectedData, setTransactions, setMonthlyRewards, setTotalRewards, setLoading, setError) {

  setTotalRewards([]);
  setMonthlyRewards([]);
  setTransactions([]);
  setLoading(true);

  fetchMockData(selectedData)
    .then((data) => {

      return new Promise((resolve) =>
        setTimeout(() => resolve(data), 1000)
      );
    })
    .then((data) => {
      /**
       * Transform raw transaction data:
       * - Filter out invalid entries (missing or non-numeric price)
       * - Add calculated reward points for each transaction
       * - Add unique ID to each transaction
       */
      const txns = data
        .filter(t => t && t.price && !isNaN(t.price))
        .map(txn => ({
          ...txn,
          rewardPoints: calculateRewardPoints(Number(txn.price)),
          _id: uuidv4(),
        }));
      setTransactions(txns);

        // Aggregate monthly rewards
        const monthly = txns ? txns.reduce((acc, t) => {
        const date = new Date(t.purchaseDate);
        if (isNaN(date)) return acc;

        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        const key = `${t.customerId}-${month}-${year}`;

        if (!acc[key]) {
          acc[key] = {
            customerId: t.customerId,
            name: t.customerName,
            monthYear: `${month} ${year}`,
            points: 0,
          };
        }
        acc[key].points += t.rewardPoints;
        return acc;
        }, {}) : {};
      setMonthlyRewards(Object.values(monthly));

      const total = txns.reduce((acc, t) => {
        const key = t.customerId;

        if (!acc[key]) {
          acc[key] = {
            customerId: t.customerId,
            name: t.customerName,
            totalPoints: 0,
          };
        }

        acc[key].totalPoints += t.rewardPoints;
        return acc;
      }, {});

      setTotalRewards(Object.values(total));
    })

    .catch((err) => {
      setError(err?.message || "Error fetching data");
    })

    .finally(() => {
      setLoading(false);
    });
}