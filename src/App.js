import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import TwistedFate from "./TwistedFate";
import Aram from "./Aram";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Aram />} />
        <Route path="/tf" element={<TwistedFate />} />
      </Routes>
    </Router>
  );
};

export default App;
