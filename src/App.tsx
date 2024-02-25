import * as React from "react";
// import "./App.css";
import { PokemonProvider } from "./context/PokemonProvider";
import Home from "./pages/Home";
function App() {
  return (
    <PokemonProvider>
      <Home />
    </PokemonProvider>
  );
}

export default App;
