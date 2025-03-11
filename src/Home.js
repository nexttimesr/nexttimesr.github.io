import './App.css';
import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const Home = () => {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Welcome to My React App</h1>
        <div style={{ marginTop: '30px' }}>
          <Link to="/tf">
            <button style={{ margin: '10px', padding: '10px' }}>TwistedFate</button>
          </Link>
          <Link to="/">
            <button style={{ margin: '10px', padding: '10px' }}>Aram</button>
          </Link>
        </div>
      </div>
    );
  };

  export default Home;