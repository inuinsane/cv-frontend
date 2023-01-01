import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Login = () => {
  // change page title
  useEffect(() => {
    document.title = "Rezume | Login";
  });

  //   redirect purpose
  const navigate = useNavigate();

  // sweetAlert configuration
  const MySwal = withReactContent(Swal);

  // login data field
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  // auth Context
  const [auth, setAuth] = useContext(AuthContext);

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
        const error = res.data.error;
        if (error) {
          MySwal.fire({
            icon: "error",
            title: "Error",
            text: error.response.data,
          });
        }
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
                    <h1>Login</h1>
                    <p className="text-medium-emphasis"></p>
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
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                      <input
                        className="form-control"
                        type="password"
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
                        >
                          Register
                        </Link>
                      </div>
                      <div className="col-6 text-end">
                        <Link
                          className="btn btn-link px-0"
                          type="button"
                          to="/dashboard"
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
