import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-amber-100 text-center p-6 mt-auto">
      <p>&copy; {new Date().getFullYear()} AI Chef. Crafted with <span role="img" aria-label="heart">❤️</span> and AI. Powered by Gemini.</p>
    </footer>
  );
};

export default Footer;