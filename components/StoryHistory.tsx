
import React from 'react';
import { SavedStory } from '../types';

interface StoryHistoryProps {
  stories: SavedStory[];
  onDelete: (id: string) => void;
  onSelect: (story: SavedStory) => void;
}

const StoryHistory: React.FC<StoryHistoryProps> = ({ stories, onDelete, onSelect }) => {
  if (stories.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-serif text-rose-800 font-bold mb-6 flex items-center gap-2">
        <span>📖</span> Biblioteca de Emoções
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stories.map(story => (
          <div 
            key={story.id} 
            className="group bg-white p-5 rounded-2xl shadow-md border border-rose-50 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div 
              className="cursor-pointer"
              onClick={() => onSelect(story)}
            >
              <h3 className="text-rose-700 font-bold mb-1 truncate group-hover:text-rose-500">{story.title}</h3>
              <p className="text-slate-400 text-xs mb-3">{story.date}</p>
              <p className="text-slate-600 text-sm line-clamp-3 italic">"{story.content.substring(0, 150)}..."</p>
            </div>
            
            <div className="mt-4 flex justify-between items-center border-t pt-3 border-rose-50">
               <span className="text-[10px] uppercase font-bold text-rose-300 tracking-wider">
                {story.params.tom}
               </span>
               <button 
                onClick={(e) => { e.stopPropagation(); onDelete(story.id); }}
                className="text-slate-300 hover:text-red-500 transition-colors p-1"
                title="Excluir"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryHistory;
