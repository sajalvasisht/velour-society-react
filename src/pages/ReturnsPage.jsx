import React from 'react';
import { Link } from 'react-router-dom';
import './ReturnsPage.css'; // We will create this

function ReturnsPage() {
  return (
    <>
      <header className="page-header">
        <h1>Velour Society</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/shipping">Shipping</Link>
          <Link to="/returns" className="active">Returns</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      <section className="hero">
        <h1>Returns & Exchanges</h1>
        <p>We believe every piece should bring you confidence and comfort. If not, we’re here to make your experience seamless and elegant.</p>
      </section>

      <section className="content">
        <div className="policy-box">
          Please initiate returns within <strong>7 days of delivery</strong>. The item must be unused, unworn, and in its original packaging.
        </div>

        <h2>Eligibility for Returns</h2>
        <p>Your item is eligible for a return or exchange if it meets the following conditions:</p>
        <ul>
          <li>Item is unused, unworn, and unwashed.</li>
          <li>Tags and original packaging are intact.</li>
          <li>Proof of purchase is available.</li>
        </ul>
        <p><em>Note: Personalized or discounted items are not eligible for return.</em></p>

        <h2>How to Initiate a Return</h2>
        <p>Email our support team at <strong>support@veloursociety.com</strong> with your order number and reason for return. Our concierge will assist you through the process.</p>

        <div className="policy-box">
          Returns are processed within <strong>5–7 business days</strong> after we receive the item.
        </div>

        <h2>Refunds</h2>
        <p>Once inspected and approved, refunds will be credited to your original payment method. You will receive an email confirmation once the refund is processed.</p>

        <h2>Exchanges</h2>
        <p>Need a different size or color? We’ll be happy to exchange it, subject to stock availability. Shipping charges for exchanges may apply.</p>

        <h2>Damaged or Incorrect Items</h2>
        <p>If your order arrives damaged or incorrect, please contact us within <strong>48 hours</strong> of delivery with photos. We’ll ensure a replacement or full refund.</p>

        <div className="policy-box">
          Your satisfaction is the essence of our brand. Every Velour Society experience should feel as refined as our collection.
        </div>
      </section>

      <footer className="page-footer">
        <p>&copy; 2025 Velour Society. Crafted with elegance and intent.</p>
      </footer>
    </>
  );
}

export default ReturnsPage;