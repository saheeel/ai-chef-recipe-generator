
import React from 'react';
import { RecipeData, Ingredient } from '../types';

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 inline mr-1.5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 inline mr-1.5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

// Fix: Define RecipeDisplayProps interface
interface RecipeDisplayProps {
  recipe: RecipeData;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  return (
    <div className="my-8 p-6 md:p-8 bg-gray-800 bg-opacity-50 rounded-xl shadow-2xl max-w-3xl mx-auto text-gray-200 animate-fadeInUp backdrop-blur-sm border border-gray-700">
      <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4 text-center">{recipe.title}</h2>
      <p className="text-gray-400 mb-6 text-center italic text-lg">{recipe.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center">
        <div className="bg-gray-700/50 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-purple-300 flex items-center justify-center"><ClockIcon className="text-purple-400" />Prep Time</h3>
          <p className="text-gray-300 mt-1">{recipe.prepTime}</p>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-pink-400 flex items-center justify-center"><ClockIcon className="text-pink-400" />Cook Time</h3>
          <p className="text-gray-300 mt-1">{recipe.cookTime}</p>
        </div>
        <div className="bg-gray-700/50 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-teal-300 flex items-center justify-center"><UsersIcon className="text-teal-400" />Servings</h3>
          <p className="text-gray-300 mt-1">{recipe.servings}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-100 mb-3 border-b-2 border-gray-700 pb-2">Ingredients</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-300 pl-2">
          {recipe.ingredients.map((ingredient: Ingredient, index: number) => (
            <li key={index} className="text-lg">
              <span className="font-medium text-gray-100">{ingredient.name}:</span> {ingredient.quantity}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-100 mb-3 border-b-2 border-gray-700 pb-2">Instructions</h3>
        <ol className="list-decimal list-inside space-y-3 text-gray-300 pl-2">
          {recipe.instructions.map((step: string, index: number) => (
            <li key={index} className="text-lg leading-relaxed">{step}</li>
          ))}
        </ol>
      </div>

      {recipe.chefNotes && recipe.chefNotes.trim() !== "" && (
        <div>
          <h3 className="text-2xl font-semibold text-gray-100 mb-3 border-b-2 border-gray-700 pb-2">
            <span role="img" aria-label="lightbulb" className="mr-2">💡</span>Chef's Notes
          </h3>
          <p className="text-gray-300 italic text-lg leading-relaxed bg-gray-700/50 p-4 rounded-md">{recipe.chefNotes}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeDisplay;