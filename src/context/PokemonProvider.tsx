import React, { useContext, createContext, ReactNode } from "react";
import usePokemons from "../Hooks/usePokemon";
import { PokemonDescription, PokemonDetails } from "../types/types";

interface PokemonContextType {
  isloading: boolean;
  handleNext: () => void;
  handlePrev: () => void;
  allPokemons: PokemonDetails[];
  pokemonDes: PokemonDescription[];
  offset: number;
  selectedPokemon: PokemonDetails | null;
  getSinglePokemonId: (pokemonId: number) => Promise<void>;
  handleSearchValue: (value: string) => void;
  searchValue: string;
}

const initialContext: PokemonContextType = {
  isloading: false,
  handleNext: () => {},
  handlePrev: () => {},
  allPokemons: [],
  pokemonDes: [],
  offset: 0,
  selectedPokemon: null,
  getSinglePokemonId: async () => {},
  handleSearchValue: () => {},
  searchValue: "",
};

export const PokemonContext = createContext<PokemonContextType>(initialContext);

interface PokemonProviderProps {
  children: ReactNode;
}

export const PokemonProvider: React.FC<PokemonProviderProps> = ({
  children,
}) => {
  const {
    isloading,
    handleNext,
    handlePrev,
    allPokemons,
    pokemonDes,
    offset,
    selectedPokemon,
    getSinglePokemonId,
    handleSearchValue,
    searchValue,
  } = usePokemons();

  const value = {
    isloading,
    handleNext,
    handlePrev,
    allPokemons,
    pokemonDes,
    offset,
    selectedPokemon,
    getSinglePokemonId,
    handleSearchValue,
    searchValue,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

export const usePokemonsContext = (): PokemonContextType => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error("usePokemonsContext must be used within a PokemonProvider");
  }
  return context;
};
