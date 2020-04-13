import React, { useEffect } from "react";
import { Paper, List, ListItem } from "@material-ui/core";

import styles from "../styles/StudentDashboard.css";

export default function MentorRequestsQueue(props) {
  const handleClick = (e) => {
    props.fetchFullInfoRequest(
      Number(e.target.id),
      Number(e.target.getAttribute("userid"))
    );
  };

  return (
    <Paper style={(styles.paper, styles.fixedHeight)}>
      <div>
        Info{" "}
        <p>
          {props.mentorInfo.email} {props.mentorInfo.firstName}{" "}
          {props.mentorInfo.lastName}
        </p>
      </div>
      <List>
        {props.requestsList
          ? props.requestsList.map((i) => (
              <ListItem
                key={i.id}
                id={i.id}
                userid={i.user_id}
                button
                onClick={handleClick}
              >
                {i.name} {i.level_name} {i.email} {i.firstName} {i.lastName}
              </ListItem>
            ))
          : ""}
      </List>
    </Paper>
  );
}
