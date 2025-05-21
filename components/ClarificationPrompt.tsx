
import React from 'react';

interface ClarificationPromptProps {
  message: string;
}

const ClarificationPrompt: React.FC<ClarificationPromptProps> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="my-8 p-6 bg-blue-900 bg-opacity-40 border-2 border-blue-700 text-blue-200 rounded-lg shadow-md max-w-2xl mx-auto text-center animate-fadeIn" role="status">
      <div className="flex items-center justify-center mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.79 4 4s-1.79 4-4 4c-1.742 0-3.223-.835-3.772-2M9 12l3 3m0 0l3-3m-3 3v6m-6 0h12A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <h3 className="font-bold text-xl text-blue-300">Need a little more information!</h3>
      </div>
      <p className="text-md">{message}</p>
      <p className="text-sm mt-2 text-gray-400">Please refine your search above to get the perfect recipe.</p>
    </div>
  );
};

export default ClarificationPrompt;
