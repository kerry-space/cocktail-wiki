import { createContext, ReactElement, ReactNode, useEffect, useState } from "react";
import { ICocktail, ICocktailContext, IngredientMeasurement } from "../interface";

interface ICocktailProviderProps {
    children: ReactNode;
}

export const CocktailContext = createContext<ICocktailContext>({} as ICocktailContext);

export function CocktailProvider({ children }: ICocktailProviderProps): ReactElement {
  
    const [cocktails, setCocktails] = useState<ICocktail[]>([]);
    const [searchCache, setSearchCache] = useState<Map<string, ICocktail[]>>(new Map());
    const [favorites, setFavorites] = useState<ICocktail[]>(() => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    });



    function processCocktail(drink: ICocktail): ICocktail {
        const ingredients: IngredientMeasurement[] = [];

        // util function: Collect ingredients and their corresponding measurements
        for (let i = 1; i <= 15; i++) {
            const ingredientKey = `strIngredient${i}` as keyof typeof drink;
            const measureKey = `strMeasure${i}` as keyof typeof drink;

            const ingredient = drink[ingredientKey] as string | null;
            const measure = drink[measureKey] as string | null;

            if (ingredient) {
                ingredients.push({ ingredient, measure });
            }
        }

        return {
            idDrink: drink.idDrink,
            strDrink: drink.strDrink,
            strDrinkThumb: drink.strDrinkThumb,
            strCategory: drink.strCategory,
            strTags: drink.strTags,
            strGlass: drink.strGlass,
            strInstructions: drink.strInstructions,
            ingredients,
            dateModified: drink.dateModified || null,
        };
    }

    const fetchRandomCocktail = async (value: string) => {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            const processedCocktails: ICocktail[] = data.drinks.map((drink: ICocktail) => processCocktail(drink));

            setCocktails(processedCocktails);

        } catch (error) {
            console.error("Error fetching random cocktail:", error);
        }
    };

    const advancedSearchCocktails = async (params: { name?: string, category?: string, ingredient?: string, glass?: string }): Promise<ICocktail[]> => {
        const cacheKey = JSON.stringify(params);

        if (searchCache.has(cacheKey)) {
            console.log("reaccive from cache")
            return searchCache.get(cacheKey) || [];
        }

        try {
            let queryUrl = '';

            if (params.name) {
                queryUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${params.name}`;
            } else if (params.ingredient) {
                queryUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${params.ingredient}`;
            } else if (params.category) {
                queryUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${params.category}`;
            } else if (params.glass) {
                queryUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${params.glass}`;
            } else {
                throw new Error('At least one search parameter must be provided');
            }

            const response = await fetch(queryUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const processedCocktails: ICocktail[] = data.drinks.map((drink: ICocktail) => processCocktail(drink));
            setSearchCache(new Map(searchCache).set(cacheKey, processedCocktails));

            return processedCocktails;
        } catch (error) {
            console.error("Error fetching cocktails:", error);
            return [];
        }
    };

    const lookupCocktailDetailsById = async (id: string): Promise<ICocktail | null> => {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (!data.drinks || data.drinks.length === 0) {
                return null;
            }

            return processCocktail(data.drinks[0]);
        } catch (error) {
            console.error("Error fetching cocktail by ID:", error);
            return null;
        }
    };


    const addFavorite = (cocktail: ICocktail) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = [...prevFavorites, cocktail];
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };

    const removeFavorite = (idDrink: string) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = prevFavorites.filter(fav => fav.idDrink !== idDrink);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            return updatedFavorites;
        });
    };


    const isFavorite = (idDrink: string): boolean => {
        return favorites.some((item) => item.idDrink === idDrink);
    };

    const values: ICocktailContext = {
        cocktails,
        fetchRandomCocktail,
        advancedSearchCocktails,
        lookupCocktailDetailsById,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    }

    return (
        <CocktailContext.Provider value={values}>
            {children}
        </CocktailContext.Provider>
    );
}