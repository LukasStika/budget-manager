import React from "react";
import "./itemRow.scss";

export default function ItemRow({ item, onChange, onDelete }) {
  const isExpense = item.type === "expense";

  // Pomocná funkce pro update části objektu
  const set = (patch) => onChange({ ...item, ...patch });

  return (
    <li className={`item-row ${item.type}`}>
      
      <input
        className="item-title"
        placeholder={isExpense ? "Název výdaje" : "Název příjmu"}
        value={item.title}
        onChange={(e) => set({ title: e.target.value })}
      />

   
      <input
        className="item-amount"
        type="number"
        inputMode="decimal"
        placeholder="0"
        value={item.amount}
        onChange={(e) => set({ amount: e.target.value })}
      />

   
      <select
        className="item-category"
        value={item.category}
        onChange={(e) => set({ category: e.target.value })}
      >
        {isExpense ? (
          <>
            <option>Jídlo</option>
            <option>Bydlení</option>
            <option>Doprava</option>
            <option>Zábava</option>
            <option>Investice</option>
            <option>Ostatní</option>
          </>
        ) : (
          <>
            <option>Mzda</option>
            <option>Bonus</option>
            <option>Pasivní příjem</option>
            <option>Ostatní</option>
          </>
        )}
      </select>

      
      <button className="item-delete" onClick={() => onDelete(item.id)}>✕</button>
    </li>
  );
}
