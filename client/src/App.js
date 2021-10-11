import "./App.css";
import "materialize-css";
import useRoutes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const routes = useRoutes(false);
  return (
    <Router>
      <div className="container">
        <h1>{routes}</h1>
      </div>
    </Router>
  );
}

export default App;
