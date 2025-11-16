import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CheckoutPage.css'; // We will create this

function CheckoutPage() {
  const [totals, setTotals] = useState({ sub: '$0.00', tax: '$0.00', total: '$0.00' });
  const navigate = useNavigate();

  // 1. Read totals from localStorage when page loads
  useEffect(() => {
    const subtotal = localStorage.getItem('subtotal') || '$0.00';
    const tax = localStorage.getItem('tax') || '$0.00';
    const total = localStorage.getItem('total') || '$0.00';
    setTotals({ subtotal, tax, total });
  }, []);

  // 2. Handle the final order placement
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const payment = formData.get('payment');
    
    if (!payment) {
      alert("Please select a payment method!");
      return;
    }
    
    alert(`🎉 Thank you, ${name}! Your order has been placed successfully via ${payment}.`);
    
    // Clear the cart and totals
    localStorage.removeItem('cart');
    localStorage.removeItem('subtotal');
    localStorage.removeItem('tax');
    localStorage.removeItem('total');
    
    // Go back to the home page
    navigate("/");
  };

  return (
    <>
      <header className="page-header">
        <nav className="navbar">
          <Link to="/" className="logo-link"><div className="logo">Velour Society</div></Link>
          <ul className="main-menu">
            <li><Link to="/categories">Shop</Link></li>
            <li><Link to="/">Our Story</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <div className="checkout-container">
        <div className="checkout-header">
          Checkout
        </div>

        <form id="checkoutForm" onSubmit={handlePlaceOrder}>
          <div className="form-section">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" required />

            <label htmlFor="address">House No. / Street</label>
            <input type="text" id="address" name="address" placeholder="123, Elm Street" required />

            <label htmlFor="city">City</label>
            <input type="text" id="city" name="city" placeholder="New Delhi" required />

            <label htmlFor="pincode">Pincode</label>
            <input type="text" id="pincode" name="pincode" pattern="[0-9]{6}" placeholder="110001" required />

            <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" name="phone" pattern="[0-9]{10}" placeholder="9876543210" required />
          </div>

          <div className="form-section">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="example@gmail.com" required />

            <label htmlFor="state">State</label>
            <input type="text" id="state" name="state" placeholder="Delhi" required />

            <label htmlFor="country">Country</label>
            <select id="country" name="country" required>
              <option value="">Select Country</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
              <option>Canada</option>
            </select>
          </div>

          <div className="payment-section">
            <h3>Payment Method</h3>
            <div className="payment-options">
              <label><input type="radio" name="payment" value="COD" required /> Cash on Delivery</label>
              <label><input type="radio" name="payment" value="Card" /> Credit/Debit Card</label>
              <label><input type="radio" name="payment" value="UPI" /> UPI</label>
            </div>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-item"><span>Subtotal</span><span id="subtotal">{totals.subtotal}</span></div>
            <div className="summary-item"><span>Shipping</span><span>Free</span></div>
            <div className="summary-item"><span>Tax</span><span id="tax">{totals.tax}</span></div>
            <div className="summary-item total"><span>Total</span><span id="total">{totals.total}</span></div>
          </div>

          <button type="submit">Place Order</button>
        </form>
      </div>
    </>
  );
}

export default CheckoutPage;