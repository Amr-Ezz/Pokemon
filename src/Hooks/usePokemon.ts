import { useCallback, useEffect, useState } from "react";
import {
  fetchPokemons,
  fetchPokemonData,
  fetchPokemonDescription,
  fetchSinglePokemonId,
} from "../api/pokemonApi";
import { PokemonDetails, PokemonDescription } from "../types/types";

export default function usePokemons() {
  const [allPokemons, setAllPokemons] = useState<PokemonDetails[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );
  const [searchValue, setSearchValue] = useState("");
  const [pokemonDes, setPokemonDes] = useState<PokemonDescription[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 6;
  const handleNext = () => setOffset((prev) => prev + limit);
  const handlePrev = () => setOffset((prev) => Math.max(0, prev - limit));
  useEffect(() => {
    setIsLoading(true);
    fetchPokemons(limit, offset)
      .then(async (response) => {
        const { results } = response;
        const detailsPromises = results.map((pokemon) => {
          return fetchPokemonData(pokemon.url);
        });
        const details = await Promise.all(detailsPromises);
        setAllPokemons(details);
        const descriptionPokemon = details.map((detail) => {
          return fetchPokemonDescription(detail.species.url);
        });

        const descriptionPokemonPromises = await Promise.all(
          descriptionPokemon
        );
        setPokemonDes(descriptionPokemonPromises);

        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());

        setIsLoading(false);
      });
  }, [offset]);
  const getSinglePokemonId = useCallback(async (pokemonId: string | number) => {
    setIsLoading(true);
    try {
      const detail = await fetchSinglePokemonId(pokemonId);
      setSelectedPokemon(detail);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearchValue = async (query: string) => {
    setIsLoading(true);
    try {
      const queryLowerCase = query.toLowerCase();
      setSearchValue(queryLowerCase);
    } catch (error) {
      console.error("Error fetching Pokémon by name:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
    error,
  };
}
