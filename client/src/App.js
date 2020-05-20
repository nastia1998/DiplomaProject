import React, { useState, useEffect } from "react";
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

import axios from "axios";

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

  const [open, setOpen] = useState(false);
  // const [rejectedRequests, setRejectedRequests] = useState([]);
  // const [countNotifications, setCountNotifications] = useState(0);

  const handleLogin = (e) => {
    setIsLogin(true);
  };

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

  // async function fetchRejectedRequests(user_id) {
  //   const { data } = await axios.get(
  //     `http://localhost:3000/api/v1/userskills/${user_id}/requests/rejected`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     }
  //   );
  //   setRejectedRequests(data);
  //   // if (data.length > 0) setCountNotifications(data.length);
  //   console.log(data.length);
  //   setCountNotifications(data.length);
  // }

  // async function confirmNotification(userskill_id) {
  //   await axios.delete(
  //     `http://localhost:3000/api/v1/userskills/${userskill_id}/notifications`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     }
  //   );
  // }

  // const updateRejectedRequests = async (id) => {
  //   const newRejectedRequests = rejectedRequests.filter(
  //     (item) => item.userskill_id !== +id
  //   );
  //   setRejectedRequests(newRejectedRequests);
  //   const newCountNotifications = countNotifications - 1;
  //   setCountNotifications(newCountNotifications);
  // };

  // const getCount = async () => {
  //   if (localStorage.getItem("userId"))
  //     fetchRejectedRequests(localStorage.getItem("userId"));
  // };

  // useEffect(() => {
  //   if (localStorage.getItem("userId"))
  //     fetchRejectedRequests(localStorage.getItem("userId"));
  // }, []);

  const handleClickOpen = (e) => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Router>
        <NavBar
          isLogin={isLogin}
          open={open}
          handleClickOpen={handleClickOpen}
          onClose={handleClose}
          // rejectedequests={rejectedRequests}
          // confirmNotification={(e) => confirmNotification(e)}
          // updateRejectedRequests={(id) => updateRejectedRequests(id)}
          // countNotifications={countNotifications}
          // updateCount={() => getCount()}
        />
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
