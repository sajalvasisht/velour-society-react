import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductPage.css';
import AddToCartButton from '../components/AddToCartButton';

function WomenPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = '#fff';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  useEffect(() => {
    // <-- FIXED: Added /api/ prefix
    fetch('/api/women') 
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching women products:', error));
  }, []);

  return (
    <>
      <header className="page-header">
        <nav className="navbar">
          <Link to="/" className="logo">Velour Society</Link>
          <ul className="menu">
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/women" className="active">Women</Link></li>
            <li><Link to="/accessories">Accessories</Link></li>
          </ul>
          <div className="icons">
            <input type="text" placeholder="Search..." />
            <Link to="/cart">🛒</Link>
            <Link to="/">Login/Signup</Link>
          </div>
        </nav>
      </header>

      <section className="hero" style={{ background: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)' }}>
        <h1>Women's Collection</h1>
        <p>Discover elegant womenswear designed for the modern woman.</p>
        <button>Explore Collection</button>
      </section>

      <section className="collection">
        <div className="collection-header">
          <h2>Featured Women's Clothing</h2>
          <p>Elevate your wardrobe with our curated selection.</p>
        </div>

        <div className="product-grid" id="product-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image">
                <img src={`/${product.image}`} alt={product.name} />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <div className="description">{product.description}</div>
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="page-footer">
        <p>© 2025 Velour Society. All Rights Reserved.</p>
        <p>
          <a href="#">About</a> |
          <a href="#">Contact</a> |
          <a href="#">Privacy Policy</a>
        </p>
      </footer>
    </>
  );
}

export default WomenPage;