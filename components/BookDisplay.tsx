
import React, { useState } from 'react';
import { Book } from '../types';
import { exportToPDF } from '../utils/pdfExport';

interface BookDisplayProps {
  book: Book;
}

const BookDisplay: React.FC<BookDisplayProps> = ({ book }) => {
  const [activeChapter, setActiveChapter] = useState(0);

  const handleDownload = () => {
    const fullContent = book.chapters.map(c => `${c.title}\n\n${c.content}`).join('\n\n---\n\n');
    exportToPDF(book.title, fullContent);
  };

  return (
    <div className="mt-12 bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
      {/* Sidebar - Sumário */}
      <div className="w-full md:w-64 bg-rose-50/50 border-r border-rose-100 p-6">
        <h3 className="font-serif text-xl text-rose-800 font-bold mb-6">Sumário</h3>
        <ul className="space-y-2">
          {book.chapters.map((chapter, idx) => (
            <li key={idx}>
              <button
                onClick={() => setActiveChapter(idx)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                  activeChapter === idx 
                    ? 'bg-rose-500 text-white shadow-md font-bold' 
                    : 'text-rose-700 hover:bg-rose-100'
                }`}
              >
                Cap {idx + 1}: {chapter.title}
              </button>
            </li>
          ))}
        </ul>
        
        <button 
          onClick={handleDownload}
          className="mt-8 w-full py-3 bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg hover:bg-emerald-600 transition-colors"
        >
          📥 Baixar Livro Completo
        </button>
      </div>

      {/* Content - Leitura */}
      <div className="flex-1 p-8 md:p-12 bg-white relative">
        <div className="max-w-2xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="font-serif text-4xl text-rose-900 font-bold mb-4">{book.title}</h1>
            <div className="h-1 w-24 bg-rose-200 mx-auto"></div>
          </header>

          <h2 className="text-2xl font-serif text-rose-800 font-bold mb-8">
            Capítulo {activeChapter + 1}: {book.chapters[activeChapter].title}
          </h2>

          <div className="prose prose-rose prose-lg max-w-none text-slate-700 leading-relaxed space-y-6">
            {book.chapters[activeChapter].content.split('\n').map((para, i) => (
              para.trim() ? <p key={i}>{para}</p> : null
            ))}
          </div>

          <div className="mt-16 flex justify-between items-center border-t pt-8 border-rose-100">
            <button 
              disabled={activeChapter === 0}
              onClick={() => setActiveChapter(v => v - 1)}
              className="text-rose-500 font-bold disabled:opacity-30"
            >
              ← Capítulo Anterior
            </button>
            <span className="text-slate-300 text-sm">Página {activeChapter + 1} de {book.chapters.length}</span>
            <button 
              disabled={activeChapter === book.chapters.length - 1}
              onClick={() => setActiveChapter(v => v + 1)}
              className="text-rose-500 font-bold disabled:opacity-30"
            >
              Próximo Capítulo →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDisplay;
