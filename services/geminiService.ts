
import { GoogleGenAI } from "@google/genai";
import { StoryParams } from "../types";

export const generateStory = async (params: StoryParams): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key não configurada. Por favor, verifique o ambiente.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Mapeamento de instruções específicas para o final
  const endingInstructions = {
    feliz: "A história deve ter um final feliz e satisfatório, onde o amor triunfa.",
    agridoce: "O final deve ser agridoce: há amor, mas também uma aceitação melancólica de algo que foi perdido ou que não pode ser.",
    triste: "O final deve ser triste ou trágico, focando na dor da perda ou da separação, buscando uma catarse emocional profunda.",
    aberto: "O final deve ser aberto, deixando o destino dos personagens sugestivo e à imaginação do leitor.",
    surpreendente: "O final deve conter uma reviravolta (plot twist) romântica ou situacional que mude a perspectiva da história até ali."
  };

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
    - DESFECHO: ${endingInstructions[params.final]}
    - O texto deve ser formatado em parágrafos claros.
    - Adicione um título romântico e criativo no topo.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Você é Ana Clara, uma renomada escritora brasileira de romances. Sua escrita é envolvente e rica em detalhes emocionais. Você é versátil e capaz de escrever desde contos de fadas modernos até tragédias românticas intensas, sempre mantendo a elegância e a profundidade dos personagens.",
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
