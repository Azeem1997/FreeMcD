/**
 * Calculates reward points based on a purchase price
 * 
 * Implements the reward tier system:
 * - $0-50: 0 points
 * - $50-100: 1 per dollar (price - 50)
 * - $100+: Base 50 points + 2 per dollar above $100
 * 
 * @function
 * @param {number} price - The purchase price in dollars
 * @returns {number} The calculated reward points (floored integer)
 * @example
 * calculateRewardPoints(75);   // Returns 25 (75 - 50)
 * calculateRewardPoints(150);  // Returns 150 (50 + (150-100)*2)
 */

/**
 * Aggregates transactions into monthly rewards by customer
 * 
 * Groups transactions by customerId, month, and year, summing up reward points
 * for each combination. Returns an array of monthly reward aggregates.
 * 
 * @function
 * @param {Array<Object>} transactions - Array of transaction objects
 * @param {number} transactions[].customerId - Customer identifier
 * @param {string} transactions[].customerName - Customer name
 * @param {string} transactions[].purchaseDate - Date of purchase (ISO string or valid date format)
 * @param {number} transactions[].price - Purchase price
 * @returns {Array<Object>} Array of monthly reward objects with structure:
 *   - {number} customerId - Customer identifier
 *   - {string} name - Customer name
 *   - {string} month - Month name (e.g., "January")
 *   - {number} year - Year of transaction
 *   - {number} rewardPoints - Total points for that month
 */

/**
 * Aggregates monthly rewards into total rewards per customer
 * 
 * Sums up all reward points for each customer across all months.
 * 
 * @function
 * @param {Array<Object>} monthlyRewards - Array of monthly reward objects
 * @param {string} monthlyRewards[].name - Customer name
 * @param {number} monthlyRewards[].rewardPoints - Points for that month
 * @returns {Array<Object>} Array of total reward objects with structure:
 *   - {string} name - Customer name
 *   - {number} rewardPoints - Total accumulated points
 */


export const calculateRewardPoints = (price) => {
  if (!price || isNaN(price)) return 0;

  let points = 0;
  if (price > 100) {
    points += (price - 100) * 2 + 50;
  } else if (price > 50) {
    points += price - 50;
  }

  return Math.floor(points);
}



// Group transactions by customer, month, and year
export const aggregateMonthlyRewards = (transactions) => {
  const monthlyRewards = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.purchaseDate);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const key = `${tx.customerId}-${month}-${year}`;

    if (!monthlyRewards[key]) {
      monthlyRewards[key] = {
        customerId: tx.customerId,
        name: tx.customerName,
        month,
        year,
        rewardPoints: 0,
      };
    }
    monthlyRewards[key].rewardPoints += calculateRewardPoints(tx.price);
  });

  return Object.values(monthlyRewards);
};

// Aggregate total per customer
export const aggregateTotalRewards = (monthlyRewards) => {
  const totals = {};
  monthlyRewards.forEach((entry) => {
    if (!totals[entry.name]) {
      totals[entry.name] = { name: entry.name, rewardPoints: 0 };
    }
    totals[entry.name].rewardPoints += entry.rewardPoints;
  });
  return Object.values(totals);
};
