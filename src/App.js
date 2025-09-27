import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import IngredientInput from './components/IngredientInput/IngredientInput'; 
import RecipeDetails from './components/RecipeDetails/RecipeDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the Homepage (Landing Page) */}
        <Route path="/" element={<HomePage />} />
        
        {/* Route for the Ingredient Input Page */}
        <Route path="/input" element={<IngredientInput />} />
        
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
};

export default App;