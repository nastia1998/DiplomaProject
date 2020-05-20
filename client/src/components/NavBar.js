import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import NotificationsDialog from "./NotificationsDialog";
import axios from "axios";

import styles from "../styles/NavBar.css";
import CustomNotificationIcon from "./CustomNotificationIcon";

export default function NavBar(props) {
  const [count, setCount] = useState(0);
  // const [open, setOpen] = useState(false);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [countNotifications, setCountNotifications] = useState(0);

  async function fetchRejectedRequests(user_id) {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/userskills/${user_id}/requests/rejected`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setRejectedRequests(data);
    console.log(data.length);
    if (data.length > 0) setCountNotifications(data.length);
  }

  async function confirmNotification(userskill_id) {
    await axios.delete(
      `http://localhost:3000/api/v1/userskills/${userskill_id}/notifications`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  const updateRejectedRequests = async (id) => {
    const newRejectedRequests = rejectedRequests.filter(
      (item) => item.userskill_id !== +id
    );
    setRejectedRequests(newRejectedRequests);
    const newCountNotifications = countNotifications - 1;
    setCountNotifications(newCountNotifications);
  };

  const fetchCountNotifications = async () => {
    setCount(countNotifications);
    console.log(countNotifications);
  };

  useEffect(() => {
    if (localStorage.getItem("userId"))
      fetchRejectedRequests(localStorage.getItem("userId"));
    console.log(rejectedRequests);
    setCount(countNotifications);
    fetchCountNotifications();
    // props.getCount();
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
  };

  return (
    <AppBar position="static" style={styles.navbar}>
      <Toolbar style={styles.navbar}>
        <Typography variant="h6" style={styles.title}>
          Manage your skills
        </Typography>
        {props.isLogin ? (
          <Typography variant="h6" style={styles.menuButton}>
            <IconButton
              style={styles.menuButton}
              onClick={(e) => props.handleClickOpen(e)}
            >
              <CustomNotificationIcon count={countNotifications} />
            </IconButton>
            <Button href="/" onClick={handleLogOut} style={styles.menuButton}>
              Sign out
            </Button>
          </Typography>
        ) : (
          ""
        )}
      </Toolbar>
      <NotificationsDialog
        open={props.open}
        onClose={props.onClose}
        rejectedRequests={rejectedRequests}
        confirmNotification={(e) => confirmNotification(e)}
        updateRejectedRequests={(id) => updateRejectedRequests(id)}
      />
    </AppBar>
  );
}
