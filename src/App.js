import "./App.css";
import { AuthProvider } from "./components/Context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./components/Routes/AppRoutes";

function App() {
  return (
    <>
      <AuthProvider>
        <div className="App">
          <Router>
            <AppRoutes />
          </Router>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
