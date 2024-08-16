import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCocktailFunc } from "../hooks/useCocktalFunc";
import { ICocktail } from "../interface";

import "./CocktailDetail.css"

export function CocktailDetail(): ReactElement {
    const { id } = useParams<{ id: string }>();
    const {lookupCocktailDetailsById } = useCocktailFunc();
    const [cocktail, setCocktail] = useState<ICocktail | null>(null);
  
    useEffect(() => {
        const fetchCocktail = async () => {
            if (id) {
                const foundCocktail = await lookupCocktailDetailsById(id); 
                if (foundCocktail) {
                    setCocktail(foundCocktail);
                }
            }
        };

        fetchCocktail();
    }, [id, lookupCocktailDetailsById]);
  
    if (!cocktail) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="cocktail-detail">
        <h1>{cocktail.strDrink}</h1>
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-image" />
        <p><strong>Category:</strong> {cocktail.strCategory}</p>
        {cocktail.strTags && <p><strong>Tags:</strong> {cocktail.strTags}</p>}
        <p><strong>Glass:</strong> {cocktail.strGlass}</p>
        
        <h3>Ingredients</h3>
        <ul className="ingredients-list">
          {cocktail.ingredients.map((item, index) => (
            <li key={index}>
              <span className="measure"><strong>Measure:</strong> {item.measure}</span>
              <span className="ingredient"><strong>Ingredient:</strong> {item.ingredient}</span>
            </li>
          ))}
        </ul>
  
        <h3>Instructions</h3>
        <p>{cocktail.strInstructions}</p>
      </div>
    );
  }