import { useCallback, useEffect, useState } from "react";
import {
  fetchPokemons,
  fetchPokemonData,
  fetchPokemonDescription,
  fetchSinglePokemonId,
} from "../api/pokemonApi";
// import { usePokemonsContext } from "../context/PokemonProvider";

export default function usePokemons() {
  // const { setAllPokemons, setPokemonDes } = usePokemonsContext();
  const [allPokemons, setAllPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pokemonDes, setPokemonDes] = useState([]);
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
  const getSinglePokemonId = useCallback(async (pokemonId) => {
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
  });
  const handleSearchValue = (query) => {
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
  };
}
