export const calculatePoints = (amount) => {
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2 + 50;
  } else if (amount > 50) {
    points += amount - 50;
  }
  return Math.floor(points);
};

export function calculateRewardPoints(amount) {
  if (!amount || amount <= 0) return 0;
  let points = 0;
  if (amount > 100) {
    points += (amount - 100) * 2;
    amount = 100;
  }
  if (amount > 50) {
    points += (amount - 50) * 1;
  }
  return Math.round(points);
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
    monthlyRewards[key].rewardPoints += calculatePoints(tx.price);
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
