import React, { useEffect } from "react";
import { Paper, List, ListItem } from "@material-ui/core";

import styles from "../styles/StudentDashboard.css";

export default function StudentRequestsQueue(props) {
  // useEffect(() => {
  //   props.getUnconfirmedRequests();
  // }, []);
  return (
    <Paper style={(styles.paper, styles.fixedHeight)}>
      <List>
        {props.unconfirmedRequests
          ? props.unconfirmedRequests.map((i) => (
              <ListItem key={i.mentor_id}>
                {i.name} {i.level_name} {i.email} {i.firstName} {i.lastName}
              </ListItem>
            ))
          : ""}
      </List>
    </Paper>
  );
}
