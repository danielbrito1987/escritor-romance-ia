
import { GoogleGenAI } from "@google/genai";
import { StoryParams } from "../types";

export const generateStory = async (params: StoryParams): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key não configurada. Por favor, verifique o ambiente.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Crie uma história de romance original em português brasileiro com os seguintes detalhes:
    - Personagem 1: ${params.personagem1}
    - Personagem 2: ${params.personagem2}
    - Cenário: ${params.cenario}
    - Tom: ${params.tom}
    - Comprimento desejado: ${params.comprimento}
    ${params.tema ? `- Tema adicional: ${params.tema}` : ''}

    Instruções para a escritora Ana Clara:
    - Use tensão emocional palpável.
    - Diálogos naturais e fluidos.
    - Descrições sensoriais (cheiros, toques, sons).
    - Final feliz e satisfatório.
    - O texto deve ser formatado em parágrafos claros.
    - Adicione um título romântico e criativo no topo.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Você é Ana Clara, uma renomada escritora brasileira de romances contemporâneos e de época. Sua escrita é envolvente, rica em detalhes emocionais e sempre termina com uma nota de esperança e amor.",
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text || "Desculpe, não consegui gerar sua história de amor agora.";
  } catch (error) {
    console.error("Erro ao gerar história:", error);
    throw new Error("Falha ao conectar com a IA. Tente novamente em instantes.");
  }
};
