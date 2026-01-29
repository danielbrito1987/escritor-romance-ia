
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StoryForm from './components/StoryForm';
import StoryDisplay from './components/StoryDisplay';
import StoryHistory from './components/StoryHistory';
import ThemeSelector from './components/ThemeSelector';
import { StoryParams, SavedStory, Theme } from './types';
import { generateStory } from './services/geminiService';

const App: React.FC = () => {
  const [currentStory, setCurrentStory] = useState<string | null>(null);
  const [history, setHistory] = useState<SavedStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('romance_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar histórico", e);
      }
    }
  }, []);

  // Save history when it changes
  useEffect(() => {
    localStorage.setItem('romance_history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async (params: StoryParams) => {
    setIsLoading(true);
    setError(null);
    setCurrentStory(null);

    try {
      const result = await generateStory(params);
      setCurrentStory(result);
      
      // Save to history automatically
      const title = result.split('\n')[0] || "Sem Título";
      const newSaved: SavedStory = {
        id: Date.now().toString(),
        title,
        content: result,
        date: new Date().toLocaleDateString('pt-BR'),
        params
      };
      setHistory(prev => [newSaved, ...prev]);
      
      // Scroll to story
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 300);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteStory = (id: string) => {
    setHistory(prev => prev.filter(s => s.id !== id));
  };

  const selectStoryFromHistory = (story: SavedStory) => {
    setCurrentStory(story.content);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleThemeSelect = (theme: Theme) => {
    // We can pre-fill parts of the form or just scroll to it
    alert(`Tema "${theme.name}" selecionado! Preencha os protagonistas para começar.`);
    const formElement = document.getElementById('story-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pb-20 px-4 max-w-5xl mx-auto">
      <Header />
      
      <main>
        <div className="mb-8">
           <h3 className="text-rose-800 font-bold mb-4 flex items-center gap-2">
            <span>💡</span> Escolha um Tema Inspirador
           </h3>
           <ThemeSelector onSelect={handleThemeSelect} />
        </div>

        <div id="story-form">
          <StoryForm onSubmit={handleGenerate} isLoading={isLoading} />
        </div>

        {error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-center font-medium animate-bounce">
            ⚠️ {error}
          </div>
        )}

        {currentStory && (
          <StoryDisplay content={currentStory} />
        )}

        <StoryHistory 
          stories={history} 
          onDelete={deleteStory} 
          onSelect={selectStoryFromHistory} 
        />
      </main>

      <footer className="mt-20 pt-8 border-t border-rose-100 text-center text-rose-300 text-sm italic">
        Criado com ❤️ por Escritor de Romances IA
      </footer>
    </div>
  );
};

export default App;
