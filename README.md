# Customer Rewards Dashboard (React + AI)

A simple React application that simulates a retailer’s **customer reward points program** — with an added **AI insights feature** powered by Hugging Face.

---

## Features

- **Reward Calculation Logic**  
  Calculates reward points based on each purchase:  
  - 2 points for every dollar spent over **$100**.  
  - 1 point for every dollar spent between **$50–$100**.  
  - Handles fractional prices safely.

- **Data Tables**
  - **Transactions Table** — lists all purchases with computed reward points.  
  - **Monthly Rewards Table** — aggregates reward points per month and year.  
  - **Total Rewards Table** — shows total reward points per customer.

- **AI Insights**  
  Uses Hugging Face’s `zephyr-7b-beta` model to generate smart insights about customer behavior and spending patterns.

- **Dynamic Data Source**  
  Select between 5 different mock data sets (`mockData1.json` to `mockData5.json`), each simulating different scenarios (missing values, invalid dates, etc.).

- **Responsive UI**  
  Styled with **Bootstrap 5** for clean and mobile-friendly layout.

- **Error & Loading States**  
  Includes graceful error handling and skeleton loaders for better user experience.

---

## Tech Stack

- **Frontend:** React JS (Functional Components, Hooks)
- **Styling:** Bootstrap 5
- **API:** Axios (mock data fetching)
- **AI Integration:** Hugging Face API (`zephyr-7b-beta`)
- **Testing:** Jest + React Testing Library

---

## Folder Structure

src/
 ├── components/
 │   ├── Tabs.js
 │   ├── TransactionsTable.js
 │   ├── MonthlyRewardsTable.js
 │   ├── TotalRewardsTable.js
 ├── utils/
 │   ├── calculatePoints.js
 ├── tests/
 │   ├── calculatePoints.test.js
 │   ├── monthlyRewards.test.js
 │   ├── transactionTable.test.js
 ├── App.js
 ├── index.js
public/
 ├── mockData1.json
 ├── mockData2.json
 ├── mockData3.json
 ├── mockData4.json
 ├── mockData5.json
```

##  Example Insight (AI Output)

> “Jane Smith earned more rewards due to higher-value purchases in February. Consider offering a loyalty bonus to encourage repeated purchases.”

---

##  Deployment

The app is deployed on **Vercel**:  
https://free-mc-o9wljbr3r-azeem1997s-projects.vercel.app/

---

## Author

**S Azeem**  
Frontend Developer | React.js  
azeem.s@infosys.com
https://github.com/Azeem1997/FreeMcD
