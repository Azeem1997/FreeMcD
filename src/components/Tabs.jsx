import React from "react";
import TransactionsTable from "./TransactionTable";
import MonthlyRewardsTable from "./MonthlyRewardsTable";
import TotalRewardsTable from "./TotalRewardsTable";

const Tabs = ({ transactions, rewards, totals, loading }) => {
  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            className="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Transactions
          </button>

          <button
            className="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Monthly Rewards
          </button>

          <button
            className="nav-link"
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Total Rewards
          </button>
        </div>
      </nav>

      <div className="tab-content mt-3" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <TransactionsTable transactions={transactions} loading={loading}/>
        </div>

        <div
          className="tab-pane fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <MonthlyRewardsTable rewards={rewards} loading={loading} />
        </div>

        <div
          className="tab-pane fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <TotalRewardsTable totals={totals} loading={loading}/>
        </div>
      </div>
    </>
  );
};

export default Tabs;
