export const fetchRecipesByIngredient = async (ingredient) => {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await res.json();
    return data.meals || [];
  } catch (err) {
    console.error("Error fetching recipes:", err);
    return [];
  }
};


// Fetch full recipe details by idMeal
export const fetchRecipeById = async (idMeal) => {
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    const data = await res.json();
    return data.meals ? data.meals[0] : null;
  } catch (err) {
    console.error("Error fetching recipe by ID:", err);
    return null;
  }
};

