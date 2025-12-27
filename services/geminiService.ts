
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI SDK using process.env.API_KEY directly as per strict guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFashionIntelligence = async (context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide fashion intelligence insights for the following context: ${context}. Return 3 actionable strategic suggestions.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              type: { type: Type.STRING, enum: ['action', 'warning', 'info'] }
            },
            required: ['title', 'description', 'type']
          }
        }
      }
    });
    
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Gemini API Error:", error);
    return [];
  }
};

export const getTrendIntelligence = async (dataPoints: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following market data and social buzz signals to identify 3 emerging fashion trends for the upcoming season. Data: ${dataPoints}. Provide actionable pivots for a luxury brand.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Short trend name" },
              description: { type: Type.STRING, description: "Explanation of the signal and why it matters" },
              sentiment: { type: Type.STRING, enum: ['Rising', 'Stable', 'Volatile'] },
              impactScore: { type: Type.NUMBER, description: "Scale 1-100" }
            },
            required: ['title', 'description', 'sentiment', 'impactScore']
          }
        }
      }
    });
    
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Trend Analysis Error:", error);
    return [];
  }
};
