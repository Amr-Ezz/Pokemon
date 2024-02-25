import React, { useContext, useState } from "react";
import { createContext } from "react";
import usePokemons from "../Hooks/usePokemon";

export const PokemonContext = createContext();
///////////////////////////////////////////////////////////////
export const PokemonProvider = ({ children }) => {
  const { isloading, handleNext, handlePrev, allPokemons, pokemonDes, offset } =
    usePokemons();

  const value = {
    isloading,
    handleNext,
    handlePrev,
    allPokemons,
    pokemonDes,
    offset,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};
export const usePokemonsContext = () => {
  return useContext(PokemonContext);
};
