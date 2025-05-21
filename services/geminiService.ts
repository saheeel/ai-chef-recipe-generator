
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RecipeData, ClarificationResponse, GenerateRecipeResult } from '../types';

// Initialize Gemini AI client directly with process.env.API_KEY
// Assuming API_KEY is pre-configured and valid as per guidelines.
// The '!' asserts that process.env.API_KEY is non-null. This relies on external configuration.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! }); 

export const generateRecipe = async (foodDesire: string): Promise<GenerateRecipeResult> => {
  // Check for API key at the time of function call
  if (!process.env.API_KEY) {
    // This error should be caught by App.tsx and displayed to the user.
    throw new Error("API Key for Gemini is not configured. Cannot generate recipes. Please ensure the API_KEY environment variable is set.");
  }

  const model = ai.models;

  const prompt = `
You are an expert culinary AI. A user wants a recipe for: "${foodDesire}".

Your primary goal is to provide a useful response.
First, assess if the user's request "${foodDesire}" is specific enough to generate a meaningful recipe.
- If the request is too vague (e.g., "food", "something tasty", "dinner", "healthy meal", "a dessert"), respond with a JSON object asking for clarification. This JSON object MUST strictly follow this structure: 
  {"needsClarification": true, "clarificationMessage": "Your request is a bit vague. Could you please provide more details, like a main ingredient (e.g., chicken, salmon), cuisine type (e.g., Italian, Mexican), meal type (e.g., breakfast, quick lunch), or dietary preference (e.g., vegan, gluten-free)?"}
- If the request is specific enough to generate a good quality recipe, then generate a complete and delicious recipe. The recipe JSON object MUST strictly follow this structure:
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

THE RESPONSE MUST BE A SINGLE, VALID JSON OBJECT. 
Do not include any text, comments, or markdown formatting (like \`\`\`json ... \`\`\`) outside of this single JSON object.
Ensure all string values within the JSON are properly escaped if they contain special characters (e.g., double quotes).

Detailed field descriptions for recipes:
- title: A concise and appealing title (e.g., "Classic Spaghetti Carbonara").
- description: A brief, enticing summary (1-2 sentences, e.g., "A rich and creamy Italian pasta dish...").
- prepTime: Estimated preparation time (e.g., "15 minutes").
- cookTime: Estimated cooking time (e.g., "20 minutes").
- servings: Number of people the recipe serves (e.g., "4 servings").
- ingredients: An array of objects, each with "name" (e.g., "Spaghetti") and "quantity" (e.g., "400g", "1/2 cup"). Be precise.
- instructions: An array of strings, each a clear, step-by-step instruction.
- chefNotes: Optional helpful tips, variations, or serving suggestions. If no notes, provide an empty string "" or omit the field.

Focus on clarity, taste, and practicality.
If generating a recipe, ensure it's well-structured and easy to follow.
If asking for clarification, ensure the message is helpful and guides the user.
`;

  try {
    const response: GenerateContentResponse = await model.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
      config: {
        responseMimeType: "application/json", // Crucial for ensuring JSON output
        temperature: 0.6, // Slightly lower temp for more predictable JSON structure
      },
    });

    let jsonStr = response.text.trim();
    
    // Backup: Remove potential markdown fences if present, though responseMimeType: "application/json" should prevent this.
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/si;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr) as GenerateRecipeResult;

      if (parsedData.needsClarification === true) {
        // It's a ClarificationResponse
        if (typeof (parsedData as ClarificationResponse).clarificationMessage === 'string') {
          return parsedData as ClarificationResponse;
        } else {
          throw new Error("AI requested clarification but message is missing or invalid.");
        }
      } else {
        // It should be RecipeData
        const recipe = parsedData as RecipeData;
        if (!recipe.title || !recipe.ingredients || !recipe.instructions) {
          console.error("AI response is missing essential recipe fields. Raw:", jsonStr, "Parsed:", recipe);
          throw new Error("AI response is missing essential recipe fields despite not asking for clarification.");
        }
        return recipe;
      }
    } catch (e: any) {
      console.error("Failed to parse JSON response from AI or validate structure:", e.message, "Raw response text from AI:", response.text);
      // Include more details from the AI's raw response if possible
      let detail = e.message;
      if (response && response.text && response.text.length < 200) { // Avoid logging overly long raw texts
        detail += ` (AI raw text: ${response.text.substring(0,100)}...)`;
      }
      throw new Error(`Failed to process or parse recipe data from AI. ${detail}`);
    }
  } catch (error: any) {
    console.error("Error generating recipe with Gemini API:", error);
    if (error.message && error.message.toLowerCase().includes("api key")) { // Broader check for API key issues
        throw new Error("Invalid or missing API Key for Gemini. Please check your configuration.");
    }
    // Add more context to the error thrown
    const errorMessage = error.message || 'Unknown API error';
    const errorDetails = error.details || (error.response ? JSON.stringify(error.response.data) : '');
    throw new Error(`Failed to generate recipe: ${errorMessage}${errorDetails ? ` Details: ${errorDetails}` : ''}`);
  }
};
