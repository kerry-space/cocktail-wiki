import { CocktailCard } from "../components/CocktailCard";
import { useEffect } from "react";
import { useCocktailFunc } from "../hooks/useCocktalFunc";

import "./Home.css";

export function Home() {
  const { cocktails,fetchRandomCocktail } = useCocktailFunc();
 


  useEffect(() => {
    fetchRandomCocktail(getRandomLetter()); 
  }, []);
  const getRandomLetter = () => {
    const letters = "abcdefghijklmnopqrstvwxyz";
    return letters[Math.floor(Math.random() * letters.length)];
  };

  return (
    <div className="home-wrapper">
     <div className="home-header">
     <h1>Welcome to Cocktail Wiki</h1>
      
      <div className="home-actions">
        <button
          className="cta-button"
          onClick={() => fetchRandomCocktail(getRandomLetter())}
        >
          Generate random cocktail
        </button>
      </div>
     </div>
     
      <div className="cocktail-card">
        <CocktailCard cocktails={cocktails} />
      </div>
    </div>
  );
}
