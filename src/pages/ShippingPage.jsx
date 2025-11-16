import React from 'react';
import { Link } from 'react-router-dom';
import './ShippingPage.css'; // We will create this

function ShippingPage() {
  return (
    <>
      <header className="page-header">
        <nav className="navbar">
          <Link to="/" className="logo">Velour Society</Link>
          <ul className="menu">
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/accessories">Accessories</Link></li>
            <li><Link to="/shipping" className="active">Shipping</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <section className="hero" style={{ background: 'linear-gradient(135deg, #0b1220, #111827)' }}>
        <h1>Shipping & Delivery</h1>
        <p>Every order from Velour Society is prepared with precision, elegance, and timely delivery.</p>
      </section>

      <section className="shipping-section">
        <div className="shipping-box">
          <h2>Our Shipping Promise</h2>
          <p>
            Each Velour Society piece is packed with care to ensure it reaches you in flawless condition. We aim to make every delivery as elegant and timely as our designs.
          </p>

          <h3>📦 Shipping Options</h3>
          <table className="shipping-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Delivery Time</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Standard Shipping</td>
                <td>5–7 Business Days</td>
                <td>Free on Orders Above ₹2000</td>
              </tr>
              <tr>
                <td>Express Shipping</td>
                <td>2–3 Business Days</td>
                <td>₹199</td>
              </tr>
              <tr>
                <td>International Shipping</td>
                <td>7–14 Business Days</td>
                <td>Calculated at Checkout</td>
              </tr>
            </tbody>
          </table>

          <h3>🕰️ Order Processing</h3>
          <p>
            Orders are typically processed within <span className="highlight">1–2 business days</span> (excluding weekends and holidays). Once shipped, you will receive an email with your tracking information.
          </p>

          <h3>🚚 Tracking Your Order</h3>
          <p>
            You can track your package using the tracking link sent via email after dispatch. For assistance, reach us at <span className="highlight">support@veloursociety.com</span>.
          </p>

          <h3>🎁 Our Packaging</h3>
          <p>
            Every order arrives in our signature Velour Society packaging — designed with a timeless aesthetic, ensuring your purchase feels as luxurious as it looks.
          </p>

          <h3>🌍 International Orders</h3>
          <p>
            For international destinations, customs duties or import taxes (if applicable) are the responsibility of the buyer. Delivery times may vary depending on local customs procedures.
          </p>

          <h3>⚠️ Delivery Issues</h3>
          <p>
            In case of any delay, damage, or loss, please notify us within
            <span className="highlight"> 7 days</span> of the expected delivery date. Our team will ensure a smooth resolution.
          </p>

          <h3>💌 Need Help?</h3>
          <p>
            Have questions about your delivery? Reach out at <span className="highlight">support@veloursociety.com</span> or visit our
            <Link to="/contact" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}> Contact Page</Link>.
          </p>
        </div>
      </section>

      <footer className="page-footer">
        <p>© 2025 Velour Society. All Rights Reserved.</p>
        <p><a href="#">About</a> | <a href="#">Shipping</a> | <a href="#">Privacy Policy</a></p>
      </footer>
    </>
  );
}

export default ShippingPage;