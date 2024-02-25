import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { separeteTypes } from "../Utils/pokemonUtils";
// import { fetchPokemonApi, fetchSinglePokemonApi } from "../api/pokemonApi";
// import { PokemonContext } from "../api/PokemonProvider";

export default function Cards({ pokemon }) {
  const typesWithColors = separeteTypes(pokemon.types || []);
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia
        sx={{ height: 165 }}
        // Assuming `abilities` and `pokemon` are defined elsewhere and accessible
        title={pokemon.species.name}
      >
        <img
          src={pokemon.sprites.front_default}
          style={{ height: "100%", width: "fit-content" }}
        />
      </CardMedia>
      <CardContent style={{ padding: "1rem" }}>
        <Typography gutterBottom variant="h5" component="div">
          {pokemon.species.name}
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
              // height: "fit-content",
              borderRadius: "20%",
            }}
          >
            {type.name}
          </Typography>
        ))}
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
