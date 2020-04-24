import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
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
  const [isLogin, setIsLogin] = useState(localStorage.getItem("loggedIn"));
  const [openMessage, setOpenMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [severity, setSeverity] = useState("");

  const handleLogin = (e) => setIsLogin(true);

  const handleShowMessage = (severity, messText) => {
    setOpenMessage(true);
    setSeverity(severity);
    setMessageText(messText);
  };

  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  return (
    <div>
      <Router>
        <NavBar isLogin={isLogin} />
        <Route
          name="signin"
          exact
          path="/"
          render={(props) => (
            <SignIn
              {...props}
              openMessage={openMessage}
              severity={severity}
              messageText={messageText}
              handleLogin={(e) => handleLogin(e)}
              handleShowMessage={(s, e) => handleShowMessage(s, e)}
              handleCloseMessage={(e, r) => handleCloseMessage(e, r)}
            />
          )}
        />
        <Route name="signup" exact path="/signup" component={SignUp} />
        <Route
          name="managerdashboard"
          exact
          path="/managerdashboard"
          render={(props) => (
            <ManagerDashboard
              {...props}
              openMessage={openMessage}
              severity={severity}
              messageText={messageText}
              handleShowMessage={(s, e) => handleShowMessage(s, e)}
              handleCloseMessage={(e, r) => handleCloseMessage(e, r)}
            />
          )}
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
