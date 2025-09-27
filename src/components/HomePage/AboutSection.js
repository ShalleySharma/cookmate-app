import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver'; 
import './AboutSection.css';

const AboutSection = () => {
    const [sectionRef, isVisible] = useIntersectionObserver(0.15);
    const sectionClass = `about-section ${isVisible ? 'visible' : ''}`;

    return (
        <section className={sectionClass} ref={sectionRef}> 
            <div className="about-content-box">
                <div className="about-image-container"></div>
                <div className="about-text-content">
                    <p className="section-pretitle">Discover</p>
                    <h2 className="section-title">Our Story</h2>
                    <p className="story-paragraph">
                        The idea for <strong>CookMate</strong> was born out of a common problem: staring into a fridge full of ingredients and wondering what to cook. We believe that great meals shouldn't require a last-minute trip to the grocery store.
                    </p>
                    <p className="story-paragraph">
                        Our mission is to minimize food waste and maximize your culinary creativity by connecting you with authentic, inspiring recipes based on what you already own. Start cooking smarter, not harder.
                    </p>
                    <a href="/about" className="more-link">More About Us &rarr;</a>
                </div>
                <div className="about-decor-corner"></div>
            </div>
        </section>
    );
};

export default AboutSection;
