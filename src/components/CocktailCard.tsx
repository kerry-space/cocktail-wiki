import { ReactElement } from "react";
import { ICocktail } from "../interface";
import { Link } from "react-router-dom";
import { useCocktailFunc } from "../hooks/useCocktalFunc";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';

import "./CocktailCard.css";

interface ICocktailProps {
  cocktails: ICocktail[];
}

export function CocktailCard({ cocktails }: ICocktailProps): ReactElement {
  const { removeFavorite, addFavorite, isFavorite } = useCocktailFunc();

  return (
    <div>
        
      <div className="cocktail-list">
        {cocktails.map((cocktail: ICocktail) => (
          <div key={cocktail.idDrink} className="cocktail-item">
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            <h2>{cocktail.strDrink}</h2>
            <div className="cocktail-actions">
              <Link to={`/cocktail/${cocktail.idDrink}`} className="see-more-link">
                <button className="see-more-btn">See more</button>
              </Link>
              <i onClick={() => isFavorite(cocktail.idDrink) ? removeFavorite(cocktail.idDrink) : addFavorite(cocktail)}>
                <FontAwesomeIcon 
                  icon={isFavorite(cocktail.idDrink) ? faHeart : faHeartOutline} 
                  className="favorite-icon"
                />
              </i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}