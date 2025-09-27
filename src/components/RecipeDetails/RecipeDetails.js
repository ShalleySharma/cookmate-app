import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchRecipeById } from "../../api/mealdb";
import "./RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="food-details-page">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="food-details-page">
        <div className="error">Recipe not found.</div>
      </div>
    );
  }

  const {
    strMeal,
    strMealThumb,
    strInstructions,
    strYoutube,
    strCategory,
    strArea,
    strTags,
    strSource,
  } = recipe;

  const videoId = strYoutube ? strYoutube.split("v=")[1] : null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="food-details-page">
      <header className="header-bar">
        <div className="icon-button back-button">
          <Link to="/input" aria-label="Back">
            <i className="fas fa-chevron-left"></i>
          </Link>
        </div>
        <div className="icon-button heart-button">
          <a href="#" aria-label="Favorite">
            <i className="fas fa-heart"></i>
          </a>
        </div>
      </header>

      <div className="half-circle-bg"></div>

      <div className="image-container">
        <div className="image-circle">
          <img src={strMealThumb} alt={strMeal} className="food-image" />
        </div>
      </div>

      <div className="details-card">
        <h2 className="food-name">{strMeal}</h2>

        <section className="description-section">
          <p className="description-placeholder">
            Category: {strCategory}, Area: {strArea}
          </p>
          {strTags && <p className="tags">Tags: {strTags}</p>}
        </section>

        <section className="ingredients-section">
          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {ingredients.map((ing, index) => (
              <li key={index} className="ingredient-item">
                {ing}
              </li>
            ))}
          </ul>
        </section>

        <section className="steps-section">
          <h3>Steps of Recipe</h3>
          <ol className="steps-list">
            {strInstructions
              ? strInstructions
                  .split(".")
                  .filter((step) => step.trim())
                  .map((step, index) => (
                    <li key={index} className="step-item">
                      {step.trim()}.
                    </li>
                  ))
              : <li>No steps available.</li>}
          </ol>
        </section>

        {strSource && (
          <section className="source-section">
            <h3>Source</h3>
            <a
              href={strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              View Original Recipe
            </a>
          </section>
        )}

        <section className="video-section">
          <h3>Video Tutorial</h3>
          {videoId ? (
            <div className="video-container">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Recipe Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className="no-video">Video not available</p>
          )}
        </section>

        <button className="cta-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default RecipeDetails;
