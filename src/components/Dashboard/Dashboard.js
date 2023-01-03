import Axios from "axios";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Navigation from "../Navigation/Navigation";

const Dashboard = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = `${auth.appName} | Dashboard`;
    if (!auth.isLoggedIn) {
      navigate("/login");
    }
  });

  // handle logout
  const handleLogout = async () => {
    const logoutUrl = `${auth.baseUrl}/auth/logout`;
    const token = localStorage.getItem("auth-token");

    await Axios.put(logoutUrl, {
      headers: {
        authorization: token,
      },
    }).then((res) => {
      localStorage.setItem("auth-token", "");
      localStorage.setItem("user", "");
      setAuth({
        ...auth,
        currentUser: {
          ...auth.currentUser,
          _id: 0,
          name: "",
          email: "",
          username: "",
          token: "",
        },
        isLoggedIn: false,
      });
    });
  };
  return (
    <>
      <Navigation />
      <h1>This is Dashboard page</h1>

      <Link to="/" className="text-link" style={{ textDecoration: "none" }}>
        Home
      </Link>
      {"     "}
      <Link
        to="/login"
        className="text-link"
        style={{ textDecoration: "none" }}
      >
        Login
      </Link>
      {"     "}
      <Link
        to="/register"
        className="text-link"
        style={{ textDecoration: "none" }}
      >
        Register
      </Link>
      {"     "}
      <Link
        className="text-link"
        style={{ textDecoration: "none" }}
        onClick={handleLogout}
      >
        Logout
      </Link>
    </>
  );
};

export default Dashboard;
