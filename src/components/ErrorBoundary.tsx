import React, { useEffect } from "react";
import { usePokemonsContext } from "../context/PokemonProvider";
import { useNavigate } from "react-router-dom";

const ErrorBoundary = ({ children }) => {
  const { error } = usePokemonsContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      navigate("*");
    }
  }, [error]);
  return <>{children}</>;
};

export default ErrorBoundary;
