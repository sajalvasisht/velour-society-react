import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './LatestPage.css';
import AddToCartButton from '../components/AddToCartButton';

function LatestPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // <-- FIXED: Added /api/ prefix
    fetch('/api/arrivals') 
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching arrivals:', error));
  }, []);

  return (
    <>
      <header className="page-header">
        <nav className="navbar">
          <Link to="/" className="logo">Velour Society</Link>
          <ul className="menu">
            <li><Link to="/categories">Shop</Link></li>
            <li><Link to="/">Our Story</Link></li>
            <li><Link to="/">Contact</Link></li>
          </ul>
          <div className="icons">
            <Link to="/cart">🛒</Link>
            <Link to="/">Login/Signup</Link>
          </div>
        </nav>
      </header>

      <section className="page-title-header">
        <h1>Latest Arrivals</h1>
        <p>Discover the pieces that define this season's elegance.</p>
      </section>

      <section className="arrivals-container" id="arrivals-container">
        {products.map(product => (
          <div className="arrival-card" key={product.id}>
            <div className="image-container">
              <span className="sale-badge">{product.discount}</span>
              <img src={product.image} alt={product.name} />
            </div>
            <div className="arrival-info">
              <h2>{product.name}</h2>
              <div className="price-container">
                <span className="old-price">${product.old_price}</span>
                <span className="price">${product.price}</span>
              </div>
              <AddToCartButton 
                product={{
                  name: product.name, 
                  price: product.price, 
                  image: product.image, 
                  details: product.description
                }} 
              />
            </div>
          </div>
        ))}
      </section>

      <footer className="enhanced-footer" id="page-footer">
        <div className="footer-grid">
          <div className="footer-column">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/latest-arrivals">New Arrivals</Link></li>
              <li><Link to="/men">Men</Link></li>
              <li><Link to="/women">Women</Link></li>
              <li><Link to="/accessories">Accessories</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Our Company</h4>
            <ul>
              <li><Link to="/">About Us</Link></li>
              <li><a href="#">Journal</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Customer Service</h4>
            <ul>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/returns">Returns</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Stay Connected</h4>
            <div className="newsletter-form">
              <p>Join our mailing list for exclusive updates and offers.</p>
              <div className="newsletter-input">
                <input type="email" placeholder="Enter your email" />
                <button>Join</button>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Velour Society. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default LatestPage;