import * as React from "react";
// import "./App.css";
import { PokemonProvider } from "./context/PokemonProvider";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonDetails from "./pages/PokemonDetails";
import CircularWithValueLabel, {
  CircularProgressWithLabel,
} from "./shared/Loader";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary";
function App() {
  return (
    <PokemonProvider>
      <Router>
        <ErrorBoundary>
          <Navbar />
          <React.Suspense fallback={<CircularWithValueLabel />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFoundPage />} />

              <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
            </Routes>
          </React.Suspense>
        </ErrorBoundary>
      </Router>
    </PokemonProvider>
  );
}

export default App;
