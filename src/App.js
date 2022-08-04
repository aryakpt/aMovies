import "./App.scss";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Header, Footer } from "./components";
import { Routes } from "./config";

function App() {
  return (
    <Router>
      <Route
        render={(props) => (
          <>
            <Header {...props} />
            <Routes />
            <Footer />
          </>
        )}
      />
    </Router>
  );
}

export default App;
