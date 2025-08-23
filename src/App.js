import React from "react";
import "./App.scss";

import BudgetSummary from "./components/budgetSummary";
import Form from "./components/form";
import List from "./components/list";
import "./App.scss";


function App() {
  return (
    <div className="app">
      <h1>Budget Manager</h1>
      <Form />
    </div>
  );
}

export default App;
