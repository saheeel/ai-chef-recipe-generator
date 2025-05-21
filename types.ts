
export interface Ingredient {
  name: string;
  quantity: string;
}

export interface RecipeData {
  title: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: Ingredient[];
  instructions: string[];
  chefNotes?: string;
}
