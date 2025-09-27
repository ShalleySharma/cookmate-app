// src/components/Layout/Footer.js

import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './Footer.css';

const Footer = () => {
    const [footerRef, isVisible] = useIntersectionObserver(0.1); 
    const footerClass = `main-footer ${isVisible ? 'visible' : ''}`;

    return (
        <footer className={footerClass} ref={footerRef}> 
            <div className="footer-content">
                <div className="footer-brand-column">
                    <p className="footer-logo">CookMate</p>
                    <p className="footer-tagline">Cook Smarter, Not Harder.</p>
                    <div className="footer-social-icons">
                        <a href="https://facebook.com" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                        <a href="https://instagram.com" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                        <a href="https://pinterest.com" aria-label="Pinterest"><i className="fab fa-pinterest-p"></i></a>
                    </div>
                </div>

                <div className="footer-link-group">
                    <h4>Resources</h4>
                    <a href="/recipes">All Recipes</a>
                    <a href="/ingredients">Ingredient Finder</a>
                    <a href="/meal-plans">Meal Plans</a>
                    <a href="/submit-recipe">Submit a Recipe</a>
                </div>

                <div className="footer-link-group">
                    <h4>Company</h4>
                    <a href="/about">Our Story</a>
                    <a href="/blog">Blog</a>
                    <a href="/careers">Careers</a>
                    <a href="/press">Press</a>
                </div>

                <div className="footer-support-column">
                    <h4>Support</h4>
                    <p>Have questions? We're here to help.</p>
                    <a href="mailto:support@cookmate.com" className="footer-contact-link">support@cookmate.com</a>
                    <a href="/contact" className="footer-contact-link">Contact Us</a>
                </div>
            </div>

            <div className="footer-bottom-bar">
                <div className="footer-copyright">
                    &copy; {new Date().getFullYear()} CookMate. All rights reserved.
                </div>
                <div className="footer-legal-links">
                    <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
