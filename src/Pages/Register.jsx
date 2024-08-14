import React from "react";
import { useAuthGlobalContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { RegisterUser, handleInfoChange, RegUser } = useAuthGlobalContext();
  return (
    <>
      <div className="CreateNote container mt-5 ">
        <h2 className="text-center"> SIGN UP </h2>
        <form onSubmit={(e) => RegisterUser(e, navigate)}>
          <div class="mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              id="username"
              name="username"
              value={RegUser.username}
              onChange={handleInfoChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              placeholder="email"
              id="email"
              name="email"
              value={RegUser.email}
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
              value={RegUser.password}
              onChange={handleInfoChange}
            />
          </div>

          <button type="submit" class="btn btn-warning ">
            SIGN UP
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
