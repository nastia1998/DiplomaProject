import React from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Typography,
  ListSubheader,
} from "@material-ui/core";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

import styles from "../styles/MentorDashboard.css";

export default function StudentsList(props) {
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

  return (
    <Paper style={(styles.paper, styles.fixedHeight)}>
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
              </ListItem>
            ))
          : ""}
      </List>
    </Paper>
  );
}
