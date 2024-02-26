// export const fetchPokemonApi = async () => {
//   const limit = 6;
//   const url = `https://pokeapi.co/api/v2/pokemon?limit=${6}`;
//   try {
//     const response = await axios.get(url);

//     return response.data.results;
//   } catch (error) {
//     console.log("error fetch data", error);
//     throw new error();
//   }
// };

// export const fetchSinglePokemonApi = async (url) => {
//   try {
//     const getData = await axios.get(url);
//     return getData.data;
//   } catch (error) {
//     console.log("error fetch single anime", error);
//   }
// };
//////////////////////////////////////////////////////////////////

const BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemons = (limit, offset) => {
  return fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`).then(
    (res) => res.json()
  );
};

export const fetchPokemonData = (pokemonId) => {
  return fetch(`${pokemonId}`).then((res) => res.json());
};

export const fetchPokemonDescription = (pokemonId) => {
  return fetch(`${pokemonId}`).then((res) => res.json());
};
export const fetchSinglePokemonId = (pokemonId) => {
  return fetch(`${BASE_URL}/pokemon/${pokemonId}`).then((res) => res.json());
};
