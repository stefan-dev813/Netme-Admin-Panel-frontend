import { useLocation } from "react-router-dom";
import "./App.css";
import Router from "./Components/Router";
import Home from "./Pages/Home/Home";

function App() {
  const location = useLocation();
  if (location.pathname === "/" || location.pathname === "/login") {
    return (
      <div className="App">
        <Router />
      </div>
    );
  }
  return (
    <div className="App">
      <Home /> 
    </div>
  );
}

export default App;
