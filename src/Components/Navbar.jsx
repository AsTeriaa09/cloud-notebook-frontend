import React from "react";
import { SiElasticcloud } from "react-icons/si";
import { Link } from "react-router-dom";
import { useAuthGlobalContext } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedin } = useAuthGlobalContext();
  return (
    <>
      <nav class="navbar navbar-expand-lg text-light navbar-dark py-3">
        <div class="container">
          <a class="navbar-brand" href="/">
            <SiElasticcloud className="text-warning" />
            NoteBook
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="d-flex ms-auto text-light">
              {isLoggedin ? (
                <Link to="/logout" className="nav-button-link">
                  {" "}
                  <button class="btn btn-warning me-3" type="submit">
                    {" "}
                    LOGOUT{" "}
                  </button>{" "}
                </Link>
              ) : (
                <>
                  <Link to="/login" className="nav-button-link">
                    {" "}
                    <button class="btn btn-warning me-3" type="submit">
                      {" "}
                      LOGIN{" "}
                    </button>{" "}
                  </Link>
                  <Link to="/sign-up" className="nav-button-link">
                    {" "}
                    <button class="btn btn-warning me-3" type="submit">
                      {" "}
                      SIGN UP{" "}
                    </button>{" "}
                  </Link>{" "}
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
