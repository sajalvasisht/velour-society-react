import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <-- IMPORT FROM NEW LOCATION
import './CartPage.css'; 

function CartPage() {
  const { cart, updateCart } = useCart(); // <-- USE THE GLOBAL STATE
  const navigate = useNavigate();

  // We no longer need useState or useEffect,
  // the useCart hook handles everything.

  const removeItem = (name) => {
    // Find the item and its quantity
    const item = cart.find(i => i.name === name);
    if (item) {
      // Set quantity to 0 by removing its current qty
      updateCart(item, -item.qty);
    }
  };

  // 4. Calculate Totals
  const subtotal = cart.reduce((total, item) => total + (item.price * (item.qty || 1)), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // 5. Handle Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    localStorage.setItem('subtotal', `$${subtotal.toFixed(2)}`);
    localStorage.setItem('tax', `$${tax.toFixed(2)}`);
    localStorage.setItem('total', `$${total.toFixed(2)}`);
    navigate("/checkout");
  };

  return (
    <>
      <header className="page-header">
        {/* ... (header is unchanged) ... */}
        <nav className="navbar">
          <Link to="/" className="logo">Velour Society</Link>
          <ul className="main-menu">
            <li><Link to="/categories">Shop</Link></li>
            <li><Link to="/">Our Story</Link></li>
            <li><Link to="/">Contact</Link></li>
          </ul>
          <div className="icons">
            <input type="text" placeholder="Search..." />
            <Link to="/cart">🛒</Link>
          </div>
        </nav>
      </header>

      <div className="cart-container">
        <h1>Your Cart</h1>
        <div className="cart-content">
          <div className="cart-items" id="cartItems">
            {cart.length === 0 ? (
              <div className="empty-msg" id="emptyMessage">Your cart is empty.</div>
            ) : (
              cart.map((item, index) => (
                <div className="cart-item" key={index}>
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name}</h4>
                    <p>{item.details || ''}</p>
                    <span className="remove" onClick={() => removeItem(item.name)}>Remove</span>
                  </div>
                  <div className="quantity-control">
                    {/* Use the updateCart function from our global hook */}
                    <button onClick={() => updateCart(item, -1)}>−</button>
                    <span className="quantity">{item.qty}</span>
                    <button onClick={() => updateCart(item, 1)}>+</button>
                  </div>
                  <div className="item-total-price">${(item.price * (item.qty || 1)).toFixed(2)}</div>
                </div>
              ))
            )}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-item"><span>Subtotal</span><span id="subtotal">${subtotal.toFixed(2)}</span></div>
            <div className="summary-item"><span>Tax (8%)</span><span id="tax">${tax.toFixed(2)}</span></div>
            <div className="summary-item total"><span>Total</span><span id="total">${total.toFixed(2)}</span></div>
            <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;