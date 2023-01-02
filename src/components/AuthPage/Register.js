import { useContext, useEffect, useState } from "react";
import {
  FaRegEnvelope,
  FaRegEye,
  FaRegEyeSlash,
  FaRegUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  // auth Context
  const [auth, setAuth] = useContext(AuthContext);

  // change password visibility
  const [vision, setVision] = useState(false);
  const togglePassword = () => {
    setVision(!vision);
  };

  // input field data
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  // handle change
  const handleChange = (e) => {
    const value = e.target.value;
    switch (e.target.name) {
      case "name":
        setData({ ...data, name: value });
        break;
      case "username":
        setData({ ...data, username: value });
        break;
      case "email":
        setData({ ...data, email: value });
        break;
      case "password":
        setData({ ...data, password: value });
        break;
      case "repassword":
        setData({ ...data, repassword: value });
        break;
      default:
    }
  };

  // change page title
  useEffect(() => {
    document.title = `${auth.appName} | Register`;
  });
  return (
    <>
      <div className="bg-light min-vh-100 d-flex flex-row align-items-center dark:bg-transparent">
        <div className="container">
          <div className="row justify-content-center m-3">
            <div className="col-lg-8">
              <div className="card-group d-block d-flex m-2">
                <div className="card col-md-7 p-4 mb-0">
                  <div className="card-body">
                    <h1>Register</h1>
                    <p className="text-medium-emphasis"></p>
                    {/* Input name */}
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <FaRegUser />
                      </span>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Nama lengkap"
                        name="name"
                        onChange={handleChange}
                        value={data.name || ""}
                      ></input>
                    </div>
                    {/* Input username */}
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <FaRegUser />
                      </span>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                        value={data.username || ""}
                      ></input>
                    </div>
                    {/* Input email */}
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <FaRegEnvelope />
                      </span>
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={data.email || ""}
                      ></input>
                    </div>
                    {/* Input password */}
                    <div className="input-group mb-4">
                      <span
                        className="input-group-text"
                        type="button"
                        onClick={togglePassword}
                      >
                        {!vision ? <FaRegEyeSlash /> : <FaRegEye />}
                      </span>
                      <input
                        className="form-control"
                        type={!vision ? "password" : "text"}
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={data.password || ""}
                      ></input>
                    </div>
                    {/* Input re-password */}
                    <div className="input-group mb-4">
                      <span
                        className="input-group-text"
                        type="button"
                        onClick={togglePassword}
                      >
                        {!vision ? <FaRegEyeSlash /> : <FaRegEye />}
                      </span>
                      <input
                        className="form-control"
                        type={!vision ? "password" : "text"}
                        placeholder="Re-password"
                        name="repassword"
                        onChange={handleChange}
                        value={data.repassword || ""}
                      ></input>
                    </div>

                    {/* Button field */}
                    <div className="row">
                      {/* Register button */}
                      <div className="col-6">
                        <button
                          className="btn btn-primary px-4"
                          // onClick={handleLogin}
                        >
                          Register
                        </button>
                        {"   "}
                        {/* <Link
                          className="btn btn-link px-0"
                          type="button"
                          to="/login"
                        >
                          Login
                        </Link> */}
                      </div>
                      <div className="col-6 text-end">
                        <Link
                          className="btn btn-link px-0"
                          type="button"
                          to="/login"
                        >
                          Punya akun
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

export default Register;
