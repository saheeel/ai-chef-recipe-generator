import React, { useState, useEffect } from 'react';

const foodEmojis = ['🍎', '🍌', '🍇', '🍓', '🥝', '🍍', '🥕', '🥦', '🌽', '🍅', '🍆', '🌶️', '🥑', '🍊', '🍋', '🍉', '🍑', '🥭'];

const LoadingIndicator: React.FC = () => {
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentEmojiIndex((prevIndex) => (prevIndex + 1) % foodEmojis.length);
    }, 300); // Change emoji every 300ms

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-12 text-center animate-fadeIn">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-pink-400 border-opacity-30 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-purple-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
        <span 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl transition-opacity duration-150 ease-in-out"
          // Add a key to help React re-render the span smoothly, helps with transitions if any were applied
          key={currentEmojiIndex} 
          style={{opacity: 1}} // Ensure opacity for smooth change if CSS transitions were added
        >
          {foodEmojis[currentEmojiIndex]}
        </span>
      </div>
      <p className="mt-6 text-pink-400 font-semibold text-xl">
        Whipping up something special...
      </p>
      <p className="text-gray-400 text-sm">Your recipe is moments away.</p>
    </div>
  );
};

export default LoadingIndicator;