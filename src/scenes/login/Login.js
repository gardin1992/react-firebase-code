import "./Login.css";
import React, { useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

import {
  signInWithGoogle,
  signInWithFacebook,
} from "src/services/firebase/auth";
import { UserContext } from "src/providers/UserProvider";

export default function Login({}) {
  const user = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  useEffect(() => {
    if (!!user && !!user.email) history.replace(from);
  }, [user]);

  return (
    <div className="main">
      <div className="card large">
        <h2 className="h3">Log in to your account</h2>
        <form className="login">
          <fieldset>
            <label htmlFor="username">Username</label>
            <input type="text" id="Username" placeholder="Username" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" />
          </fieldset>
          <button type="submit">Login</button>

          <div className="login-buttons">
            <button
              className="login-provider-button small"
              onClick={signInWithGoogle}
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
                alt="google icon"
                loading="lazy"
                width="24"
                height="24"
              />
              <span> Continue with Google</span>
            </button>

            <button
              className="login-provider-button small"
              onClick={signInWithFacebook}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="24"
                height="24"
              >
                {" "}
                <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"></path>
              </svg>
              <span> Continue with Facebook</span>
            </button>
          </div>
        </form>

        <footer>
          <a className="panel-footer" href="/signup/login">
            Novo Por Aqui? &nbsp;<span>Sign Up</span>
          </a>
        </footer>
      </div>
    </div>
  );
}
