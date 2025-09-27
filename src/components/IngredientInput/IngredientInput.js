import React, { useState, useRef } from "react";
import InputRecipeCard from "./InputRecipeCard";
import { fetchRecipesByIngredient } from "../../api/mealdb";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import "./IngredientInput.css";
import userImage from "../../assets/profile.jpg";
import dish1 from "../../assets/dish1.png";
import dish2 from "../../assets/dish2.png";
import dish3 from "../../assets/dish3.png";
import dish4 from "../../assets/dish4.png";
import dish5 from "../../assets/dish5.png";
import dish6 from "../../assets/dish6.png";
import dish7 from "../../assets/dish7.png";
const dishes = [dish1, dish2, dish3, dish4, dish5, dish6, dish7];
const dishList = [...dishes, ...dishes];




const IngredientInput = () => {
  const inputSectionRef = useRef(null);
  const [bannerRef, bannerVisible] = useIntersectionObserver(1.0);
  const [textRef, textVisible] = useIntersectionObserver(0.5);
  const [ingredient, setIngredient] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdd = () => {
    if (ingredient.trim() && !ingredientsList.includes(ingredient.trim())) {
      setIngredientsList([...ingredientsList, ingredient.trim()]);
      setIngredient("");
    }
  };

  const handleRemove = (item) => {
    setIngredientsList(ingredientsList.filter((i) => i !== item));
  };

  const handleSearch = async () => {
    setErrorMessage("");
    if (ingredientsList.length === 0) {
      setErrorMessage("Please enter some ingredients first.");
      setSearched(true);
      return;
    }
    setLoading(true);

    try {
      let allRecipesPerIngredient = [];

      // Fetch recipes for each ingredient
      for (let ing of ingredientsList) {
        const data = await fetchRecipesByIngredient(ing);
        allRecipesPerIngredient.push(data || []);
      }

      // Intersection: recipes containing all ingredients
      let intersection = allRecipesPerIngredient[0] || [];
      for (let i = 1; i < allRecipesPerIngredient.length; i++) {
        intersection = intersection.filter(r1 =>
          allRecipesPerIngredient[i].some(r2 => r2.idMeal === r1.idMeal)
        );
      }

      let result;
      if (intersection.length > 0) {
        result = intersection;
      } else {
        // Union: recipes containing any of the ingredients
        const unionMap = new Map();
        for (let recipes of allRecipesPerIngredient) {
          for (let r of recipes) {
            unionMap.set(r.idMeal, r);
          }
        }
        result = Array.from(unionMap.values());
      }
      setRecipes(result);

      if (result.length === 0) {
        setErrorMessage("No recipes found matching your ingredients.");
      }
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setRecipes([]);
      setErrorMessage("Error fetching recipes. Please try again.");
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  return (
    <div className="ingredient-page">
      {/* Header */}
      <header className="ingredient-header">
        <div className="profile">
          <img src={userImage} alt="User" className="profile-img" />
          <span className="profile-name">Hello, Shalley!</span>
        </div>
      </header>
      {/* Bell Icon */}
      <div className="bell-icon">
        <i className="fas fa-bell icon"></i>
      </div>


      <div ref={textRef} className={`banner-text ${textVisible ? 'animate' : ''}`}>
        <h2>
          <span className="are-you">Are you</span>
          <span className="hungry">Hungry??</span>
        </h2>
        <p>Prepare food in minutes with me</p>
        <button className="banner-button" onClick={() => inputSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}>Cook Now</button>
      </div>
      {/* Promo Banner */}

      <section className="promo-banner">

      </section>
      <div className="banner-content">
        <div className="banner-image" ref={bannerRef}>
          <img className={bannerVisible ? "animate" : ""} src={require("../../assets/multidish1.png")} alt="Delicious Food" />
        </div>
      </div>

      {/* Moving dishes */}
      <div className="dish-container">
        <div className="dish-track">
          {dishList.map((dish, index) => (
            <img key={index} src={dish} alt={`Dish ${index + 1}`} />
          ))}
        </div>
      </div>

      {/* Input Section */}
      <section className="ingredient-input-section" ref={inputSectionRef}>
        <h1 className="page-title">Find Recipes with the Ingredients You Already Have</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter ingredient (e.g., Paneer)"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        {/* Ingredients List */}
        <div className="ingredients-list">
          {ingredientsList.map((item, idx) => (
            <div key={idx} className="ingredient-chip">
              {item} <span onClick={() => handleRemove(item)}>✖</span>
            </div>
          ))}
        </div>

        {/* Search Button */}
        <div className="search-button-container">
          <button className="search-recipe-btn" onClick={handleSearch}>
            {loading ? "Searching..." : "Search Recipes"}
          </button>
        </div>
      </section>

      {/* Popular Recipes Heading and Section - shown only after search */}
      {searched && (
        <>
          <h2 className="popular-recipes-heading">Popular Recipes</h2>

          {/* Recipe Cards Section */}
          <section className="recipe-cards-section">
            {errorMessage ? (
              <p className="no-recipes-message">{errorMessage}</p>
            ) : recipes.length > 0 ? (
              recipes.map((recipe) => (
                <InputRecipeCard
                  key={recipe.idMeal}
                  idMeal={recipe.idMeal} // Fetch full details in card
                  image={recipe.strMealThumb}
                  title={recipe.strMeal}
                  description="Click to view details"
                />
              ))
            ) : null}
          </section>
        </>
      )}
    </div>
  );
};

export default IngredientInput;

