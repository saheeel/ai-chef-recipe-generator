import React from 'react';

const ChefHatIcon: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.75 3.093C12.521 3.033 12.266 3 12 3C10.068 3 8.458 4.037 7.68 5.546C7.784 5.533 7.89 5.523 8 5.523C8.269 5.523 8.529 5.554 8.779 5.612C9.118 4.639 10.013 4.001 11.112 3.802C11.075 4.348 11.213 4.91 11.527 5.355C11.711 5.624 12.013 5.833 12.397 5.941C12.987 6.107 13.797 6.006 14.447 5.645C15.062 5.304 15.5 4.749 15.5 4.094C15.5 3.643 15.273 3.217 14.907 2.907C14.417 2.501 13.637 2.365 12.938 2.538L12.75 3.093ZM6 7.023C6 6.458 6.448 6.023 7 6.023H17C17.552 6.023 18 6.458 18 7.023V8.023H6V7.023ZM4 9.023C4 8.458 4.448 8.023 5 8.023H19C19.552 8.023 20 8.458 20 9.023V10.023C20 11.552 19.44 12.939 18.518 13.955C19.408 14.206 20 14.991 20 15.873C20 17.138 18.922 18.123 17.65 18.123H6.35C5.078 18.123 4 17.138 4 15.873C4 14.991 4.592 14.206 5.482 13.955C4.561 12.939 4 11.552 4 10.023V9.023ZM12 19.023C12.552 19.023 13 19.471 13 20.023V21.023H11V20.023C11 19.471 11.448 19.023 12 19.023Z" />
  </svg>
);

interface HeaderProps {
  onNavigateHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateHome }) => {
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Prevent default anchor behavior
    onNavigateHome();
  };

  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-gray-950">
      <div className="container mx-auto flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 logo-hover-effect cursor-pointer"
          onClick={onNavigateHome}
          role="button" // For accessibility, as div is clickable
          tabIndex={0} // Make it focusable
          onKeyDown={(e) => e.key === 'Enter' && onNavigateHome()} // Allow keyboard activation
          aria-label="Navigate to homepage"
        >
          <ChefHatIcon className="w-7 h-7 text-purple-400" />
          <span className="text-2xl font-bold">
            <span className="text-gradient-purple-pink">Cook</span> 
            <span className="text-gradient-purple-pink">Genius</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <a 
            href="#" 
            onClick={handleNavClick} 
            className="text-gray-300 hover:text-white transition-colors duration-150"
          >
            Home
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-150">Saved Recipes</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors duration-150">About</a>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu button placeholder */}
          <button className="text-gray-300 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;