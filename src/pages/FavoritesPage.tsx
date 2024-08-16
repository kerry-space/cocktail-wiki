import React, { ReactElement } from 'react';
import { useCocktailFunc } from '../hooks/useCocktalFunc';
import { CocktailCard } from '../components/CocktailCard';

import "./FavoritesPage.css"

export function FavoritesPage(): ReactElement {
    const { favorites } = useCocktailFunc();

    if (favorites.length === 0) {
        return <p>No favorite cocktails yet.</p>;
    }

    return (
        <div className='favorites-wrapper'>
            <h1>Your Favorites</h1>
            <div className="favorites-list">
            <CocktailCard cocktails={favorites} />
            </div>
        </div>
    );
}