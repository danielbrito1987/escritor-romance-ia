
export type StoryTone = 'paixão' | 'drama' | 'leve' | 'clássico' | 'proibido';
export type StoryLength = 'curta' | 'média' | 'longa';

export interface StoryParams {
  personagem1: string;
  personagem2: string;
  cenario: string;
  tom: StoryTone;
  comprimento: StoryLength;
  tema?: string;
}

export interface SavedStory {
  id: string;
  title: string;
  content: string;
  date: string;
  params: StoryParams;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  icon: string;
}
