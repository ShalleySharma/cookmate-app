// src/components/Ingredient/InputRecipeCard.js
import React from "react";
import { Link } from "react-router-dom";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import "./InputRecipeCard.css";

const InputRecipeCard = ({ image, title, description, idMeal }) => {
  const [ref, isVisible] = useIntersectionObserver(0.2);

  return (
    <div ref={ref} className={`input-recipe-card ${isVisible ? "visible" : ""}`}>
      <img src={image} alt={title} className="input-recipe-img" />
      <div className="input-recipe-content">
        <h3 className="input-recipe-title">{title}</h3>
        {idMeal ? (
          <Link to={`/recipe/${idMeal}`} className="input-view-btn">
            View Details
          </Link>
        ) : (
          <button className="input-view-btn" disabled>
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default InputRecipeCard;
