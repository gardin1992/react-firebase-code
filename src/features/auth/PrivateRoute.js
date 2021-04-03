import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "src/providers/UserProvider";

export function PrivateRoute({ children, ...rest }) {
  const user = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user?.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
