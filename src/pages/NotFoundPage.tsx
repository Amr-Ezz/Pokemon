import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: { xs: 4, sm: 8 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Typography
        variant="h1"
        component="h2"
        gutterBottom
        sx={{
          fontSize: { xs: "4rem", sm: "5rem", md: "6rem" },
        }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
          textAlign: "center",
        }}
      >
        Oops! The page you're looking for isn't here.
      </Typography>
      <Typography
        sx={{
          mb: 2,
          px: { xs: 2, sm: 0 },
          textAlign: "center",
        }}
      >
        You might have the wrong address, or the page may have moved.
      </Typography>
      <Button
        variant="contained"
        sx={{
          mt: 2,
          color: "white",
          backgroundColor: "primary",
          "&:hover": {
            backgroundColor: "#9A0007",
          },
          px: { xs: 3, sm: 5 },
          py: { xs: 1, sm: 1.5 },
        }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
