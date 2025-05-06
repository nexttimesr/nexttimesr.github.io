import * as React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import TwistedFate from "./TwistedFate";
import Aram from "./Aram";
import ElementCalculator from "./ElementCalculator";
import ChampionsList from "./ChampionsList";



const App = () => {
  console.log("ElementCalculator:", ElementCalculator);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Aram />} />
        <Route path="/tf" element={<TwistedFate />} />
        <Route path="/champions-list" element={<ChampionsList />} />
        <Route path="/bl3" element={<ElementCalculator />} />
      </Routes>
    </Router>
  );
};

export default App;
