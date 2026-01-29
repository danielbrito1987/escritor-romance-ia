
import React from 'react';
import { Theme } from './types';

export const THEMES: Theme[] = [
  { id: 'praia', name: 'Encontro na Praia', description: 'O som das ondas e o sol poente.', icon: '🏖️' },
  { id: 'chuva', name: 'Beijo na Chuva', description: 'Uma tempestade inesperada e um abrigo compartilhado.', icon: '🌧️' },
  { id: 'biblioteca', name: 'Amor Literário', description: 'Entre estantes e sussurros em uma biblioteca antiga.', icon: '📚' },
  { id: 'viagem', name: 'Trem do Destino', description: 'Um encontro casual em uma viagem pela Europa.', icon: '🚂' },
  { id: 'infancia', name: 'Amigos de Infância', description: 'Um reencontro após muitos anos longe.', icon: '🧸' },
];

export const TONES = [
  { value: 'paixão', label: 'Ardente & Apaixonado', color: 'bg-red-100 text-red-700' },
  { value: 'drama', label: 'Dramático & Intenso', color: 'bg-purple-100 text-purple-700' },
  { value: 'leve', label: 'Leve & Divertido', color: 'bg-sky-100 text-sky-700' },
  { value: 'clássico', label: 'Clássico & Elegante', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'proibido', label: 'Amor Proibido', color: 'bg-slate-100 text-slate-700' },
];

export const ENDINGS = [
  { value: 'feliz', label: 'Feliz para Sempre', description: 'O final clássico e aquecedor.' },
  { value: 'agridoce', label: 'Agridoce', description: 'Realista, com ganhos e perdas.' },
  { value: 'triste', label: 'Trágico', description: 'Prepare os lenços, o amor dói.' },
  { value: 'aberto', label: 'Final Aberto', description: 'Deixe o leitor imaginar o destino.' },
  { value: 'surpreendente', label: 'Surpreendente', description: 'Uma reviravolta que ninguém espera.' },
];

export const LENGTHS = [
  { value: 'curta', label: 'Curta (300 palavras)' },
  { value: 'média', label: 'Média (600 palavras)' },
  { value: 'longa', label: 'Longa (1000+ palavras)' },
];
