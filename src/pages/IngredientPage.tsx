import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCocktailFunc } from "../hooks/useCocktalFunc";
import { ICocktail, IIngredient } from "../interface";

export function IngredientPage(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const { lookupIngredientDetailsById } = useCocktailFunc();
  const [ingredient, setIngredient] = useState<IIngredient | null>(null);

  useEffect(() => {
    if (id) {
      lookupIngredientDetailsById(id).then((data) => {
        setIngredient(data);
      });
    }
  }, [id]);

  if (!ingredient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ingredient-detail">
      <h1>{ingredient.name}</h1>
      <p><strong>Description:</strong> {ingredient.description}</p>
      <p><strong>Type:</strong> {ingredient.type}</p>
      <p><strong>Alcoholic:</strong> {ingredient.isAlcoholic ? "Yes" : "No"}</p>
      {ingredient.isAlcoholic && ingredient.ABV && (
        <p><strong>ABV:</strong> {ingredient.ABV}%</p>
      )}
      <h3>Related Cocktails</h3>
      <div className="related-cocktails">
        {ingredient.relatedCocktails.length > 0 ? (
          ingredient.relatedCocktails.map((cocktail: ICocktail) => (
            <div key={cocktail.idDrink}>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <p>{cocktail.strDrink}</p>
            </div>
          ))
        ) : (
          <p>No related cocktails found.</p>
        )}
      </div>
    </div>
  );
}