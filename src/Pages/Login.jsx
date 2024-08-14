import React from "react";
import { useAuthGlobalContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { LogUser, LoginUser, handleInfoChange } = useAuthGlobalContext();

  return (
    <>
      <div className="CreateNote container mt-5 ">
        <h2 className="text-center"> LOGIN </h2>
        <form onSubmit={(e) => LoginUser(e, navigate)}>
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              placeholder="email"
              id="email"
              name="email"
              value={LogUser.email}
              onChange={handleInfoChange}
            />
          </div>
          <div class="mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="password"
              id="password"
              name="password"
              value={LogUser.password}
              onChange={handleInfoChange}
            />
          </div>
          <p>
            Don't have an account?{" "}
            <Link to="/sign-up" className="nav-button-link text-warning">
              {" "}
              sign up{" "}
            </Link>{" "}
          </p>
          <button type="submit" class="btn btn-warning ">
            LOGIN
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
