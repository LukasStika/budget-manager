import React from "react";

export default function Form() {
  return (
    <form className="form">
     <h2 className="form__title">Přidat novou položku</h2>
      <input 
        type="text" 
        className="form__input" 
        placeholder="název položky" 
      />
      <select defaultValue={""}>
        <option>Jídlo</option>
        <option>Bydlení</option>
        <option>Doprava</option>
        <option>Zábava</option>
        <option>Investice</option>
        <option>Ostatvní</option>
      </select>
      <input 
        type="text" 
        className="form__input" 
        placeholder="Částka" 
      />
      <input 
        type="text" 
        className="form__input" 
        placeholder="Poznámka" 
      />
      <button type="submit" className="form__submit">
        Přidej položku
      </button>
    </form>
  );
}