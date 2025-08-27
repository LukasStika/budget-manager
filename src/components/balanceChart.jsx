import React from "react";
import "./balanceChart.scss";

export default function BalanceChart({ incomeTotal, expenseTotal }) {
  const spent = Math.max(0, expenseTotal);
  const percent = incomeTotal > 0 ? (spent / incomeTotal) * 100 : 0;
  const remaining = Math.max(0, incomeTotal - expenseTotal);

  return (
    <div className="chart">
      <div
        className="donut"
        style={{ "--percent": `${percent}%` }}
      />
      </div>
    
  );
}
