import React from "react";
import TransactionsTable from "./TransactionTable";
import MonthlyRewardsTable from "./MonthlyRewardsTable";
import TotalRewardsTable from "./TotalRewardsTable";
import AIAssistant from "./AiAssistant";

const Tabs = ({ transactions, rewards, totals, loading }) => {
  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-transactions-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-transactions"
            type="button"
            role="tab"
            aria-controls="nav-transactions"
            aria-selected="true"
          >
            Transactions
          </button>

          <button
            className="nav-link"
            id="nav-monthly-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-monthly"
            type="button"
            role="tab"
            aria-controls="nav-monthly"
            aria-selected="false"
          >
            Monthly Rewards
          </button>

          <button
            className="nav-link"
            id="nav-total-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-total"
            type="button"
            role="tab"
            aria-controls="nav-total"
            aria-selected="false"
          >
            Total Rewards
          </button>
        </div>
      </nav>


      <div className="tab-content mt-3" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-transactions"
          role="tabpanel"
          aria-labelledby="nav-transactions-tab"
        >
          <TransactionsTable transactions={transactions} loading={loading} />
        </div>

        <div
          className="tab-pane fade"
          id="nav-monthly"
          role="tabpanel"
          aria-labelledby="nav-monthly-tab"
        >
          <MonthlyRewardsTable rewards={rewards} loading={loading} />
        </div>

        <div
          className="tab-pane fade"
          id="nav-total"
          role="tabpanel"
          aria-labelledby="nav-total-tab"
        >
          <TotalRewardsTable totals={totals} loading={loading} />
        </div>

        <div
        >
          <AIAssistant transactions={transactions} />
        </div>
      </div>

    </>
  );
};

export default Tabs;
