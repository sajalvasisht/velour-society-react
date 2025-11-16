import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import './HomePage.css'; // <-- THIS IS THE RE-ADDED IMPORT THAT FIXES EVERYTHING

// This is the Login/Signup Panel Component
const LoginPanel = ({ isOpen, onClose, onTabChange, activeTab }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!isValidEmail(loginEmail) || loginPassword.length < 8) {
      setLoginError('Invalid email or password must be 8+ characters.');
      return;
    }
    try {
      const response = await fetch(`/api/users?email=${loginEmail}&password=${loginPassword}`);
      const users = await response.json();
      if (users.length > 0) {
        alert(`Login Successful! Welcome back, ${users[0].fullName}.`);
        setLoginEmail(''); setLoginPassword(''); onClose();
      } else {
        setLoginError('Login Failed: Invalid email or password.');
      }
    } catch (error) {
      setLoginError('An error occurred. Is the json-server running?');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError('');
    if (signupName.length < 2) {
      setSignupError('Please enter your full name.'); return;
    }
    if (!isValidEmail(signupEmail)) {
      setSignupError('Please enter a valid email.'); return;
    }
    if (signupPassword.length < 8) {
      setSignupError('Password must be at least 8 characters long.'); return;
    }
    try {
      const checkResponse = await fetch(`/api/users?email=${signupEmail}`);
      const existingUsers = await checkResponse.json();
      if (existingUsers.length > 0) {
        setSignupError('An account with this email already exists.'); return;
      }
      const newUserData = { fullName: signupName, email: signupEmail, password: signupPassword };
      const registerResponse = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserData)
      });
      if (registerResponse.ok) {
        alert(`Sign Up Successful! Welcome, ${signupName}.`);
        setSignupName(''); setSignupEmail(''); setSignupPassword('');
        onTabChange('login');
      } else {
        setSignupError('Registration failed on server.');
      }
    } catch (error) {
      setSignupError('An error occurred. Is the json-server running?');
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google Login Success:", decoded);
    alert(`Welcome, ${decoded.name}! You are signed in with Google.`);
    onClose();
  };

  const handleGoogleError = () => {
    console.error('Google Login Failed');
    setLoginError('Google login failed. Please try again.');
  };

  return (
    <>
      <div 
        onClick={onClose} 
        className={`page-overlay ${isOpen ? 'open' : ''}`} 
      ></div>
      <div className={`login-signup-panel ${isOpen ? 'open' : ''}`}>
        <div onClick={onClose} className="close-btn" style={{ cursor: 'pointer' }}>
          &times;
        </div>
        <div className="panel-content">
          <div className="form-toggle">
            <div
              onClick={() => onTabChange('login')}
              className={`toggle-btn ${activeTab === 'login' ? 'active' : ''}`}
            >
              Login
            </div>
            <div
              onClick={() => onTabChange('signup')}
              className={`toggle-btn ${activeTab === 'signup' ? 'active' : ''}`}
            >
              Sign Up
            </div>
          </div>
          {activeTab === 'login' ? (
            <div className="form-container" id="login-form">
              <h2>Welcome Back</h2>
              <p>Enter your details to sign in to your account.</p>
              <form onSubmit={handleLoginSubmit}>
                {loginError && <p className="form-error-message">{loginError}</p>}
                <div className="input-group">
                  <label htmlFor="login-email">Email Address</label>
                  <input type="email" id="login-email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                </div>
                <div className="input-group">
                  <label htmlFor="login-password">Password</label>
                  <input type="password" id="login-password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                </div>
                <a href="#" className="forgot-password">Forgot Password?</a>
                <button type="submit" className="form-btn">Login</button>
              </form>
              <div className="social-login">
                <p className="separator"><span>or</span></p>
                <div className="google-btn-container">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    theme="outline"
                    size="large"
                    text="continue_with"
                    shape="rectangular"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="form-container" id="signup-form">
              <h2>Create Account</h2>
              <p>Join the Velour Society for an exclusive experience.</p>
              <form onSubmit={handleSignupSubmit}>
                {signupError && <p className="form-error-message">{signupError}</p>}
                <div className="input-group">
                  <label htmlFor="signup-name">Full Name</label>
                  <input type="text" id="signup-name" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
                </div>
                <div className="input-group">
                  <label htmlFor="signup-email">Email Address</label>
                  <input type="email" id="signup-email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                </div>
                <div className="input-group">
                  <label htmlFor="signup-password">Password</label>
                  <input type="password" id="signup-password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                </div>
                <p className="terms">By creating an account, you agree to our <a href="#">Terms of Service</a>.</p>
                <button type="submit" className="form-btn">Create Account</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// This component is the Mobile Nav Panel
const MobileNav = ({ isOpen, onClose }) => {
  return (
    <nav className={`mobile-nav ${isOpen ? 'open' : ''}`}>
      <Link to="/categories" onClick={onClose}>Shop</Link>
      <a href="#our-story" onClick={onClose}>Our Story</a>
      <Link to="/contact" onClick={onClose}>Contact</Link>
    </nav>
  );
};

// This is the main Home Page component
function HomePage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollRef = useRef(null);

  // --- THIS IS THE SCROLLING & VIDEO FIX ---
  useEffect(() => {
    // 1. Add the .no-scroll class to the <body> to lock it
    document.body.classList.add('no-scroll');
    
    // 2. Focus the inner container so keyboard/touch scrolling works
    if (scrollRef.current) {
      scrollRef.current.focus();
    }
    
    // 3. This "cleanup" function runs when you leave the page
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []); // The empty [] means this runs only once

  const closeAll = () => {
    setIsPanelOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    // We removed the wrapper div. The page is now just the content.
    <>
      <header id="main-header">
        <nav className="navbar">
          <Link to="/" className="logo-link" onClick={closeAll}>
            <div className="logo">Velour Society</div>
          </Link>
          <ul className="main-menu">
            <li><Link to="/categories">Shop</Link></li>
            <li><a href="#our-story">Our Story</a></li>
            <li><a href="#page-footer">Contact</a></li>
          </ul>
          <div className="icons">
            <input type="text" placeholder="Search..." />
            <Link to="/cart" aria-label="View Shopping Cart">🛒</Link>
            <div onClick={() => setIsPanelOpen(true)} id="login-trigger" aria-label="Login or Signup" style={{ cursor: 'pointer' }}>
              Login/Signup
            </div>
            <div onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} id="hamburger-menu" aria-label="Toggle mobile menu" style={{ cursor: 'pointer' }}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </nav>
      </header>
      
      <MobileNav isOpen={isMobileMenuOpen} onClose={closeAll} />
      <LoginPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="scroll-container" ref={scrollRef} tabIndex="-1">
        {/* We add 'playsInline' to all videos to help with mobile playback */}
        <section className="hero snap-section" id="main-hero">
          <video autoPlay muted loop playsInline className="hero-video-bg">
            <source src="/videos/main.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
          <div className="hero-content">
            <h1>The Fall 2025 Collection</h1>
            <p>Experience timeless luxury with Velour Society</p>
            <a href="#featured-collection" className="cta-button">Explore Now</a>
          </div>
          <div className="scroll-down">
            <a href="#featured-collection">Scroll</a>
          </div>
        </section>
        <section className="hero snap-section" id="featured-collection">
          <video autoPlay muted loop playsInline className="hero-video-bg">
              <source src="/videos/Featured_collection.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
          <div className="hero-content">
            <h1>Featured Collection</h1>
            <p>Curated pieces that define modern elegance.</p>
            <Link to="/latest-arrivals" className="cta-button">View All</Link>
          </div>
          <div className="scroll-down">
            <a href="#shop-by-category-hero">Scroll</a>
          </div>
        </section>
        <section className="hero snap-section" id="shop-by-category-hero">
          <video autoPlay muted loop playsInline className="hero-video-bg">
              <source src="/videos/category.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
          <div className="hero-content">
            <h1>Shop By Category</h1>
            <p>Find your signature style with our dedicated collections.</p>
            <Link to="/categories" className="cta-button">Discover</Link>
          </div>
           <div className="scroll-down">
            <a href="#our-story">Scroll</a>
          </div>
        </section>
        <section className="brand-story snap-section" id="our-story">
          <div className="story-parallax-bg"></div>
          <div className="story-content">
            <h2>The Velour Legacy</h2>
            <p>Founded on the principles of enduring style and meticulous craftsmanship, Velour Society is more than a brand; it's a narrative of modern luxury. We believe in creating pieces that are both timeless and contemporary, designed to be cherished for years to come.</p>
            <p>Each garment is born from the finest materials, sourced responsibly and transformed by artisans who share our passion for quality. Our philosophy is simple: to create beautiful, meaningful apparel that empowers the individual.</p>
          </div>
        </section>
        <footer className="enhanced-footer snap-section" id="page-footer">
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
                <li><a href="#our-story">About Us</a></li>
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
      </main>
    </>
  );
}

export default HomePage;