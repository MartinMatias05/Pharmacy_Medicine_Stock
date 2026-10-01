import { Pill } from "lucide-react";

function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="brand">
          <div className="brand-icon"><Pill size={22} strokeWidth={2.2} /></div>
          <div>
            <div className="brand-name">PHARMA STOCK</div>
            <div className="brand-subtitle">Pharmacy Medicine Management</div>
          </div>
        </div>
        <div className="header-status">
          <span className="status-dot"></span>
          Inventory System
        </div>
      </div>
    </header>
  );
}

export default Header;