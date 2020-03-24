import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";

function App() {
  const [isLogin, setIsLogin] = React.useState(
    localStorage.getItem("loggedIn")
  );

  const handleLogin = e => setIsLogin(true);

  return (
    <div>
      <Router>
        <NavBar isLogin={isLogin} />
        <Route
          name="signin"
          exact
          path="/signin"
          render={props => (
            <SignIn {...props} handleLogin={e => handleLogin(e)} />
          )}
        />
        <Route name="signup" exact path="/signup" component={SignUp} />
        <Route
          name="profile"
          exact
          path="/profile"
          render={props => <Profile {...props} isLogin={isLogin} />}
        />
      </Router>
    </div>
  );
}

export default App;
