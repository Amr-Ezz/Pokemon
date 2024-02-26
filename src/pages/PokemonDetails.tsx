import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePokemonsContext } from "../context/PokemonProvider";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  Grid,
} from "@mui/material";
import {
  firstLetterCapital,
  formatStatName,
  separeteTypes,
} from "../Utils/pokemonUtils";
import BackButton from "../shared/BackButton";

const PokemonDetails = () => {
  const { pokemonId } = useParams();

  const { selectedPokemon, getSinglePokemonId } = usePokemonsContext();
  useEffect(() => {
    getSinglePokemonId(pokemonId);
  }, [pokemonId]);
  const typesWithColors = separeteTypes(selectedPokemon.types || []);

  const [selectedTab, setSelectedTab] = useState("stats");
  const handleTabChange = (event, newTab) => {
    if (newTab !== null) {
      setSelectedTab(newTab);
    }
  };
  console.log(selectedPokemon, "selectedPokemon");
  if (!selectedPokemon) return <div>loading...</div>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 6,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignSelf: "flex-start",
            maxWidth: 600,
          }}
        >
          <BackButton />
        </Box>
        <Card sx={{ width: "100%", maxWidth: 600, mt: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={selectedPokemon?.sprites.front_default}
                alt={selectedPokemon?.name}
              />
              <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
                <Typography gutterBottom variant="h3" component="div">
                  {selectedPokemon?.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {typesWithColors.map((type, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                      style={{
                        backgroundColor: type.color,
                        margin: "4px",
                        padding: "5px",
                        flexDirection: "row",
                        width: "fit-content",
                        borderRadius: "20%",
                      }}
                    >
                      {type.name}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Box>
            <ToggleButtonGroup
              color="primary"
              value={selectedTab}
              exclusive
              onChange={handleTabChange}
              sx={{ mt: 2, ".MuiToggleButton-root": { border: 0 } }}
            >
              {["stats", "moves", "abilities"].map((tab) => (
                <ToggleButton
                  key={tab}
                  value={tab}
                  sx={{
                    borderBottom: selectedTab === tab ? "1px solid" : "none",
                    borderColor: "#D32F2F",
                    "&.Mui-selected, &.Mui-selected:hover": {
                      bgcolor: "transparent",
                      color: "#D32F2F",
                    },
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                  }}
                >
                  {firstLetterCapital(tab)}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <Divider sx={{ my: 2, borderColor: "divider" }} />
            {selectedTab === "stats" && (
              <Grid container spacing={2}>
                {selectedPokemon?.stats.map((stat, index) => (
                  <React.Fragment key={index}>
                    <Grid
                      item
                      xs={6}
                      sx={{ borderLeft: "1px", borderColor: "divider" }}
                    >
                      <Typography sx={{ fontWeight: 600 }}>
                        {formatStatName(stat.stat.name)}
                      </Typography>{" "}
                    </Grid>

                    <Grid item xs={6}>
                      <Typography>{stat.base_stat}</Typography>{" "}
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            )}
            {selectedTab === "moves" && (
              <Grid container spacing={2}>
                {selectedPokemon?.moves.map((move, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontWeight: 600 }}>
                        {formatStatName(move.move.name)}
                      </Typography>{" "}
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Level: {move.version_group_details[0].level_learned_at}{" "}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            )}
            {selectedTab === "abilities" && (
              <Grid container spacing={2}>
                {selectedPokemon?.abilities.map((ability, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={6}>
                      <Typography sx={{ fontWeight: 600 }}>
                        {formatStatName(ability.ability.name)}
                      </Typography>{" "}
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        {ability.slot}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
export default PokemonDetails;
