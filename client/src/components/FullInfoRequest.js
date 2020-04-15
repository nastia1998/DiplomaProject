import React from "react";
import {
  Paper,
  Grid,
  List,
  ListSubheader,
  ListItem,
  IconButton,
  ListItemIcon,
  Avatar,
  ListItemText,
} from "@material-ui/core";

import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";

import styles from "../styles/MentorDashboard.css";

export default function FullInfoRequest(props) {
  const handleApprove = (e) => {
    let userskillid;
    if (!e.target.id) {
      userskillid = e.target.closest("button").id;
    } else {
      userskillid = e.target.id;
    }
    props.approveRequest(+userskillid);
  };

  return (
    <Paper style={(styles.paper, styles.fixedHeight)}>
      <List>
        <ListSubheader>Full info about request</ListSubheader>
        {props.fullInfoRequest
          ? props.fullInfoRequest.map((i) => (
              <ListItem key={i.id}>
                <ListItemIcon>
                  <Avatar aria-label="recipe">
                    {i.firstName ? i.firstName.substring(0, 1) : "N"}
                  </Avatar>
                </ListItemIcon>
                {i.email} {i.firstName} {i.lastName}
                <IconButton id={i.id} onClick={handleApprove}>
                  <ThumbUpAltOutlinedIcon>Approve</ThumbUpAltOutlinedIcon>
                </IconButton>
                <IconButton id={i.id}>
                  <ThumbDownAltOutlinedIcon>Reject</ThumbDownAltOutlinedIcon>
                </IconButton>
              </ListItem>
            ))
          : ""}
        <ListSubheader>Skills of the user</ListSubheader>
        {props.studentSkills
          ? props.studentSkills.map((i) => (
              <ListItem key={i.id}>
                <ListItemText>
                  {i.name} {i.level_name} {i.time_level}{" "}
                </ListItemText>
                {i.is_approved_skill ? "Approved" : "Not approved"}
              </ListItem>
            ))
          : ""}
      </List>
    </Paper>
  );
}
