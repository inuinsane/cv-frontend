import { Route, Routes } from "react-router-dom";
import Login from "../AuthPage/Login";
import Register from "../AuthPage/Register";
import Dashboard from "../Dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <>
      <main>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
};

export default AppRoutes;
