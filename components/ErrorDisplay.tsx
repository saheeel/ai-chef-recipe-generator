import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="my-8 p-6 bg-red-900 bg-opacity-30 border-2 border-red-700 text-red-300 rounded-lg shadow-md max-w-2xl mx-auto text-center animate-fadeIn" role="alert">
      <div className="flex items-center justify-center mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <h3 className="font-bold text-xl text-red-400">Oops! Something Went Wrong</h3>
      </div>
      <p className="text-md">{message}</p>
      <p className="text-sm mt-2 text-gray-400">Please check your query or API key and try again.</p>
    </div>
  );
};

export default ErrorDisplay;