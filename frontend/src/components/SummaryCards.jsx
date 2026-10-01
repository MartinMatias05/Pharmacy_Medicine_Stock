import { AlertTriangle, CalendarClock, Package } from "lucide-react";

function SummaryCards({ medicines }) {
  const total = medicines.length;
  const lowStock = medicines.filter((item) => Number(item.quantity) <= 10).length;

  const today = new Date();
  const soonLimit = new Date();
  soonLimit.setDate(today.getDate() + 60);

  const expiringSoon = medicines.filter((item) => {
    const date = new Date(item.expiryDate);
    return date >= today && date <= soonLimit;
  }).length;

  return (
    <div className="summary-grid">
      <div className="summary-card">
        <div className="summary-icon green"><Package size={21} /></div>
        <div><span>Total Medicines</span><strong>{total}</strong><small>Items in inventory</small></div>
      </div>
      <div className="summary-card">
        <div className="summary-icon amber"><AlertTriangle size={21} /></div>
        <div><span>Low Stock</span><strong>{lowStock}</strong><small>10 or fewer units</small></div>
      </div>
      <div className="summary-card">
        <div className="summary-icon rose"><CalendarClock size={21} /></div>
        <div><span>Expiring Soon</span><strong>{expiringSoon}</strong><small>Within 60 days</small></div>
      </div>
    </div>
  );
}

export default SummaryCards;