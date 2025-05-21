
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import UserInput from './components/UserInput';
import RecipeDisplay from './components/RecipeDisplay';
import LoadingIndicator from './components/LoadingIndicator';
import ErrorDisplay from './components/ErrorDisplay';
import ClarificationPrompt from './components/ClarificationPrompt'; // Import new component
import { RecipeData, GenerateRecipeResult, ClarificationResponse } from './types';
import { generateRecipe } from './services/geminiService';

const App: React.FC = () => {
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [clarificationMessage, setClarificationMessage] = useState<string | null>(null);
  const [showRecipeSection, setShowRecipeSection] = useState<boolean>(false);

  const navigateToHome = useCallback(() => {
    setRecipe(null);
    setError(null);
    setIsLoading(false);
    setClarificationMessage(null);
    setShowRecipeSection(false);
  }, []);

  const handleGetRecipe = useCallback(async (foodDesire: string) => {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    setClarificationMessage(null);
    setShowRecipeSection(true);

    try {
      // API Key check is now solely within generateRecipe service
      const result: GenerateRecipeResult = await generateRecipe(foodDesire);

      if (result.needsClarification === true) {
        setClarificationMessage((result as ClarificationResponse).clarificationMessage);
      } else {
        setRecipe(result as RecipeData);
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred while fetching the recipe.');
      console.error("Error in handleGetRecipe:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      <Header onNavigateHome={navigateToHome} />
      <main className="flex-grow flex flex-col items-center justify-center pt-8 pb-16 px-4 w-full">
        {!showRecipeSection && (
          <div className="text-center w-full max-w-3xl animate-fadeIn">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4">
              <span className="block">What do you want to</span>
              <span className="text-gradient-blue-pink block">cook today?</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-xl mx-auto">
              Let our AI chef find the perfect recipe for you
            </p>
          </div>
        )}
        
        <UserInput onSubmit={handleGetRecipe} isLoading={isLoading} />

        {showRecipeSection && (
          <div className="mt-12 w-full max-w-3xl">
            {isLoading && <LoadingIndicator />}
            {clarificationMessage && !isLoading && !error && <ClarificationPrompt message={clarificationMessage} />}
            {error && !isLoading && <ErrorDisplay message={error} />}
            {recipe && !isLoading && !error && !clarificationMessage && <RecipeDisplay recipe={recipe} />}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
