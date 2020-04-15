import React, { useEffect } from "react";
import {
  Paper,
  List,
  ListItem,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
  ListSubheader,
} from "@material-ui/core";

import Rating from "@material-ui/lab/Rating";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

import styles from "../styles/MentorDashboard.css";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
  },
  avatar: {
    backgroundColor: "#C7B08B",
  },
}));

const StyledRating = withStyles({
  iconFilled: {
    color: "#5c6bc0",
  },
})(Rating);

export default function MentorRequestsQueue(props) {
  const handleClick = (e) => {
    let req_id, user_id;
    if (!e.target.id) {
      req_id = e.target.closest("div").id;
      user_id = e.target.closest("div").getAttribute("userid");
    } else {
      req_id = e.target.id;
      user_id = e.target.getAttribute("userid");
    }
    props.fetchFullInfoRequest(+req_id, +user_id);
  };
  const classes = useStyles();
  return (
    <Paper style={(styles.paper, styles.fixedHeight)}>
      <Card style={(styles.paper, styles.fixedHeight)} className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.mentorInfo.firstName
                ? props.mentorInfo.firstName.substring(0, 1)
                : "N"}
            </Avatar>
          }
          title={
            props.mentorInfo.firstName ||
            "" + " " + props.mentorInfo.lastName ||
            "" + " " + props.mentorInfo.middleName ||
            ""
          }
          subheader={props.mentorInfo.email}
        />
        <CardContent>
          <List>
            <ListSubheader>Requests</ListSubheader>
            {props.requestsList
              ? props.requestsList.map((i) => (
                  <ListItem
                    key={i.id}
                    id={i.id}
                    userid={i.user_id}
                    button
                    onClick={handleClick}
                  >
                    <Typography paragraph>
                      {i.name}
                      {
                        {
                          junior: (
                            <StyledRating name="1" value={1} max={3} disabled />
                          ),
                          middle: (
                            <StyledRating name="2" value={2} max={3} disabled />
                          ),
                          senior: (
                            <StyledRating name="3" value={3} max={3} disabled />
                          ),
                        }[i.level_name]
                      }
                      {
                        {
                          true: "Finished",
                          false: "In process",
                        }[i.is_approved_skill]
                      }
                    </Typography>
                  </ListItem>
                ))
              : ""}
          </List>
        </CardContent>
      </Card>
    </Paper>
  );
}
