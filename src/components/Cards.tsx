import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { firstLetterCapital, separeteTypes } from "../Utils/pokemonUtils";
import { useNavigate } from "react-router-dom";
import { usePokemonsContext } from "../context/PokemonProvider";
import { Box, Paper } from "@mui/material";
// import { fetchPokemonApi, fetchSinglePokemonApi } from "../api/pokemonApi";
// import { PokemonContext } from "../api/PokemonProvider";

export default function Cards({ pokemon }) {
  const typesWithColors = separeteTypes(pokemon.types || []);
  const { getSinglePokemonId } = usePokemonsContext();
  const navigate = useNavigate();

  const handlePokemonSelect = (pokemonId) => {
    getSinglePokemonId(pokemonId).then(() => {
      navigate(`/pokemon/${pokemonId}`);
    });
  };

  return (
    <Card
      sx={{ maxWidth: 250, cursor: "pointer" }}
      onClick={() => handlePokemonSelect(pokemon.id)}
    >
      <Paper elevation={0} sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            my: 2,
          }}
        >
          <CardMedia
            component="img"
            image={pokemon.sprites.front_default}
            alt={pokemon.species.name}
            sx={{
              width: 151,
              height: 151,
              margin: "auto",
              backgroundColor: "#f5f5f5",
            }}
            title={firstLetterCapital(pokemon.species.name)}
          />
        </Box>
      </Paper>

      <CardContent style={{ padding: "1rem" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: 500 }}
        >
          {firstLetterCapital(pokemon.species.name)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {pokemon.description}
        </Typography>
        {typesWithColors.map((type, index) => (
          <Typography
            key={index}
            variant="body2"
            color="text.secondary"
            style={{
              backgroundColor: type.color,
              margin: "4px",
              padding: "5px",
              display: "inline-block",
              width: "fit-content",
              borderRadius: "20%",
            }}
          >
            {type.name}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
}
