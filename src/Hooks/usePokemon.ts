import { useCallback, useEffect, useState } from "react";
import {
  fetchPokemons,
  fetchPokemonData,
  fetchPokemonDescription,
  fetchSinglePokemonId,
} from "../api/pokemonApi";
import {
  PokemonBasic,
  PokemonDetails,
  PokemonDescription,
} from "../types/types";

// import { usePokemonsContext } from "../context/PokemonProvider";

export default function usePokemons() {
  // const { setAllPokemons, setPokemonDes } = usePokemonsContext();
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
        console.log(results);
        const detailsPromises = results.map((pokemon) => {
          return fetchPokemonData(pokemon.url);
        });
        const details = await Promise.all(detailsPromises);
        console.log(details, "details");
        setAllPokemons(details);
        const descriptionPokemon = details.map((detail) => {
          return fetchPokemonDescription(detail.species.url);
        });

        const descriptionPokemonPromises = await Promise.all(
          descriptionPokemon
        );
        console.log(descriptionPokemonPromises, "description");
        setPokemonDes(descriptionPokemonPromises);

        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  }, [offset]);
  const getSinglePokemonId = useCallback(
    async (pokemonId: number) => {
      setIsLoading(true);
      try {
        const detail = await fetchSinglePokemonId(pokemonId);
        setSelectedPokemon(detail);
      } catch (error) {
        console.log(error);
        setError(error.toString());
      } finally {
        setIsLoading(false);
      }
    },
    [fetchSinglePokemonId]
  );
  const handleSearchValue = (query: string) => {
    setSearchValue(query);
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
