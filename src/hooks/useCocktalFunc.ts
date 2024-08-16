import { CocktailContext } from '../context/CocktailContext';
import { ICocktail } from '../interface';
import { useContext } from "react";
import { ICocktailContext } from "../interface";

export function useCocktailFunc(): ICocktailContext {
  return useContext(CocktailContext);
}