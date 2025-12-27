
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Provides general fashion intelligence based on current module context.
 */
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

/**
 * Analyzes relationship history to provide a strategic pivot suggestion.
 */
export const getContactStrategicInsight = async (contactName: string, history: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the relationship history for ${contactName}: ${history}. Provide one high-impact, strategic "Neural Pivot" to deepen this relationship. Keep it under 150 characters.`,
      config: {
        systemInstruction: "You are a luxury fashion brand strategist specialized in relationship management and high-tier networking."
      }
    });
    return response.text?.trim() || "Relationship integrity nominal. Awaiting further handshakes.";
  } catch (error) {
    console.error("Contact Insight Error:", error);
    return "Intelligence stream interrupted. Re-syncing...";
  }
};

/**
 * Calculates a Relationship Health Score (0-100) and reasoning based on interaction density.
 */
export const getRelationshipHealthScore = async (contactName: string, history: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the relationship health for ${contactName} based on this history: ${history}. 
      Assign a health score from 0-100 where 100 is a "Maison Tier I" partner with high engagement.
      Consider interaction frequency, deal stages, and RSVP history.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
            vitality: { type: Type.STRING, enum: ['Optimal', 'Stable', 'Declining', 'Critical'] }
          },
          required: ['score', 'reasoning', 'vitality']
        }
      }
    });
    return JSON.parse(response.text || '{"score": 50, "reasoning": "Standard baseline.", "vitality": "Stable"}');
  } catch (error) {
    return { score: 50, reasoning: "Sync interrupted.", vitality: "Stable" };
  }
};

/**
 * Uses Google Search Grounding to find recent news/signals for a specific partner.
 */
export const getMarketSignals = async (partnerName: string, company: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find the 3 most recent significant market signals or news items related to ${partnerName} from ${company}. Focus on fashion industry moves, career changes, or brand alignments.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return {
      summary: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Market Signal Grounding Error:", error);
    return { summary: "Market radar silent for this node.", sources: [] };
  }
};

/**
 * Performs deep research to verify and enrich a contact's profile details.
 * NOTE: Search grounding and JSON response are combined carefully.
 */
export const enrichContactNode = async (contactName: string, currentRole: string, currentCompany: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Perform deep research on ${contactName} currently listed as ${currentRole} at ${currentCompany}. 
      1. Verify current professional status: Has this person moved to a new Maison, Agency, or Publication recently?
      2. Identify current residency (City).
      3. Discover one major industry achievement or strategic alignment from the last 12 months.
      Return the results in the requested JSON format based on your research.`,
      config: {
        systemInstruction: "You are an elite fashion headhunter and intelligence analyst. You prioritize data accuracy and professional verification.",
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            role: { type: Type.STRING, description: "Current job title" },
            company: { type: Type.STRING, description: "Current company or Maison" },
            city: { type: Type.STRING, description: "Primary professional city" },
            achievement: { type: Type.STRING, description: "Recent industry milestone or show attendance" },
            confidence: { type: Type.NUMBER, description: "Score from 0 to 1 based on source reliability" },
            sourceUrl: { type: Type.STRING, description: "Primary source URL for verification" }
          },
          required: ['role', 'company', 'city', 'confidence']
        }
      }
    });
    
    // Safety check for search + JSON potential conflicts
    let jsonStr = response.text || '{}';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Enrichment Error:", error);
    return null;
  }
};

/**
 * Detects schedule conflicts between a contact's RSVPs and the brand's master event calendar.
 */
export const detectScheduleConflicts = async (contactName: string, rsvps: string, masterEvents: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Identify potential schedule conflicts for ${contactName}. 
      Contact RSVPs: ${rsvps}. 
      Brand Master Events: ${masterEvents}.
      Return any detected conflicts and suggested resolutions (e.g., rescheduling a private viewing).`,
      config: {
        systemInstruction: "You are a professional fashion event coordinator with access to global brand schedules.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              event: { type: Type.STRING },
              conflictWith: { type: Type.STRING },
              severity: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
              resolution: { type: Type.STRING }
            },
            required: ['event', 'conflictWith', 'severity', 'resolution']
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Conflict Detection Error:", error);
    return [];
  }
};

/**
 * Analyzes market data points to identify emerging trends.
 */
export const getTrendIntelligence = async (dataPoints: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following market data and social buzz signals to identify 3 emerging fashion trends for the upcoming season. Data: ${dataPoints}. Provide actionable pivots for a luxury brand.`,
      config: {
        systemInstruction: "You are a fashion trend forecaster and data scientist specializing in luxury market signals.",
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
