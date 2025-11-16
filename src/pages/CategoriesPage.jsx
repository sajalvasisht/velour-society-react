import React from 'react';
import { Link } from 'react-router-dom';
import './CategoriesPage.css'; // We will create this file next

function CategoriesPage() {
  return (
    <main className="category-page" id="category-page">
      <Link to="/men" className="category-split-panel"
          style={{ backgroundImage: "url('/photos/menfashion.jpg')" }}>
        <div className="content">
          <h2>Men</h2>
          <p>Shop Now</p>
        </div>
      </Link>
      <Link to="/women" className="category-split-panel"
          style={{ backgroundImage: "url('/photos/Women.jpg')" }}>
        <div className="content">
          <h2>Women</h2>
          <p>Shop Now</p>
        </div>
      </Link>
      <Link to="/accessories" className="category-split-panel"
          style={{ backgroundImage: "url('/photos/accessories.webp')" }}>
        <div className="content">
          <h2>Accessories</h2>
          <p>Shop Now</p>
        </div>
      </Link>
    </main>
  );
}

export default CategoriesPage;