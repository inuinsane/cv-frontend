import { Link } from "react-router-dom";

const Navigation = () => {
  const pathName = window.location.pathname;

  return (
    <>
      <header className="header header-sticky mb-4">
        <div className="container-fluid">
          <Link className="header-brand" to={"/"}>
            <h3>Rezume.</h3>
          </Link>

          {/* nav menu */}
          <ul className="header-nav d-none d-md-flex">
            <li className="nav-item">
              <Link
                className={
                  pathName === "/dashboard" ? "nav-link active" : "nav-link"
                }
                to={"/dashboard"}
              >
                {" "}
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navigation;
