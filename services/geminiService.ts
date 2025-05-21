
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RecipeData } from '../types';

// Initialize Gemini AI client directly with process.env.API_KEY
// Assuming API_KEY is pre-configured and valid as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! }); 

export const generateRecipe = async (foodDesire: string): Promise<RecipeData> => {
  // Check for API key at the time of function call
  if (!process.env.API_KEY) {
    throw new Error("API Key for Gemini is not configured. Cannot generate recipes.");
  }

  const model = ai.models;

  const prompt = `
You are an expert culinary AI. A user wants a recipe for: "${foodDesire}".
Your task is to generate a complete and delicious recipe.

The response MUST be a single, valid JSON object. Do not include any text outside of this JSON object, including markdown fences.
The JSON object should strictly follow this structure:

{
  "title": "string",
  "description": "string",
  "prepTime": "string",
  "cookTime": "string",
  "servings": "string",
  "ingredients": [
    { "name": "string", "quantity": "string" }
  ],
  "instructions": ["string", "string", ...],
  "chefNotes": "string" 
}

Detailed field descriptions:
- title: A concise and appealing title (e.g., "Classic Spaghetti Carbonara").
- description: A brief, enticing summary (1-2 sentences, e.g., "A rich and creamy Italian pasta dish...").
- prepTime: Estimated preparation time (e.g., "15 minutes").
- cookTime: Estimated cooking time (e.g., "20 minutes").
- servings: Number of people the recipe serves (e.g., "4 servings").
- ingredients: An array of objects, each with "name" (e.g., "Spaghetti") and "quantity" (e.g., "400g", "1/2 cup"). Be precise.
- instructions: An array of strings, each a clear, step-by-step instruction.
- chefNotes: Optional helpful tips, variations, or serving suggestions. If no notes, provide an empty string "".

Ensure all string values are properly escaped if they contain special characters.
Generate the best possible recipe based on the user's request.
Focus on clarity, taste, and practicality.
`;

  try {
    // Use simplified 'contents' field for single text prompt
    const response: GenerateContentResponse = await model.generateContent({
      model: 'gemini-2.5-flash-preview-04-17', // Correct model name
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7, // A bit of creativity
      },
    });

    let jsonStr = response.text.trim();
    
    // Remove potential markdown fences if present (though responseMimeType: "application/json" should prevent this)
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/si;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr);
      // Basic validation (can be more thorough)
      if (!parsedData.title || !parsedData.ingredients || !parsedData.instructions) {
        throw new Error("AI response is missing essential recipe fields.");
      }
      return parsedData as RecipeData;
    } catch (e: any) {
      console.error("Failed to parse JSON response from AI:", e.message, "Raw response:", response.text);
      throw new Error(`Failed to parse recipe data from AI. Details: ${e.message}`);
    }
  } catch (error: any) {
    console.error("Error generating recipe with Gemini API:", error);
    if (error.message && error.message.includes("API_KEY_INVALID")) {
        throw new Error("Invalid API Key for Gemini. Please check your configuration.");
    }
    throw new Error(`Failed to generate recipe: ${error.message || 'Unknown API error'}`);
  }
};
