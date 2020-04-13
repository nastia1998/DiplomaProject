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

import styles from "../styles/StudentDashboard.css";

export default function ApprovedRequestsList(props) {
  return (
    <div style={(styles.fixedHeight, styles.requеstsList)}>
      {props.confirmedRequests
        ? props.confirmedRequests.map((i) => (
            <Card key={i.mentor_id} style={{ marginBottom: "15px" }}>
              <CardHeader title={i.name + " " + i.level_name} />
              <CardContent>
                <Typography variant="body2">
                  {i.email} {i.firstName} {i.lastName}
                </Typography>
              </CardContent>
            </Card>
          ))
        : ""}
    </div>
  );
}
