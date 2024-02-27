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
import { PokemonDetails as PokemonDetailsType } from "../types/types";
import CircularWithValueLabel from "../shared/Loader";

const PokemonDetails: React.FC = () => {
  const { pokemonId } = useParams<{ pokemonId: string }>();

  const { selectedPokemon, getSinglePokemonId, isloading } =
    usePokemonsContext();

  const typesWithColors = selectedPokemon
    ? separeteTypes(selectedPokemon.types || [])
    : [];

  const [selectedTab, setSelectedTab] = useState<string>("stats");
  const handleTabChange = (
    event: React.MouseEvent<HTMLElement>,
    newTab: string
  ) => {
    setSelectedTab(newTab);
  };
  useEffect(() => {
    if (pokemonId) {
      getSinglePokemonId(parseInt(pokemonId));
    }
  }, [pokemonId, getSinglePokemonId]);
  if (isloading) {
    return <CircularWithValueLabel />;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: 600 },
          }}
        >
          <BackButton />
        </Box>
        <Card sx={{ width: "100%", maxWidth: { xs: "100%", sm: 600 }, mt: 2 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: { xs: "50%", sm: 151 }, height: "auto" }}
                image={selectedPokemon?.sprites.front_default}
                alt={selectedPokemon?.name}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  ml: { sm: 2 },
                  mt: { xs: 2, sm: 0 },
                }}
              >
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ textAlign: { xs: "center", sm: "left" } }}
                >
                  {firstLetterCapital(selectedPokemon?.name || "")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: { xs: "center", sm: "start" },
                  }}
                >
                  {typesWithColors.map((type, index) => (
                    <Typography
                      key={index}
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        backgroundColor: type.color,
                        margin: "4px",
                        padding: "5px",
                        borderRadius: "20%",
                      }}
                    >
                      {firstLetterCapital(type.name)}
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
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                width: "100%",
                ".MuiToggleButton-root": {
                  border: 0,
                  flexGrow: 1,
                },
              }}
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
                  {tab}
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
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{stat.base_stat}</Typography>
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
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body2" color="text.secondary">
                        Level: {move.version_group_details[0].level_learned_at}
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
                      </Typography>
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
