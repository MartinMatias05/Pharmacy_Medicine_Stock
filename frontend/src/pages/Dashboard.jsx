import { useEffect, useState } from "react";
import { CheckCircle2, Plus, RefreshCw, XCircle } from "lucide-react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SummaryCards from "../components/SummaryCards";
import MedicineTable from "../components/MedicineTable";
import MedicineForm from "../components/MedicineForm";
import {
  createMedicine,
  deleteMedicine,
  getMedicines,
  updateMedicine
} from "../services/medicineService";

function Dashboard() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState(null);

  const loadMedicines = async () => {
    try {
      setLoading(true);
      const data = await getMedicines();
      setMedicines(Array.isArray(data) ? data : []);
    } catch (error) {
      showNotice("error", "Unable to connect to the pharmacy API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedicines();
  }, []);

  const showNotice = (type, message) => {
    setNotice({ type, message });
    window.setTimeout(() => setNotice(null), 3500);
  };

  const openAdd = () => {
    setSelectedMedicine(null);
    setModalOpen(true);
  };

  const openEdit = (medicine) => {
    setSelectedMedicine(medicine);
    setModalOpen(true);
  };

  const handleSave = async (medicineData) => {
    try {
      setSaving(true);

      if (selectedMedicine) {
        await updateMedicine(selectedMedicine._id, medicineData);
        showNotice("success", "Medicine updated successfully.");
      } else {
        await createMedicine(medicineData);
        showNotice("success", "Medicine added successfully.");
      }

      setModalOpen(false);
      setSelectedMedicine(null);
      await loadMedicines();
    } catch (error) {
      showNotice("error", error.response?.data?.message || "Unable to save medicine.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (medicine) => {
    const confirmed = window.confirm(`Delete ${medicine.name} from the inventory?`);
    if (!confirmed) return;

    try {
      await deleteMedicine(medicine._id);
      showNotice("success", "Medicine deleted successfully.");
      await loadMedicines();
    } catch (error) {
      showNotice("error", error.response?.data?.message || "Unable to delete medicine.");
    }
  };

  return (
    <div className="app-shell">
      <Header />

      <main className="container">
        <Hero onAdd={openAdd} />

        <div className="section-top">
          <div>
            <div className="section-kicker">Overview</div>
            <h2 className="overview-title">Stock at a glance</h2>
          </div>
          <button className="refresh-btn" onClick={loadMedicines} disabled={loading}>
            <RefreshCw size={16} className={loading ? "spin" : ""} /> Refresh
          </button>
        </div>

        <SummaryCards medicines={medicines} />

        {loading ? (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Loading medicine inventory...</p>
          </div>
        ) : (
          <MedicineTable
            medicines={medicines}
            search={search}
            setSearch={setSearch}
            onEdit={openEdit}
            onDelete={handleDelete}
          />
        )}

        <section className="bottom-cta">
          <div>
            <div className="section-kicker">Pharmacy Stock</div>
            <h2>Keep your medicine inventory organized.</h2>
            <p>Add new medicines or update existing stock whenever needed.</p>
          </div>
          <button className="primary-btn" onClick={openAdd}><Plus size={18} /> Add Medicine</button>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <span>© 2026 PHARMA STOCK</span>
          <span>Medicine Stock Management System</span>
        </div>
      </footer>

      {modalOpen && (
        <MedicineForm
          medicine={selectedMedicine}
          onSubmit={handleSave}
          onClose={() => {
            if (!saving) {
              setModalOpen(false);
              setSelectedMedicine(null);
            }
          }}
          saving={saving}
        />
      )}

      {notice && (
        <div className={`toast ${notice.type}`}>
          {notice.type === "success" ? <CheckCircle2 size={19} /> : <XCircle size={19} />}
          <span>{notice.message}</span>
        </div>
      )}
    </div>
  );
}

export default Dashboard;