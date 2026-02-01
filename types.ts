
export type StoryTone = 'paixão' | 'drama' | 'leve' | 'clássico' | 'proibido';
export type ChapterLength = 'curto' | 'médio' | 'longo';
export type BookSize = 'pequeno' | 'médio' | 'grande';
export type StoryEnding = 'feliz' | 'agridoce' | 'triste' | 'aberto' | 'surpreendente';
export type ModelType = 'flash' | 'pro';

export interface ChapterOutline {
  chapterNumber: number;
  title: string;
  summary: string;
}

export interface BookOutline {
  bookTitle: string;
  chapters: ChapterOutline[];
}

export interface Chapter {
  title: string;
  content: string;
}

export interface Book {
  id: string;
  title: string;
  chapters: Chapter[];
  params: BookParams;
  date: string;
}

export interface BookParams {
  personagem1: string;
  personagem2: string;
  cenario: string;
  tom: StoryTone;
  chapterLength: ChapterLength;
  bookSize: BookSize;
  final: StoryEnding;
  modelType: ModelType;
  tema?: string;
}

export interface SavedStory {
  id: string;
  title: string;
  content: string;
  date: string;
  params: any;
  bookData?: Book;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  icon: string;
}
