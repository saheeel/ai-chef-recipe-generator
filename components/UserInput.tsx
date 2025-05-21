import React, { useState } from 'react';

interface UserInputProps {
  onSubmit: (foodDesire: string) => void;
  isLoading: boolean;
}

const SearchIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
  </svg>
);

const SparkleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75V4h1.5a.75.75 0 010 1.5H10.75V7.25a.75.75 0 01-1.5 0V5.5H7.75a.75.75 0 010-1.5H9.25V2.75A.75.75 0 0110 2zM5.524 6.064a.75.75 0 011.06 0l.688.687a.75.75 0 01-1.06 1.06l-.688-.687a.75.75 0 010-1.06zM12.728 6.064a.75.75 0 011.06 0l.688.687a.75.75 0 11-1.06 1.06l-.688-.687a.75.75 0 010-1.06zM6.604 12.728a.75.75 0 010 1.06l-.688.687a.75.75 0 01-1.06-1.06l.688-.687a.75.75 0 011.06 0zm6.124 1.06a.75.75 0 011.06 0l.688.687a.75.75 0 11-1.06 1.06l-.688-.687a.75.75 0 010-1.06zM10 12a.75.75 0 01.75.75V14h1.5a.75.75 0 010 1.5H10.75V17.25a.75.75 0 01-1.5 0V15.5H7.75a.75.75 0 010-1.5H9.25V12.75A.75.75 0 0110 12z" clipRule="evenodd" />
  </svg>
);


const UserInput: React.FC<UserInputProps> = ({ onSubmit, isLoading }) => {
  const [foodDesire, setFoodDesire] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (foodDesire.trim() && !isLoading) {
      onSubmit(foodDesire.trim());
    }
  };

  return (
    // Removed animated-gradient-border-container div
    <div className="w-full max-w-xl md:max-w-2xl mx-auto mt-2"> 
      <form 
        onSubmit={handleSubmit} 
        className="relative flex items-center w-full bg-gray-800/70 shadow-xl rounded-full p-1.5 backdrop-blur-sm border border-gray-700/50" // Added a subtle border for definition
      >
        <div className="pl-3 pr-2 text-gray-500">
          <SearchIcon className="w-5 h-5" />
        </div>
        <input
          type="text"
          id="foodDesire"
          value={foodDesire}
          onChange={(e) => setFoodDesire(e.target.value)}
          placeholder="Try 'vegetarian dinner' or 'quick breakfast'..."
          className="flex-grow p-3 bg-transparent text-gray-100 placeholder-gray-500 focus:outline-none text-base sm:text-lg"
          disabled={isLoading}
          aria-label="Describe what you want to cook"
        />
        <button
          type="submit"
          disabled={isLoading || foodDesire.trim() === ''}
          className={`ml-2 flex items-center justify-center py-3 px-5 sm:px-7 rounded-full text-base sm:text-lg font-semibold text-white transition-all duration-200 ease-in-out
            ${(isLoading || foodDesire.trim() === '') 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transform hover:scale-105 button-gradient-shimmer'
            }`}
          aria-label="Generate Recipe"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <SparkleIcon className="w-5 h-5 mr-2 hidden sm:inline" />
              <span>Cook It</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default UserInput;