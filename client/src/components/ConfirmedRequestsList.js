import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
  },
}));

export default function ApprovedRequestsList(props) {
  const classes = useStyles();
  return (
    <div style={{ height: 500 }} className={classes.root}>
      {props.confirmedRequests.length > 0 ? (
        props.confirmedRequests.map((i) => (
          <Card key={i.mentor_id} style={{ marginBottom: "15px" }}>
            <CardHeader title={i.name + " " + i.level_name} />
            <CardContent>
              <Typography variant="body2">
                {i.email} {i.firstName} {i.lastName}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary">
          No confirmed requests rigth now
        </Typography>
      )}
    </div>
  );
}
