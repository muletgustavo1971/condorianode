
import React from 'react';
import { EXAMPLE_PROMPTS } from '../constants';

interface SidebarProps {
  onPromptClick: (prompt: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onPromptClick }) => {
  return (
    <aside className="w-64 bg-slate-900 p-6 flex-col hidden md:flex">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-sky-400">Cóndor IA</h1>
        <p className="text-sm text-slate-400 mt-1">Ministerio de Seguridad y Justicia</p>
      </div>
      <nav className="flex-1">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Consultas Rápidas</h2>
        <ul className="space-y-2">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <li key={prompt.text}>
              <button
                onClick={() => onPromptClick(prompt.text)}
                className="w-full text-left flex items-center p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/70 transition-colors duration-200"
              >
                <span className="mr-3 text-lg">{prompt.icon}</span>
                <span className="text-sm text-slate-300">{prompt.text}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto">
         <p className="text-xs text-slate-500 text-center">Propuesta para Diplomatura</p>
         <p className="text-sm font-semibold text-sky-400/50 text-center mt-1">Delta IT - UM</p>
      </div>
    </aside>
  );
};
