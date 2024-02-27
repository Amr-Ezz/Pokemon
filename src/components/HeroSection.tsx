import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Cards from "./Cards";
import { usePokemonsContext } from "../context/PokemonProvider";
import ContainedButtons from "../shared/Button";
import CircularWithValueLabel from "../shared/Loader";

export default function HeroSection() {
  const {
    isloading,
    handleNext,
    handlePrev,
    allPokemons,
    pokemonDes,
    offset,
    error,
  } = usePokemonsContext();

  const pokemonsWithDescription = allPokemons.map((pokemon) => {
    const descriptionObj = pokemonDes.find((desc) => desc.id === pokemon.id);
    const flavorTextEntry =
      descriptionObj && descriptionObj.flavor_text_entries
        ? descriptionObj.flavor_text_entries.find(
            (entry) => entry.language.name === "en"
          )
        : undefined;

    const flavorText = flavorTextEntry
      ? flavorTextEntry.flavor_text
      : "Description not available";

    return {
      ...pokemon,
      description: flavorText,
    };
  });

  if (error) {
    return <span>Error</span>;
  }

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          padding: "5rem",
          mx: "auto",
          maxWidth: "80%",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 12, sm: 12, md: 12 }}
          sx={{
            justifyContent: "center",
          }}
        >
          {isloading ? (
            <CircularWithValueLabel />
          ) : (
            pokemonsWithDescription.map((pokemon, index) => (
              <Grid xs={12} sm={6} md={4} item key={index} sx={{}}>
                <Cards pokemon={pokemon} />
              </Grid>
            ))
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <ContainedButtons
              onNext={handleNext}
              onPrev={handlePrev}
              isPrevDisabled={offset === 0}
            />
          </Box>
        </Grid>
      </Box>
    </>
  );
}
