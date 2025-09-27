import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './HomePage.css'; 
import AboutSection from './AboutSection'; 
import RecipeSection from './RecipeSection';
import LastSection from './LastSection'; 
import Footer from './Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.1;
      setIsScrolled(window.scrollY > scrollThreshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCtaClick = () => navigate('/input');

  return (
    <div className={`cookmate-page ${isScrolled ? 'scrolled' : ''}`}>
      <header className="navbar">
        <div className="logo">CookMate</div>
        <nav>
          <ul>
            <li><a href="/" className="active">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#recipes">Recipes</a></li>
            <li><Link to="/input">Ingredients</Link></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </nav>
        <div className="language-selector">EN ▾</div>
      </header>

      <main className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">
            Your Premium<br/>Guide to Authentic<br/>Flavors
          </h1>
          <p className="subtitle">
            Search for recipes using the ingredients you already have. Less waste, more taste!
          </p>
          <button className="hero-cta-button" onClick={handleCtaClick}>
            Enter Ingredients
          </button>
        </div>
        <div className="food-visual-container"></div>
      </main>

      <section id="about"><AboutSection /></section>
      <section id="recipes"><RecipeSection /></section>
      <LastSection />
      <Footer />
    </div>
  );
};

export default HomePage;
