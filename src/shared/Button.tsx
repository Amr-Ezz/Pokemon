import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function ContainedButtons({ onNext, onPrev, isPrevDisabled }) {
  return (
    <Stack direction="row" spacing={10}>
      <Button
        variant="contained"
        onClick={onNext}
        sx={{ backgroundColor: "#D32F2F" }}
      >
        Next
      </Button>
      <Button
        variant="contained"
        onClick={onPrev}
        disabled={isPrevDisabled}
        sx={{ backgroundColor: isPrevDisabled ? "grey" : "red" }}
      >
        Previous
      </Button>
    </Stack>
  );
}
