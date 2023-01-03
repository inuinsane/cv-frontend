import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Login = () => {
  // auth Context
  const [auth, setAuth] = useContext(AuthContext);

  // redirect purpose
  const navigate = useNavigate();

  // change page title
  useEffect(() => {
    document.title = `${auth.appName} | Login`;
    if (auth.isLoggedIn && auth.currentUser.token !== undefined) {
      navigate("/dashboard");
    }
  });

  // sweetAlert configuration
  const MySwal = withReactContent(Swal);

  // change password visibility
  const [visible, setVisible] = useState(false);
  const togglePassword = () => {
    setVisible(!visible);
  };

  // login data field
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // handle change on input field
  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    switch (e.target.name) {
      case "username":
        setLoginData({ ...loginData, username: value });
        break;
      case "password":
        setLoginData({ ...loginData, password: value });
        break;
      default:
    }
  };

  // handleSubmit
  const handleSubmit = async () => {
    try {
      await Axios.post(auth.loginUrl, loginData).then((res) => {
        console.log(res.data.token);
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user");
        // set Auth data
        setAuth({
          ...auth,
          isLoggedIn: true,
          currentUser: {
            ...auth.currentUser,
            _id: res.data._id,
            name: res.data.name,
            email: res.data.email,
            username: res.data.username,
            token: res.data.token,
          },
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });
    }
  };

  // handle login
  const handleLogin = async () => {
    if (loginData.username && loginData.password !== "") {
      handleSubmit();
    } else {
      MySwal.fire({
        icon: "error",
        title: "Oops",
        text: "Input tidak boleh kosong",
      });
    }
  };

  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
        <div className="container">
          <div className="row justify-content-center m-3">
            <div className="col-lg-8">
              <div className="card-group d-block d-flex m-2">
                <div className="card col-md-7 p-4 mb-0">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-6">
                        <h1 className="mb-3">Login</h1>
                      </div>
                      <div className="col-6 text-end">
                        <Link
                          to={"/"}
                          style={{ textDecoration: "none" }}
                          className="btn btn-link"
                        >
                          Home
                        </Link>
                      </div>
                    </div>
                    {/* Input username */}
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <FaUser />
                      </span>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                        value={loginData.username || ""}
                      ></input>
                    </div>
                    {/* Input password */}
                    <div className="input-group mb-4">
                      <span
                        className="input-group-text"
                        type="button"
                        onClick={togglePassword}
                      >
                        {!visible ? <FaRegEyeSlash /> : <FaRegEye />}
                      </span>
                      <input
                        className="form-control"
                        type={!visible ? "password" : "text"}
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={loginData.password || ""}
                      ></input>
                    </div>
                    {/* Button field */}
                    <div className="row">
                      {/* login button */}
                      <div className="col-6">
                        <button
                          className="btn btn-primary px-4"
                          onClick={handleLogin}
                        >
                          Login
                        </button>
                        {"   "}
                        <Link
                          className="btn btn-link px-0"
                          type="button"
                          to="/register"
                          style={{ textDecoration: "none" }}
                        >
                          Register
                        </Link>
                      </div>
                      <div className="col-6 text-end">
                        <Link
                          className="btn btn-link px-0"
                          type="button"
                          to="/"
                          style={{ textDecoration: "none" }}
                        >
                          Lupa password
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
