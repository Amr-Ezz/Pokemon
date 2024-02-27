import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { usePokemonsContext } from "../context/PokemonProvider";
import { Link, useNavigate } from "react-router-dom";
import { fetchSinglePokemonId } from "../api/pokemonApi";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    width: "50%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar({}) {
  const { handleSearchValue, searchValue, error } = usePokemonsContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    handleSearchValue(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchValue == "") {
      alert("Please enter Pokemon's name");
      return;
    } else {
      handleClick();
    }
  };
  const handleClick = () => {
    fetchSinglePokemonId(searchValue);
    navigate(`/pokemon/${searchValue}`);
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "#D32F2F",
        display: "flex",
        position: "relative",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link to={"/"}>
            <img
              src="/pokemon-logo-text-png-7.png"
              style={{ width: 80, height: 50 }}
            />
          </Link>

          <Typography
            variant="h6"
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, paddingLeft: 4 }}
          >
            Pokemon Gallery
          </Typography>
        </Box>

        <Search>
          <form onSubmit={handleSubmit}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleChange}
            />
          </form>
        </Search>
      </Toolbar>
    </AppBar>
  );
}
