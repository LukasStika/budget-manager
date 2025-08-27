import React from "react";
import "./form.scss";

export default function Form({ type, onAdd }) {
  const title = type === "expense" ? "Přidat výdaj" : "Přidat příjem";
  return (
    <div className={`form-container ${type}`}>
      <button className="add-button" onClick={() => onAdd(type)} title={title}>
        +
      </button>
    </div>
  );
}
