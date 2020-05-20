import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  ListSubheader,
} from "@material-ui/core";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import { makeStyles } from "@material-ui/core/styles";

import styles from "../styles/MentorDashboard.css";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
  },
}));

export default function StudentsList(props) {
  const classes = useStyles();

  const handleApproveSkill = (e) => {
    console.log(e.target);
    let userskillid;
    if (!e.target.id) {
      userskillid = e.target.closest("button").id;
    } else {
      userskillid = e.target.id;
    }
    props.approveSkill(+userskillid);
  };

  const handleRejectSkill = (e) => {
    let userskillid;
    if (!e.target.id) {
      userskillid = e.target.closest("button").id;
    } else {
      userskillid = e.target.id;
    }
    props.rejectSkill(+userskillid);
  };

  return (
    <Paper style={(styles.paper, styles.fixedHeight)} className={classes.root}>
      <List>
        <ListSubheader>My students</ListSubheader>
        {props.studentsList
          ? props.studentsList.map((i) => (
              <ListItem key={i.user_id} button>
                <ListItemIcon>
                  <Avatar aria-label="recipe">
                    {i.firstName ? i.firstName.substring(0, 1) : "N"}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    i.email +
                    " " +
                    i.firstName +
                    " " +
                    i.lastName +
                    " " +
                    i.name +
                    " " +
                    i.level_name
                  }
                />
                <IconButton
                  key={i.user_skill_id}
                  id={i.user_skill_id}
                  onClick={handleApproveSkill}
                >
                  <ThumbUpAltOutlinedIcon />
                </IconButton>
                <IconButton
                  key={i.user_skill_id}
                  id={i.user_skill_id}
                  onClick={handleRejectSkill}
                >
                  <ThumbDownAltOutlinedIcon>Reject</ThumbDownAltOutlinedIcon>
                </IconButton>
              </ListItem>
            ))
          : ""}
      </List>
    </Paper>
  );
}
