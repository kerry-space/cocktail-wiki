import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";

import { Home } from "./pages/Home";
import { CocktailDetail } from "./pages/CocktailDetail";
import { About } from "./pages/About";
import { SearchCocktails } from "./pages/SearchCocktails";
import { FavoritesPage } from "./pages/FavoritesPage";
import { IngredientPage } from "./pages/IngredientPage";

export const router = createBrowserRouter(

  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/cocktail/:id" element={<CocktailDetail />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/ingredient" element={<IngredientPage />} />
      <Route path="/search" element={<SearchCocktails />} />
      <Route path="/about" element={<About />} />
      
    </Route>
  )
);