import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import ManagerDashboard from "./components/ManagerDashboard";
import StudentDashboard from "./components/StudentDashboard";
import MentorDashboard from "./components/MentorDashboard";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Manage your skills
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default function App() {
  const [isLogin, setIsLogin] = React.useState(
    localStorage.getItem("loggedIn")
  );

  const handleLogin = (e) => setIsLogin(true);

  return (
    <div>
      <Router>
        <NavBar isLogin={isLogin} />
        <Route
          name="signin"
          exact
          path="/signin"
          render={(props) => (
            <SignIn {...props} handleLogin={(e) => handleLogin(e)} />
          )}
        />
        <Route name="signup" exact path="/signup" component={SignUp} />
        {/* <Route
          name="profile"
          exact
          path="/profile"
          render={props => <Profile {...props} isLogin={isLogin} />}
        /> */}
        <Route
          name="managerdashboard"
          exact
          path="/managerdashboard"
          component={ManagerDashboard}
        />
        <Route
          name="studentdashboard"
          exact
          path="/studentdashboard"
          component={StudentDashboard}
        />
        <Route
          name="mentordashboard"
          exact
          path="/mentordashboard"
          component={MentorDashboard}
        />
      </Router>
      <Box pt={4}>
        <Copyright />
      </Box>
    </div>
  );
}
