// src/components/HomePage/RecipeSection.js

import React, { useRef, useEffect, useState } from 'react';
import './RecipeSection.css'; // Make sure this CSS file is ready!

// Import images
import pavBhajiImg from '../../assets/pav_bhaaji.png';
import paneerTikaImg from '../../assets/paneer_tika.png';
import friedRiceImg from '../../assets/fried_rice.png';
import dalTadkaImg from '../../assets/dal.png';

// Image map for dynamic loading
const imageMap = {
  'pav_bhaaji.png': pavBhajiImg,
  'paneer_tika.png': paneerTikaImg,
  'fried_rice.png': friedRiceImg,
  'dal_tadka.png': dalTadkaImg,
};

// =========================================================
// 💥 REQUIRED HOOK FOR ANIMATION TRIGGER (Intersection Observer)
// =========================================================
const useIntersectionObserver = (ref) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2, // 20% of the item must be visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isVisible;
};

// =========================================================
// RecipeCard Component (The template for each dish)
// =========================================================
const RecipeCard = ({ dishName, description, imageUrl, isReversed, preTitle }) => {
  const cardRef = useRef(null);
  const isVisible = useIntersectionObserver(cardRef); 

  // Dynamically set class names to trigger CSS animations
  const cardClass = `recipe-card ${isReversed ? 'reverse-layout' : ''} ${isVisible ? 'visible' : ''}`;
  
  // Sets the image as a background
  const imageStyle = { backgroundImage: `url(${imageMap[imageUrl]})` };

  return (
    <div className={cardClass} ref={cardRef}>
      
      <div className="recipe-image-container">
        {/* The dish-image div uses CSS for the floating circle image and sprinkles */}
        <div className="dish-image" style={imageStyle}>
          {/* Sprinkles are added via CSS ::after */}
        </div>
      </div>
      
      <div className="recipe-text-content">
        <p className="recipe-pretitle">{preTitle}</p>
        <h3 className="recipe-name">{dishName}</h3>
        <p className="recipe-description">{description}</p>
        <a href={`/recipes/${dishName.toLowerCase().replace(/\s/g, '-')}`} className="view-recipe-link">View Recipe &rarr;</a>
      </div>
    </div>
  );
};

// =========================================================
// RecipeSection Component (The container calling the cards)
// =========================================================
const RecipeSection = () => {
  return (
    <section className="recipe-showcase-section">
      <div className="section-header">
        <p className="section-pretitle">Discover</p>
        <h2 className="section-title">CookMate Recommendations</h2>
      </div>

      {/* --- Card 1: Image on Left (PAV BHAJI) --- */}
      <RecipeCard
        preTitle="Street Food Favorite"
        dishName="Pav Bhaji" 
        description="A hearty, spiced vegetable mash (bhaji) served with soft, buttered bread rolls (pav). Perfect for using up mixed vegetables and staple spices." 
        imageUrl="pav_bhaaji.png" 
        isReversed={false} 
      />
      
      {/* --- Card 2: Image on Right (PANEER TIKKA) --- */}
      <RecipeCard
        preTitle="Tandoori Classic"
        dishName="Paneer Tikka" 
        description="Cubed paneer marinated in a spiced yogurt blend and grilled to smoky perfection. A flavorful, protein-rich main course found in every great kitchen." 
        imageUrl="paneer_tika.png" 
        isReversed={true} 
      />
      
      {/* --- Card 3: Image on Left (FRIED RICE) --- */}
      <RecipeCard
        preTitle="Quick Lunch Idea"
        dishName="Vegetable Fried Rice" 
        description="A simple, savory solution for leftover rice and vegetables. Highly customizable and ready in minutes." 
        imageUrl="fried_rice.png" 
        isReversed={false} 
      />

      {/* --- Card 4: Image on Right (DAL TADKA) --- */}
      <RecipeCard
        preTitle="Comfort Food Classic"
        dishName="Dal Tadka"
        description="A flavorful lentil dish tempered with ghee, cumin, and spices. A wholesome and comforting meal that's easy to prepare and full of nutrition."
        imageUrl="dal_tadka.png"
        isReversed={true}
      />

    </section>
  );
};

export default RecipeSection;