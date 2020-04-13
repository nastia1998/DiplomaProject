import React from "react";
import {
  Paper,
  List,
  ListItem,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import styles from "../styles/StudentDashboard.css";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
  },
}));

export default function StudentRequestsQueue(props) {
  const classes = useStyles();
  return (
    <div
      style={(styles.fixedHeight, styles.requеstsList)}
      className={classes.root}
    >
      {props.unconfirmedRequests ? (
        props.unconfirmedRequests.map((i) => (
          <Card key={i.skill_id}>
            <CardHeader title={i.name} />
            <CardContent>
              <Typography variant="body2">
                {i.email} {i.firstName} {i.lastName}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent>
            Here you can see unconfirmed requests to mentor
          </CardContent>
        </Card>
      )}
    </div>
  );
}
