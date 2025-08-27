import React, { useMemo } from "react";
import "./Investments.scss";

const formatCZK = (n) =>
  (n || 0).toLocaleString("cs-CZ", { style: "currency", currency: "CZK", maximumFractionDigits: 0 });

export default function Investments({ items }) {
  // vybereme jen výdaje v kategorii "Investice" (měsíční částky)
  const rows = useMemo(() => {
    const map = new Map(); // title -> sum

    items
      .filter(i => i.type === "expense" && i.category === "Investice")
      .forEach(i => {
        const title = (i.title || "Nezařazeno").trim() || "Nezařazeno";
        const amount = Number(i.amount) || 0;
        map.set(title, (map.get(title) || 0) + amount);
      });

    const arr = [...map.entries()]
      .map(([title, monthly]) => ({
        title,
        monthly,
        yearly: monthly * 12
      }))
      .sort((a, b) => a.title.localeCompare(b.title, "cs"));

    const totals = arr.reduce(
      (acc, r) => {
        acc.monthly += r.monthly;
        acc.yearly  += r.yearly;
        return acc;
      },
      { monthly: 0, yearly: 0 }
    );

    return { arr, totals };
  }, [items]);

  const { arr, totals } = rows;

  return (
    <section className="investments">
      <header className="inv-head">
        <h3>Investice</h3>
        <div className="inv-total">
          <span>Měsíčně celkem:</span>
          <strong>{formatCZK(totals.monthly)}</strong>
        </div>
      </header>

      {arr.length === 0 ? (
        <div className="inv-empty">Zatím nemáš žádné položky v kategorii <b>Investice</b>.</div>
      ) : (
        <div className="inv-table-wrap">
          <table className="inv-table">
            <thead>
              <tr>
                <th>Název</th>
                <th>Měsíčně</th>
                <th>Ročně</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((r) => (
                <tr key={r.title}>
                  <td className="name">{r.title}</td>
                  <td className="num">{formatCZK(r.monthly)}</td>
                  <td className="num strong">{formatCZK(r.yearly)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Celkem</td>
                <td className="num">{formatCZK(totals.monthly)}</td>
                <td className="num strong">{formatCZK(totals.yearly)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </section>
  );
}
