import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Typography variant="h1" component="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! The page you're looking for isn't here.
      </Typography>
      <Typography sx={{ mb: 2 }}>
        You might have the wrong address, or the page may have moved.
      </Typography>
      <Button
        variant="contained"
        sx={{ color: "#D32F2F" }}
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default NotFoundPage;
