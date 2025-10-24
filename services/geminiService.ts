import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

let ragContextCache: string | null = null;

async function getRagContext(): Promise<string> {
  if (ragContextCache) {
    return ragContextCache;
  }
  try {
    const [reportsResponse, vehiclesResponse] = await Promise.all([
      fetch('/reports_911.txt'),
      fetch('/vehicle_thefts.csv')
    ]);

    if (!reportsResponse.ok || !vehiclesResponse.ok) {
        console.error('Failed to load knowledge base files.', {
            reportsStatus: reportsResponse.status,
            vehiclesStatus: vehiclesResponse.status
        });
      throw new Error('Failed to load knowledge base files.');
    }

    const reportsText = await reportsResponse.text();
    const vehiclesText = await vehiclesResponse.text();

    const context = `
CONTEXTO DE INFORMACIÓN:
---
[INICIO DE REPORTES 911]
${reportsText}
[FIN DE REPORTES 911]
---
[INICIO DE LISTADO DE VEHÍCULOS CON PEDIDO DE SECUESTRO]
${vehiclesText}
[FIN DE LISTADO DE VEHÍCULOS CON PEDIDO DE SECUESTRO]
---
`;
    ragContextCache = context;
    return context;
  } catch (error) {
    console.error("Error loading RAG context:", error);
    throw new Error("Could not load knowledge base.");
  }
}


export async function getAiResponse(prompt: string): Promise<string> {
  try {
    const context = await getRagContext();
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${context}\n\nPregunta del usuario: ${prompt}`,
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        }
    });

    return response.text;

  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to get response from Gemini API.");
  }
}
