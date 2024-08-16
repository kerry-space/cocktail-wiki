import React, { ReactElement, useState } from "react";
import "./SearchCocktails.css"; // Custom styles for the search page
import { useCocktailFunc } from "../hooks/useCocktalFunc";
import { ICocktail } from "../interface";
import { CocktailCard } from "../components/CocktailCard";



export function SearchCocktails(): ReactElement {
  const { advancedSearchCocktails } = useCocktailFunc();
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [ingredient, setIngredient] = useState<string>("");
  const [glass, setGlass] = useState<string>("");
 
  const [results, setResults] = useState<ICocktail[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [error, setError] = useState<string>(""); // State for managing error messages
  const resultsPerPage = 10;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Ensure that at least one field is filled
    if (!name && !category && !ingredient && !glass) {
      setError("Please enter at least one search criteria.");
      return;
    }

    setError(""); // Clear any previous error message
    const data = await advancedSearchCocktails({ name, category, ingredient, glass });
    setResults(data);
    setCurrentPage(1);
    setName("");
    setCategory("");
    setIngredient("");
    setGlass("");
  };

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="search-wrapper">
      <div className="search-container">
        <h1>Search Cocktails</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter cocktail name"
            className="search-input"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
            className="search-input"
          />
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Enter ingredient"
            className="search-input"
          />
          <input
            type="text"
            value={glass}
            onChange={(e) => setGlass(e.target.value)}
            placeholder="Enter glass type"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {/* Error message */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
      {results.length > 0 && (
        <div className="results-container">
          <div className="results-list">
              <CocktailCard cocktails={currentResults} />
          </div>
          <div className="pagination">
            {Array.from(
              { length: Math.ceil(results.length / resultsPerPage) },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`page-button ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}