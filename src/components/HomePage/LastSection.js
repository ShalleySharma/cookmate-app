// src/components/HomePage/LastSection.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import './LastSection.css';

const LastSection = () => {
    const navigate = useNavigate();
    const [sectionRef, isVisible] = useIntersectionObserver(0.10);
    const sectionClass = `last-section ${isVisible ? 'visible' : ''}`;

    const handleCtaClick = () => {
        navigate('/input');
    };

    return (
        <section className={sectionClass} ref={sectionRef}>
            <h2 className="cta-heading">Ready to Stop Wondering?</h2>
            <p className="cta-subheading">
                Enter your ingredients and discover your next favorite meal instantly.
            </p>
            <button className="cta-button" onClick={handleCtaClick}>
                Start Cooking Now &rarr;
            </button>
        </section>
    );
};

export default LastSection;
