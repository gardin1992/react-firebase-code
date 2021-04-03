import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./features/auth/PrivateRoute";
import UserProvider from "./providers/UserProvider";
import Home from "./scenes/dashboard/Home";
import Login from "./scenes/login/Login";

function App() {
  return (
    <UserProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute>
          <div className={"wrapper"}>
            <div className="container" style={{ flex: "1" }}>
              <Switch>
                <Route path="/" exact component={Home} />
              </Switch>
            </div>
          </div>
        </PrivateRoute>
      </Switch>
    </UserProvider>
  );
}

export default App;
