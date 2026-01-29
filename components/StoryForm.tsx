
import React from 'react';
import { StoryParams, StoryTone, StoryLength } from '../types';
import { TONES, LENGTHS } from '../constants';

interface StoryFormProps {
  onSubmit: (params: StoryParams) => void;
  isLoading: boolean;
}

const StoryForm: React.FC<StoryFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<StoryParams>({
    personagem1: '',
    personagem2: '',
    cenario: '',
    tom: 'paixão',
    comprimento: 'média',
    tema: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.personagem1 || !formData.personagem2 || !formData.cenario) {
      alert("Por favor, preencha os nomes dos personagens e o cenário.");
      return;
    }
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl border border-rose-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-rose-700 mb-2">Protagonista 1</label>
          <input
            type="text"
            name="personagem1"
            value={formData.personagem1}
            onChange={handleChange}
            placeholder="Ex: Clara, uma pintora solitária"
            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-rose-700 mb-2">Protagonista 2</label>
          <input
            type="text"
            name="personagem2"
            value={formData.personagem2}
            onChange={handleChange}
            placeholder="Ex: Gabriel, um músico viajante"
            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-rose-700 mb-2">Cenário</label>
        <input
          type="text"
          name="cenario"
          value={formData.cenario}
          onChange={handleChange}
          placeholder="Ex: Um café em Paris sob a chuva"
          className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-rose-700 mb-2">Tom da História</label>
          <div className="flex flex-wrap gap-2">
            {TONES.map(t => (
              <button
                key={t.value}
                type="button"
                onClick={() => setFormData(p => ({ ...p, tom: t.value as StoryTone }))}
                className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  formData.tom === t.value 
                    ? 'ring-2 ring-rose-500 scale-105 shadow-md ' + t.color
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-rose-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-rose-700 mb-2">Comprimento</label>
          <select
            name="comprimento"
            value={formData.comprimento}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-rose-200 focus:ring-2 focus:ring-rose-400 outline-none"
          >
            {LENGTHS.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${
          isLoading ? 'bg-rose-300 cursor-not-allowed' : 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700'
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Escrevendo sua história...
          </>
        ) : (
          <>
            <span className="text-xl">✨</span>
            Gerar Romance Mágico
          </>
        )}
      </button>
    </form>
  );
};

export default StoryForm;
