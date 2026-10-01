import { useEffect, useState } from "react";
import { CalendarDays, DollarSign, Package, Pill, Save, X } from "lucide-react";

const emptyForm = {
  name: "",
  brand: "",
  quantity: "",
  expiryDate: "",
  price: ""
};

function MedicineForm({ medicine, onSubmit, onClose, saving }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (medicine) {
      setForm({
        name: medicine.name || "",
        brand: medicine.brand || "",
        quantity: medicine.quantity ?? "",
        expiryDate: medicine.expiryDate ? medicine.expiryDate.slice(0, 10) : "",
        price: medicine.price ?? ""
      });
    } else {
      setForm(emptyForm);
    }
    setError("");
  }, [medicine]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.brand.trim() || form.quantity === "" || !form.expiryDate || form.price === "") {
      setError("Please complete all medicine fields.");
      return;
    }

    if (Number(form.quantity) < 0 || Number(form.price) < 0) {
      setError("Quantity and price cannot be negative.");
      return;
    }

    await onSubmit({
      name: form.name.trim(),
      brand: form.brand.trim(),
      quantity: Number(form.quantity),
      expiryDate: form.expiryDate,
      price: Number(form.price)
    });
  };

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="medicine-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="section-kicker">{medicine ? "Update inventory" : "New inventory item"}</div>
            <h2>{medicine ? "Edit Medicine" : "Add Medicine"}</h2>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Medicine Name
              <div className="input-wrap"><Pill size={17} /><input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Paracetamol" /></div>
            </label>
            <label>
              Brand
              <div className="input-wrap"><Package size={17} /><input name="brand" value={form.brand} onChange={handleChange} placeholder="e.g. Biogesic" /></div>
            </label>
            <label>
              Quantity
              <div className="input-wrap"><Package size={17} /><input type="number" min="0" name="quantity" value={form.quantity} onChange={handleChange} placeholder="0" /></div>
            </label>
            <label>
              Expiry Date
              <div className="input-wrap"><CalendarDays size={17} /><input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} /></div>
            </label>
            <label className="full-width">
              Price
              <div className="input-wrap"><DollarSign size={17} /><input type="number" min="0" step="0.01" name="price" value={form.price} onChange={handleChange} placeholder="0.00" /></div>
            </label>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-btn" disabled={saving}>
              <Save size={17} /> {saving ? "Saving..." : medicine ? "Update Medicine" : "Save Medicine"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MedicineForm;