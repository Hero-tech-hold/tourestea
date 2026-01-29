
import { GoogleGenAI, Type } from "@google/genai";

// Always use the API key exclusively from process.env.API_KEY as per guidelines.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const summarizeReview = async (review: string): Promise<string> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize this travel review in one short sentence: "${review}"`,
    });
    // Accessing .text property directly as it returns the string output.
    return response.text || "No summary available.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI Insight currently unavailable.";
  }
};

export const analyzeSentiment = async (text: string): Promise<{ sentiment: 'Good' | 'Bad', confidence: number }> => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the sentiment of this travel review: "${text}". Return only a JSON object with "sentiment" (Good/Bad) and "confidence" (0-1).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING },
            confidence: { type: Type.NUMBER }
          },
          required: ["sentiment", "confidence"]
        }
      }
    });
    // Accessing .text property directly and parsing the result.
    return JSON.parse(response.text || '{"sentiment": "Good", "confidence": 0.5}');
  } catch (error) {
    return { sentiment: 'Good', confidence: 0 };
  }
};
