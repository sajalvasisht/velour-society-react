import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ContactPage.css'; // We will create this

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    setNameError('');
    setEmailError('');
    setSuccessMsg(false);

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name.trim())) {
      setNameError('Please enter only letters in name.');
      valid = false;
    }

    if (!email.includes('@')) {
      setEmailError('Email must contain "@" symbol.');
      valid = false;
    }

    if (valid) {
      setName('');
      setEmail('');
      // In a real app, you'd submit the form here
      setSuccessMsg(true);
      setTimeout(() => {
        setSuccessMsg(false);
      }, 4000);
    }
  };

  return (
    <>
      <header className="page-header">
        <nav className="navbar">
          <Link to="/" className="logo">Velour Society</Link>
          <ul className="menu">
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/accessories">Accessories</Link></li>
            <li><Link to="/contact" className="active">Contact</Link></li>
          </ul>
          <div className="icons">
            <input type="text" placeholder="Search..." />
            <Link to="/cart">🛒</Link>
            <Link to="/">Login/Signup</Link>
          </div>
        </nav>
      </header>

      <section className="hero" style={{ background: 'linear-gradient(135deg, #a78a68, #d4af37)' }}>
        <h1>Contact Us</h1>
        <p>We’d love to hear from you — connect with our team for styling advice, collaborations, or inquiries.</p>
      </section>

      <section className="contact-section">
        <div className="contact-box">
          <h2>Get in Touch</h2>
          <p>Your story deserves the finest touch. Let’s start the conversation.</p>

          <form id="contactForm" noValidate onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter your full name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
              <div className="error" id="nameError">{nameError}</div>
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <div className="error" id="emailError">{emailError}</div>
            </div>
            <div className="full">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" placeholder="What’s this about?" required />
            </div>
            <div className="full">
              <label htmlFor="message">Your Message</label>
              <textarea id="message" placeholder="Type your message here..." required></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>

          {successMsg && (
            <div className="success-message" id="successMessage" style={{ display: 'block' }}>
              Thanks for your feedback!! <strong>VISIT AGAIN 💫</strong>
            </div>
          )}

          <div className="info">
            <p><strong>Email:</strong> contact@veloursociety.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Address:</strong> 47 Park Avenue, New Delhi, India</p>
          </div>
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

export default ContactPage;