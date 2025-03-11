import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import TwistedFate from "./TwistedFate";
import Aram from "./Aram";
import ChampionsList from "./ChampionsList";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Aram />} />
        <Route path="/tf" element={<TwistedFate />} />
        <Route path="/champions-list" element={<ChampionsList />} />
      </Routes>
    </Router>
  );
};

export default App;
