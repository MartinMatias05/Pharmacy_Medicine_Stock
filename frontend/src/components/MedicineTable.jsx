import { Edit3, PackageOpen, Search, Trash2 } from "lucide-react";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function isExpiringSoon(value) {
  const today = new Date();
  const limit = new Date();
  limit.setDate(today.getDate() + 60);
  const date = new Date(value);
  return date >= today && date <= limit;
}

function MedicineTable({ medicines, search, setSearch, onEdit, onDelete }) {
  const filtered = medicines.filter((medicine) => {
    const term = search.toLowerCase();
    return [medicine.name, medicine.brand].some((value) =>
      String(value).toLowerCase().includes(term)
    );
  });

  return (
    <section className="inventory-section">
      <div className="section-heading">
        <div>
          <div className="section-kicker">Inventory</div>
          <h2>Medicine Stock</h2>
          <p>View and manage your current pharmacy medicines.</p>
        </div>
        <div className="search-box">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicine or brand..."
          />
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Brand</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((medicine) => (
              <tr key={medicine._id}>
                <td>
                  <div className="medicine-name">
                    <div className="medicine-mini-icon"><PackageOpen size={17} /></div>
                    <strong>{medicine.name}</strong>
                  </div>
                </td>
                <td>{medicine.brand}</td>
                <td>
                  <span className={`quantity-badge ${Number(medicine.quantity) <= 10 ? "low" : ""}`}>
                    {medicine.quantity}
                  </span>
                </td>
                <td>
                  <span className={isExpiringSoon(medicine.expiryDate) ? "expiry-soon" : ""}>
                    {formatDate(medicine.expiryDate)}
                  </span>
                </td>
                <td className="price">₱{Number(medicine.price).toFixed(2)}</td>
                <td>
                  <div className="action-buttons">
                    <button className="icon-btn edit" title="Edit medicine" onClick={() => onEdit(medicine)}>
                      <Edit3 size={16} />
                    </button>
                    <button className="icon-btn delete" title="Delete medicine" onClick={() => onDelete(medicine)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="empty-state">
            <PackageOpen size={38} />
            <h3>{search ? "No medicine found" : "No medicines yet"}</h3>
            <p>{search ? "Try another medicine name or brand." : "Add your first medicine to start your inventory."}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default MedicineTable;