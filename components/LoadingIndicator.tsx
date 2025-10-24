
import React from 'react';

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 bg-slate-700 px-5 py-3 rounded-2xl rounded-bl-none">
      <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
    </div>
  );
};
