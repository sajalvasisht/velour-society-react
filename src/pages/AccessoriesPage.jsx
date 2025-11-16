import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductPage.css';
import AddToCartButton from '../components/AddToCartButton';

function AccessoriesPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // <-- FIXED: Added /api/ prefix
    fetch('/api/accessories') 
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching accessories products:', error));
  }, []);

  return (
    <>
      <header className="page-header">
        <nav className="navbar">
          <Link to="/" className="logo">Velour Society</Link>
          <ul className="menu">
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/accessories" className="active">Accessories</Link></li>
          </ul>
          <div className="icons">
            <input type="text" placeholder="Search..." />
            <Link to="/cart">🛒</Link>
            <Link to="/">Login/Signup</Link>
          </div>
        </nav>
      </header>

      <section className="hero" style={{ background: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)' }}>
        <h1>Accessories</h1>
        <p>Discover premium accessories to complement your style.</p>
        <button>Explore Collection</button>
      </section>

      <section className="collection">
        <div className="collection-header">
          <h2>Featured Accessories</h2>
          <p>Elevate your look with our curated selection of luxury accessories</p>
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

export default AccessoriesPage;