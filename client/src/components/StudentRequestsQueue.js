import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
  },
}));

export default function StudentRequestsQueue(props) {
  const classes = useStyles();

  const handleCancelRequest = (e) => {
    let userskillid;
    if (!e.target.id) {
      userskillid = e.target.closest("button").id;
    } else {
      userskillid = e.target.id;
    }
    props.cancelRequest(+userskillid);
  };

  return (
    <div style={{ height: 500 }} className={classes.root}>
      {props.unconfirmedRequests.length > 0 ? (
        props.unconfirmedRequests.map((i) => (
          <Card key={i.skill_id} style={{ marginBottom: "15px" }}>
            <CardHeader
              title={i.name}
              id={i.id}
              action={
                <IconButton
                  aria-label="delete"
                  id={i.id}
                  onClick={(e) => handleCancelRequest(e)}
                >
                  <CloseIcon />
                </IconButton>
              }
            />
            <CardContent>
              <Typography variant="body2">
                {i.email} {i.firstName} {i.lastName}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary">
          Nothing in the requests queue
        </Typography>
      )}
    </div>
  );
}
