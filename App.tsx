
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BookDisplay from './components/BookDisplay';
import StoryHistory from './components/StoryHistory';
import ThemeSelector from './components/ThemeSelector';
import { BookParams, Book, Chapter, BookOutline } from './types';
import { generateBookOutline, generateChapterContent } from './services/geminiService';
import BookForm from './components/BookForm';

const App: React.FC = () => {
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, stage: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('romance_books_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleGenerateBook = async (params: BookParams) => {
    setIsLoading(true);
    setError(null);
    setCurrentBook(null);
    
    try {
      // Step 1: Outline
      setProgress({ current: 0, total: 1, stage: 'Planejando a estrutura narrativa...' });
      const outline: BookOutline = await generateBookOutline(params);
      
      const totalChapters = outline.chapters.length;
      const writtenChapters: Chapter[] = [];

      // Step 2: Sequential Writing
      for (let i = 0; i < totalChapters; i++) {
        setProgress({ 
          current: i + 1, 
          total: totalChapters, 
          stage: `Escrevendo Capítulo ${i + 1}: ${outline.chapters[i].title}...` 
        });
        
        const content = await generateChapterContent(params, outline, i, writtenChapters);
        writtenChapters.push({
          title: outline.chapters[i].title,
          content
        });
      }

      const finalBook: Book = {
        id: Date.now().toString(),
        title: outline.bookTitle,
        chapters: writtenChapters,
        params,
        date: new Date().toLocaleDateString('pt-BR')
      };

      setCurrentBook(finalBook);
      setHistory(prev => [finalBook, ...prev]);
      localStorage.setItem('romance_books_history', JSON.stringify([finalBook, ...history]));

    } catch (err: any) {
      setError("A Ana Clara teve um bloqueio criativo: " + err.message);
    } finally {
      setIsLoading(false);
      setProgress({ current: 0, total: 0, stage: '' });
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4 max-w-6xl mx-auto">
      <Header />
      
      <main>
        {!currentBook && (
          <div className="mb-12">
            <ThemeSelector onSelect={(t) => alert(`Tema ${t.name} selecionado! Agora defina os detalhes do seu livro.`)} />
            <BookForm onSubmit={handleGenerateBook} isLoading={isLoading} />
          </div>
        )}

        {isLoading && (
          <div className="my-12 p-8 bg-white rounded-3xl shadow-xl text-center border-2 border-rose-100 animate-pulse">
            <div className="w-full bg-rose-50 h-4 rounded-full overflow-hidden mb-6">
              <div 
                className="bg-rose-500 h-full transition-all duration-500" 
                style={{ width: `${(progress.current / progress.total) * 100}%` }}
              ></div>
            </div>
            <h3 className="text-rose-800 font-serif text-2xl font-bold mb-2">{progress.stage}</h3>
            <p className="text-rose-400 italic">Isso pode levar alguns minutos, estamos criando um mundo inteiro para você.</p>
          </div>
        )}

        {error && (
          <div className="p-6 bg-red-50 text-red-600 rounded-2xl mb-8 border border-red-100">
            {error}
          </div>
        )}

        {currentBook && (
          <div className="mb-12">
            <button 
              onClick={() => setCurrentBook(null)}
              className="mb-4 text-rose-500 font-bold flex items-center gap-2 hover:underline"
            >
              ← Escrever outro livro
            </button>
            <BookDisplay book={currentBook} />
          </div>
        )}

        {history.length > 0 && !isLoading && (
          <div className="mt-20 border-t pt-12 border-rose-100">
            <h2 className="text-3xl font-serif text-rose-800 font-bold mb-8">Sua Estante de Obras</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {history.map((book: any) => (
                <div 
                  key={book.id}
                  onClick={() => setCurrentBook(book)}
                  className="bg-white p-6 rounded-2xl shadow-md border border-rose-50 cursor-pointer hover:shadow-xl transition-all group"
                >
                  <div className="w-12 h-1 bg-rose-300 mb-4 group-hover:w-full transition-all"></div>
                  <h4 className="text-rose-700 font-bold mb-2">{book.title}</h4>
                  <p className="text-slate-400 text-xs mb-4">{book.date} • {book.chapters?.length || 0} Capítulos</p>
                  <button className="text-rose-400 text-sm font-bold group-hover:text-rose-600 transition-colors">Abrir Livro →</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
