
import React from 'react';
import { BookParams, StoryTone, BookSize, ChapterLength, StoryEnding, ModelType } from '../types';
import { TONES, BOOK_SIZES, CHAPTER_LENGTHS, ENDINGS, AI_MODELS } from '../constants';

interface BookFormProps {
  onSubmit: (params: BookParams) => void;
  isLoading: boolean;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<BookParams>({
    personagem1: '',
    personagem2: '',
    cenario: '',
    tom: 'paixão',
    bookSize: 'pequeno',
    chapterLength: 'médio',
    final: 'feliz',
    modelType: 'flash',
    tema: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.personagem1 || !formData.personagem2 || !formData.cenario) {
      alert("Por favor, preencha as informações básicas.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl border border-rose-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-rose-700 mb-2">Protagonista 1</label>
          <input
            type="text"
            value={formData.personagem1}
            onChange={e => setFormData(p => ({...p, personagem1: e.target.value}))}
            placeholder="Nome e breve descrição"
            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-rose-700 mb-2">Protagonista 2</label>
          <input
            type="text"
            value={formData.personagem2}
            onChange={e => setFormData(p => ({...p, personagem2: e.target.value}))}
            placeholder="Nome e breve descrição"
            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-rose-700 mb-2">Cenário Principal</label>
        <input
          type="text"
          value={formData.cenario}
          onChange={e => setFormData(p => ({...p, cenario: e.target.value}))}
          placeholder="Onde a magia acontece?"
          className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 outline-none"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-semibold text-rose-700 mb-2">Volume do Livro</label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-rose-200 outline-none"
            value={formData.bookSize}
            onChange={e => setFormData(p => ({...p, bookSize: e.target.value as BookSize}))}
          >
            {BOOK_SIZES.map(s => <option key={s.value} value={s.value}>{s.label} ({s.description})</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-rose-700 mb-2">Tamanho do Capítulo</label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-rose-200 outline-none"
            value={formData.chapterLength}
            onChange={e => setFormData(p => ({...p, chapterLength: e.target.value as ChapterLength}))}
          >
            {CHAPTER_LENGTHS.map(l => <option key={l.value} value={l.value}>{l.label} ({l.words})</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-rose-700 mb-2">Tom</label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-rose-200 outline-none"
            value={formData.tom}
            onChange={e => setFormData(p => ({...p, tom: e.target.value as StoryTone}))}
          >
            {TONES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-rose-700 mb-2">Inteligência (IA)</label>
          <select 
            className="w-full px-4 py-3 rounded-xl border border-rose-200 outline-none"
            value={formData.modelType}
            onChange={e => setFormData(p => ({...p, modelType: e.target.value as ModelType}))}
          >
            {AI_MODELS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-rose-700 mb-2">Desfecho</label>
        <div className="flex flex-wrap gap-2">
          {ENDINGS.map(e => (
            <button
              key={e.value}
              type="button"
              onClick={() => setFormData(p => ({...p, final: e.value as StoryEnding}))}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                formData.final === e.value ? 'bg-rose-500 text-white shadow-md' : 'bg-rose-50 text-rose-400 border border-rose-100'
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-rose-500 to-pink-600 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
      >
        {isLoading ? 'Escrevendo sua Obra-Prima...' : '✨ Começar a Escrever Livro'}
      </button>
    </form>
  );
};

export default BookForm;
