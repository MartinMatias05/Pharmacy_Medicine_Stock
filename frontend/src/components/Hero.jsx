import { Plus, ShieldCheck } from "lucide-react";

function Hero({ onAdd }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="eyebrow"><ShieldCheck size={15} /> Simple & organized stock management</div>
        <h1>Medicine Stock<br /><span>Management</span></h1>
        <p>Keep your pharmacy inventory organized, updated, and easy to manage in one place.</p>
        <button className="primary-btn hero-btn" onClick={onAdd}>
          <Plus size={18} /> Add Medicine
        </button>
      </div>
      <div className="hero-art" aria-hidden="true">
        <div className="art-glow"></div>
        <div className="medicine-bottle bottle-one">
          <div className="bottle-cap"></div>
          <div className="bottle-label"><span>RX</span><small>MEDICINE</small></div>
        </div>
        <div className="medicine-bottle bottle-two">
          <div className="bottle-cap"></div>
          <div className="bottle-label"><span>+</span><small>CARE</small></div>
        </div>
        <div className="pill-shape pill-one"></div>
        <div className="pill-shape pill-two"></div>
      </div>
    </section>
  );
}

export default Hero;