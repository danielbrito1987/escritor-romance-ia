
import { GoogleGenAI, Type } from "@google/genai";
import { BookParams, BookOutline, Chapter } from "../types";

const MODEL_NAME = "gemini-3-pro-preview"; // Usando Pro para melhor coerência narrativa longa

export const generateBookOutline = async (params: BookParams): Promise<BookOutline> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  
  const chaptersCount = params.bookSize === 'pequeno' ? 3 : params.bookSize === 'médio' ? 5 : 8;

  const prompt = `
    Crie o esboço de um livro de romance completo com ${chaptersCount} capítulos.
    Protagonistas: ${params.personagem1} e ${params.personagem2}.
    Cenário: ${params.cenario}.
    Tom: ${params.tom}.
    Final esperado: ${params.final}.
    
    O retorno deve ser um objeto JSON contendo um "bookTitle" criativo e uma lista de "chapters" com "chapterNumber", "title" e um "summary" detalhado do que acontece naquele capítulo para guiar a escrita posterior.
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          bookTitle: { type: Type.STRING },
          chapters: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                chapterNumber: { type: Type.NUMBER },
                title: { type: Type.STRING },
                summary: { type: Type.STRING }
              }
            }
          }
        },
        required: ["bookTitle", "chapters"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateChapterContent = async (
  params: BookParams, 
  outline: BookOutline, 
  chapterIndex: number,
  previousChapters: Chapter[]
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  const currentChapter = outline.chapters[chapterIndex];
  
  const lengthInstruction = params.chapterLength === 'curto' ? 'cerca de 300 palavras' : params.chapterLength === 'médio' ? 'cerca de 600 palavras' : 'mais de 1000 palavras com riqueza extrema de detalhes';

  const context = previousChapters.length > 0 
    ? `Nos capítulos anteriores: ${previousChapters.map((c, i) => `Cap ${i+1}: ${c.title}`).join(', ')}.`
    : "Este é o capítulo de abertura.";

  const prompt = `
    Você é a escritora Ana Clara. Escreva o Capítulo ${currentChapter.chapterNumber}: "${currentChapter.title}" do livro "${outline.bookTitle}".
    
    Resumo do capítulo: ${currentChapter.summary}
    Contexto da obra: ${context}
    
    Personagens: ${params.personagem1} e ${params.personagem2}.
    Tom: ${params.tom}.
    Tamanho desejado: ${lengthInstruction}.

    Instruções de Estilo:
    - Foco em diálogos realistas e tensão emocional.
    - Descrições sensoriais profundas.
    - Não finalize a história prematuramente a menos que seja o último capítulo.
    - Se for o último capítulo, aplique o desfecho: ${params.final}.
    - Retorne apenas o texto do corpo do capítulo, sem o título no topo.
  `;

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: prompt,
    config: {
      systemInstruction: "Você é Ana Clara, romancista premiada. Sua especialidade é criar arcos de personagens profundos ao longo de vários capítulos.",
      temperature: 0.8
    }
  });

  return response.text;
};
