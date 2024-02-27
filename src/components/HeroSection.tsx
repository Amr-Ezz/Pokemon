import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Cards from "./Cards";
import { usePokemonsContext } from "../context/PokemonProvider";
import ContainedButtons from "../shared/Button";
import CircularWithValueLabel from "../shared/Loader";

export default function HeroSection() {
  const { isloading, handleNext, handlePrev, allPokemons, pokemonDes, offset } =
    usePokemonsContext();

  const pokemonsWithDescription = allPokemons.map((pokemon) => {
    const descriptionObj = pokemonDes.find((desc) => desc.id === pokemon.id);
    const flavorTextEntry = descriptionObj?.flavor_text_entries?.find(
      (entry) => entry.language.name === "en"
    );

    const flavorText = flavorTextEntry
      ? flavorTextEntry.flavor_text
      : "Description not available";

    return {
      ...pokemon,
      description: flavorText,
    };
  });

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: "1rem", sm: "2rem", md: "5rem" },
          mx: "auto",
          maxWidth: "80%",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{
            justifyContent: "center",
          }}
        >
          {isloading ? (
            <CircularWithValueLabel />
          ) : (
            <>
              {pokemonsWithDescription.map((pokemon, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  {" "}
                  <Cards pokemon={pokemon} />
                </Grid>
              ))}
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{ display: "flex", justifyContent: "center", mt: 3 }}
              >
                <ContainedButtons
                  onNext={handleNext}
                  onPrev={handlePrev}
                  isPrevDisabled={offset === 0}
                />
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
}
