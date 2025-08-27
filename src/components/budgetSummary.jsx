import "./budgetSummary.scss";

export default function BudgetSummary({ totalIncome, totalExpenses }) {
  return (
    <div className="budget-summary">
      <div className="summary-box expense">
        Výdaje: <span>{totalExpenses.toLocaleString("cs-CZ")} Kč</span>
      </div>
      <div className="summary-box income">
        Příjmy: <span>{totalIncome.toLocaleString("cs-CZ")} Kč</span>
      </div>
    </div>
  );
}
