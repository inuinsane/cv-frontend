import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Home = () => {
  const [auth] = useContext(AuthContext);

  useEffect(() => {
    document.title = `${auth.appName} | Home`;
  });
  return (
    <>
      <h1>Welcome to home page</h1>
      <Link to="/login" className="text-linl">
        Login
      </Link>
      {"     "}
      <Link to="/register" className="text-linl">
        Register
      </Link>
      {"     "}
      <Link to="/dashboard" className="text-linl">
        Dashboard
      </Link>
    </>
  );
};

export default Home;
