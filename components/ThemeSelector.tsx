
import React from 'react';
import { THEMES } from '../constants';
import { Theme } from '../types';

interface ThemeSelectorProps {
  onSelect: (theme: Theme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="mb-10 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
      <div className="flex gap-4">
        {THEMES.map(theme => (
          <button
            key={theme.id}
            onClick={() => onSelect(theme)}
            className="flex-shrink-0 flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-rose-50 hover:border-rose-300 hover:shadow-md transition-all group min-w-[200px]"
          >
            <span className="text-3xl group-hover:scale-125 transition-transform">{theme.icon}</span>
            <div className="text-left">
              <h4 className="text-rose-700 font-bold text-sm leading-tight">{theme.name}</h4>
              <p className="text-slate-500 text-[10px] leading-tight mt-1">{theme.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
