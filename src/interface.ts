

export interface IngredientMeasurement {
    ingredient: string;
    measure: string | null;
}

export interface ICocktail {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strCategory: string;
    strTags: string[] | null;
    strGlass: string;
    strInstructions: string;
    ingredients: IngredientMeasurement[];
    dateModified: string | null;
}

export interface ICocktailContext {
    cocktails: ICocktail[];
    favorites: ICocktail[];
    fetchRandomCocktail: (value : string) => Promise<void>;
    advancedSearchCocktails: ((params: { name?: string, category?: string, ingredient?: string, glass?: string }) => Promise<ICocktail[]>);
    lookupCocktailDetailsById: (id: string) => Promise<ICocktail | null>;
    addFavorite: (cocktail: ICocktail) => void;
    removeFavorite: (idDrink: string) => void;
    isFavorite: (idDrink: string) => boolean;
}