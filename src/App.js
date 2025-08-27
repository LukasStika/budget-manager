import React, { useState, useEffect } from "react";
import "./App.scss";
import Form from "./components/form";
import ItemRow from "./components/itemRow";
import BalanceChart from "./components/balanceChart";
import BudgetSummary from "./components/budgetSummary";
import Investments from "./components/Investments";
import logo from './img/logo.png';

export default function App() {
  const EXPENSE_CATS = ["Jídlo", "Bydlení", "Doprava", "Zábava", "Investice", "Ostatní"];
  const INCOME_CATS  = ["Mzda", "Bonus", "Pasivní příjem", "Ostatní"];

  // 🔹 načtení ze storage nebo default 1 příjem + 1 výdaj
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("budget-items");
    return saved ? JSON.parse(saved) : [
      { id: 1, type: "expense", title: "", amount: "", category: EXPENSE_CATS[0] },
      { id: 2, type: "income",  title: "", amount: "", category: INCOME_CATS[0] }
    ];
  });

  const [nextId, setNextId] = useState(() => {
    return items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 3;
  });

  // 🔹 ukládání do storage při každé změně
  useEffect(() => {
    localStorage.setItem("budget-items", JSON.stringify(items));
  }, [items]);

  function addItem(type) {
    const newItem = {
      id: nextId,
      type,
      title: "",
      amount: "",
      category: type === "expense" ? EXPENSE_CATS[0] : INCOME_CATS[0]
    };
    setItems(prev => [...prev, newItem]);
    setNextId(id => id + 1);
  }

  function updateItem(updated) {
    setItems(prev => prev.map(i => (i.id === updated.id ? updated : i)));
  }

  function deleteItem(id) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  const expenses = items.filter(i => i.type === "expense");
  const incomes  = items.filter(i => i.type === "income");

  const totalExpenses = expenses.reduce((s,i)=>s+(+i.amount||0),0);
  const totalIncome   = incomes.reduce((s,i)=>s+(+i.amount||0),0);
  const balance = totalIncome - totalExpenses;


  return (
    <div className="app">
      <header className="header">
        <h1>Budget Manager</h1>
        <img src={logo} alt="Logo aplikace" />
      </header>

      <div className="grid">
        {/* VÝDAJE */}
        <section className="panel">
          <h2>Výdaje</h2>
          <ul className="list">
            {expenses.map(i => (
              <ItemRow key={i.id} item={i} onChange={updateItem} onDelete={deleteItem} />
            ))}
          </ul>
          <Form type="expense" onAdd={addItem} />
        </section>

        {/* STŘED – Zbývá + graf */}
        <section className="center">
          <BalanceChart incomeTotal={totalIncome} expenseTotal={totalExpenses} />
          <div className="summary">
            <BudgetSummary totalIncome={totalIncome} totalExpenses={totalExpenses} />
          </div>
          <div className={`bg-summary ${balance < 0 ? "neg" : "pos"}`}>
            <div className="balance-label">Zbývá</div>
            <div className={`balance ${balance < 0 ? "neg" : "pos"}`}>
                {balance.toLocaleString("cs-CZ")} Kč
            </div>
          </div>
        </section>

        {/* PŘÍJMY */}
        <section className="panel">
          <h2>Příjmy</h2>
          <ul className="list">
            {incomes.map(i => (
              <ItemRow key={i.id} item={i} onChange={updateItem} onDelete={deleteItem} />
            ))}
          </ul>
          <Form type="income" onAdd={addItem} />
        </section>
      </div>

      
   
      

<Investments items={items} />
    </div>
  );
}
