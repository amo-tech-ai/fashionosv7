
import { GoogleGenAI, Type } from "@google/genai";
import { BrandDNA, ChannelNode, NPIScore, BrandProfile, ShotItem, Shoot } from "../types";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

async function retryWithBackoff<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  let delay = 1000;
  for (let i = 0; i < maxRetries; i++) {
    try { return await fn(); } catch (error: any) {
      if ((error?.message?.includes('429') || error?.status === 429) && i < maxRetries - 1) {
        await new Promise(r => setTimeout(r, delay));
        delay *= 2; continue;
      }
      throw error;
    }
  }
  return fn();
}

/**
 * AI-powered Shot List Generation grounded in Brand DNA
 */
export const generateShotList = async (concept: string, dna: BrandDNA): Promise<ShotItem[]> => {
  return retryWithBackoff(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate a high-end fashion shot list for the concept: "${concept}". 
      The shots MUST strictly adhere to this Brand DNA: ${JSON.stringify(dna)}.
      Include technical framing and lighting instructions for each shot.`,
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              description: { type: Type.STRING },
              lighting: { type: Type.STRING },
              framing: { type: Type.STRING },
              dnaAlignment: { type: Type.NUMBER }
            },
            required: ['id', 'description', 'lighting', 'framing', 'dnaAlignment']
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  });
};

/**
 * Analyze a Shoot concept for potential DNA drift
 */
export const analyzeShootConcept = async (concept: string, dna: BrandDNA) => {
  return retryWithBackoff(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this shoot concept: "${concept}" against the Brand DNA: ${JSON.stringify(dna)}. 
      Identify any potential drift and suggest corrections to maintain brand integrity.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            driftScore: { type: Type.NUMBER }, // 0-100, 100 is high drift
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ['driftScore', 'warnings', 'suggestions']
        }
      }
    });
    return JSON.parse(response.text || '{}');
  });
};

// ... Rest of the services (Onboarding & CRM) maintained below ...

export const extractBrandDNA = async (url: string): Promise<BrandDNA> => {
  return retryWithBackoff(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Perform a deep visual audit of the brand website: ${url}. 
      Extract their visual DNA signature: Color palette (Hex), lighting style, composition rules, and core motifs.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            colorPalette: { type: Type.ARRAY, items: { type: Type.STRING } },
            lightingStyle: { type: Type.STRING },
            compositionRules: { type: Type.ARRAY, items: { type: Type.STRING } },
            motifs: { type: Type.ARRAY, items: { type: Type.STRING } },
            luxuryTier: { type: Type.STRING, enum: ['Ultra-Luxury', 'Luxury', 'Contemporary', 'Premium', 'High-Street'] }
          },
          required: ['colorPalette', 'lightingStyle', 'compositionRules', 'motifs', 'luxuryTier']
        }
      }
    });
    return JSON.parse(response.text || '{}');
  });
};

export const detectBrandChannels = async (brandName: string, domain: string): Promise<ChannelNode[]> => {
  return retryWithBackoff(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Find all verified sales and social channels for "${brandName}" (Domain: ${domain}). 
      Check for Amazon Stores, Shopify setups, Pinterest, and TikTok. Return valid URLs.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING, enum: ['Amazon', 'Shopify', 'Instagram', 'TikTok', 'Pinterest', 'Official'] },
              url: { type: Type.STRING },
              verified: { type: Type.BOOLEAN },
              confidence: { type: Type.NUMBER }
            },
            required: ['type', 'url', 'verified', 'confidence']
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  });
};

export const performDeepBrandAnalysis = async (name: string, dna: BrandDNA) => {
  return retryWithBackoff(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Maison Name: ${name}. DNA Signature: ${JSON.stringify(dna)}.
      Define the brand's core DNA pillars (3-5), target customer personas (2), and a strategic positioning summary.`,
      config: {
        thinkingConfig: { thinkingBudget: 2000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pillars: { type: Type.ARRAY, items: { type: Type.STRING } },
            personas: { type: Type.ARRAY, items: { type: Type.STRING } },
            positioning: { type: Type.STRING }
          },
          required: ['pillars', 'personas', 'positioning']
        }
      }
    });
    return JSON.parse(response.text || '{}');
  });
};

export const calculateNPI = async (brandData: any): Promise<NPIScore> => {
  return retryWithBackoff(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Calculate the Neural Performance Index (0-100) for this Maison data: ${JSON.stringify(brandData)}.
      Weigh clarity, reach, readiness, and consistency. Provide a short strategic summary.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            total: { type: Type.NUMBER },
            breakdown: {
              type: Type.OBJECT,
              properties: {
                clarity: { type: Type.NUMBER },
                reach: { type: Type.NUMBER },
                readiness: { type: Type.NUMBER },
                consistency: { type: Type.NUMBER }
              },
              required: ['clarity', 'reach', 'readiness', 'consistency']
            },
            summary: { type: Type.STRING }
          },
          required: ['total', 'breakdown', 'summary']
        }
      }
    });
    return JSON.parse(response.text || '{}');
  });
};

export const getFashionIntelligence = async (context: string) => {
  return retryWithBackoff(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this context: ${context}, provide 2-3 fashion industry insights including titles and descriptions.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ['title', 'description']
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  });
};

export const getContactStrategicInsight = async (name: string, hist: string) => {
  return retryWithBackoff(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a one-sentence strategic insight for my relationship with ${name} based on this history: ${hist}.`,
    });
    return response.text || "Continue active relationship management.";
  });
};

export const getRelationshipHealthScore = async (name: string, hist: string): Promise<{score: number, reasoning: string, vitality: string}> => {
  return retryWithBackoff(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Evaluate relationship health with ${name} (History: ${hist}). Return a score (0-100), reasoning, and vitality (Optimal, Stable, or At Risk).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            reasoning: { type: Type.STRING },
            vitality: { type: Type.STRING }
          },
          required: ['score', 'reasoning', 'vitality']
        }
      }
    });
    return JSON.parse(response.text || '{"score": 50, "reasoning": "Standard interaction detected", "vitality": "Stable"}');
  });
};

export const getMarketSignals = async (name: string, co: string): Promise<{summary: string, sources: any[]}> => {
  return retryWithBackoff(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Search for recent market signals, news, or moves for ${name} and their company ${co}. Provide a summary of findings.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return {
      summary: response.text || "No major market signals detected via neural mesh.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  });
};

export const enrichContactNode = async (name: string, role: string, co: string) => {
  return retryWithBackoff(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Enrich contact data for ${name} who is a ${role} at ${co}. Find current company, verified role, city, and a recent notable professional achievement.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            role: { type: Type.STRING },
            company: { type: Type.STRING },
            city: { type: Type.STRING },
            achievement: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            sourceUrl: { type: Type.STRING }
          },
          required: ['role', 'company', 'city', 'achievement', 'confidence']
        }
      }
    });
    return JSON.parse(response.text || '{}');
  });
};

export const detectScheduleConflicts = async (name: string, rsvp: string, master: string) => {
  return retryWithBackoff(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Check for conflicts for ${name}. RSVPs: ${rsvp}. Master Schedule: ${master}. Identify overlaps and provide a resolution.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              event: { type: Type.STRING },
              resolution: { type: Type.STRING }
            },
            required: ['event', 'resolution']
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  });
};

export const getTrendIntelligence = async (data: string) => {
  return retryWithBackoff(async () => {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze these market trend points: ${data} and return actionable insights.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ['title', 'description']
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  });
};
