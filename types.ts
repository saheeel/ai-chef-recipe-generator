
export interface Ingredient {
  name: string;
  quantity: string;
}

export interface RecipeData {
  needsClarification?: false; // Optional, to help distinguish from ClarificationResponse
  title: string;
  description:string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: Ingredient[];
  instructions: string[];
  chefNotes?: string;
}

export interface ClarificationResponse {
  needsClarification: true;
  clarificationMessage: string;
}

export type GenerateRecipeResult = RecipeData | ClarificationResponse;
