import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import styles from "../styles/NavBar.css";

export default function NavBar(props) {
  const handleLogOut = () => {
    localStorage.clear();
  };
  return (
    <AppBar position="static" style={styles.navbar}>
      <Toolbar style={styles.navbar}>
        <IconButton
          edge="start"
          style={styles.menuButton}
          color="inherit"
          aria-label="menu"
        ></IconButton>
        <Typography variant="h6" style={styles.title}>
          Manage your skills
        </Typography>
        {props.isLogin ? (
          <Typography variant="h6" style={styles.menuButton}>
            <Button href="/" onClick={handleLogOut}>
              Sign out
            </Button>
          </Typography>
        ) : (
          ""
        )}
      </Toolbar>
    </AppBar>
  );
}
