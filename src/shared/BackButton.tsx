import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import React from "react";
import { ArrowBack } from "@mui/icons-material";

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <Button
      variant="contained"
      onClick={goBack}
      startIcon={<ArrowBack />}
      sx={{ mb: 2, backgroundColor: "#D32F2F", alignSelf: "flex-start" }}
    >
      Back
    </Button>
  );
};

export default BackButton;
