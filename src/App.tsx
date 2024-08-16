import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import { CocktailProvider } from './context/CocktailContext'
import { Header } from './components/Header'


function App() {

  return (
    <>
      <CocktailProvider>
      <Header/>
        <Outlet />
      </CocktailProvider>
    </>
  )
}

export default App
