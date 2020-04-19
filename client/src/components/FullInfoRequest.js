import React from "react";
import {
  Paper,
  List,
  ListSubheader,
  ListItem,
  IconButton,
  ListItemIcon,
  Avatar,
  ListItemText,
  Typography,
} from "@material-ui/core";

import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";

import styles from "../styles/MentorDashboard.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
  },
}));
export default function FullInfoRequest(props) {
  const classes = useStyles();
  const handleApprove = (e) => {
    let userskillid;
    if (!e.target.id) {
      userskillid = e.target.closest("button").id;
    } else {
      userskillid = e.target.id;
    }
    props.approveRequest(+userskillid);
  };

  const handleReject = (e) => {
    let userskillid;
    if (!e.target.id) {
      userskillid = e.target.closest("button").id;
    } else {
      userskillid = e.target.id;
    }
    props.rejectRequest(+userskillid);
  };

  return (
    <Paper style={(styles.paper, styles.fixedHeight)} className={classes.root}>
      <List>
        {props.fullInfoRequest.length > 0 ? (
          <ListSubheader>Full info about request</ListSubheader>
        ) : (
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginLeft: 15 }}
          >
            Select a request to show
          </Typography>
        )}

        {props.fullInfoRequest.length > 0
          ? props.fullInfoRequest.map((i) => (
              <ListItem key={i.id}>
                <ListItemIcon>
                  <Avatar aria-label="recipe">
                    {i.firstName ? i.firstName.substring(0, 1) : "N"}
                  </Avatar>
                </ListItemIcon>
                <ListItemText>
                  {i.email} {i.firstName} {i.lastName} {i.name}
                </ListItemText>
                <IconButton id={i.id} onClick={handleApprove}>
                  <ThumbUpAltOutlinedIcon>Approve</ThumbUpAltOutlinedIcon>
                </IconButton>
                <IconButton id={i.id} onClick={handleReject}>
                  <ThumbDownAltOutlinedIcon>Reject</ThumbDownAltOutlinedIcon>
                </IconButton>
              </ListItem>
            ))
          : ""}
        {props.fullInfoRequest.length > 0 ? (
          <ListSubheader>User skills</ListSubheader>
        ) : (
          ""
        )}
        {props.studentSkills
          ? props.studentSkills.map((i) => (
              <ListItem key={i.id}>
                <ListItemText>
                  {i.name} {i.level_name} {i.time_level}
                  {" month "}
                </ListItemText>
                {i.is_approved_skill ? "Approved" : "Not approved"}
              </ListItem>
            ))
          : ""}
      </List>
    </Paper>
  );
}
