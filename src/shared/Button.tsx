import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function ContainedButtons({ onNext, onPrev, isPrevDisabled }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction={isSmallScreen ? "column" : "row"}
      spacing={isSmallScreen ? 2 : 10}
      alignItems="center"
      justifyContent="center"
    >
      <Button
        variant="contained"
        onClick={onPrev}
        disabled={isPrevDisabled}
        sx={{
          backgroundColor: isPrevDisabled ? "grey" : "#D32F2F",
          width: isSmallScreen ? "100%" : "auto",
        }}
      >
        Previous
      </Button>
      <Button
        variant="contained"
        onClick={onNext}
        sx={{
          backgroundColor: "#D32F2F",
          width: isSmallScreen ? "100%" : "auto",
        }}
      >
        Next
      </Button>
    </Stack>
  );
}
