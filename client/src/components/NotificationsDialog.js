import React, { useEffect } from "react";
import {
  Dialog,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  ListItemAvatar,
  Box,
  Button,
} from "@material-ui/core";
import DialogTitle from "./DialogTitle";

export default function NotificationsDialog(props) {
  //   const { onClose, open } = props;

  const handleClose = () => {
    props.onClose();
    // props.handleClose();
  };

  const handleNotification = (e) => {
    // onClose(e);
    let userskillid;
    if (!e.target.id) {
      userskillid = e.target.closest("button").id;
    } else {
      userskillid = e.target.id;
    }
    console.log(userskillid);
    props.confirmNotification(+userskillid);
    props.updateRejectedRequests(+userskillid);
  };

  const handleRejectedSkill = (e) => {
    let userskillid;
    if (!e.target.id) {
      userskillid = e.target.closest("button").id;
    } else {
      userskillid = e.target.id;
    }
    console.log(userskillid);
    props.confirmNotification(+userskillid);
    props.updateRejectedSkills(+userskillid);
  };

  useEffect(() => {
    console.log(props.rejectedRequests);
  }, []);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={props.open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Notifications
      </DialogTitle>
      <List>
        {props.rejectedRequests && props.rejectedRequests.length > 0
          ? props.rejectedRequests.map((i) => (
              <Box display="flex" key={i.userskill_id}>
                <ListItem
                  button
                  key={i.userskill_id}
                  id={i.userskill_id}
                  className="mentor"
                  alignItems="flex-start"
                >
                  <Typography variant="body2" color="textPrimary">
                    {i.firstName} {i.lastName} rejected your request to learn{" "}
                    <strong>
                      {i.name} {i.level_name}
                    </strong>
                  </Typography>
                </ListItem>
                <Button
                  id={i.userskill_id}
                  onClick={(e) => handleNotification(e)}
                >
                  OK
                </Button>
              </Box>
            ))
          : ""}
        {props.rejectedSkills && props.rejectedSkills.length > 0
          ? props.rejectedSkills.map((i) => (
              <Box display="flex" key={i.userskill_id}>
                <ListItem
                  button
                  key={i.userskill_id}
                  id={i.userskill_id}
                  className="mentor"
                  alignItems="flex-start"
                >
                  <Typography variant="body2" color="textPrimary">
                    {i.firstName} {i.lastName} did not approve skill{" "}
                    <strong>
                      {i.name} {i.level_name}
                    </strong>
                  </Typography>
                </ListItem>
                <Button
                  id={i.userskill_id}
                  onClick={(e) => handleRejectedSkill(e)}
                >
                  OK
                </Button>
              </Box>
            ))
          : ""}
        {props.rejectedSkills.length === 0 &&
        props.rejectedRequests.length === 0 ? (
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ margin: 10 }}
          >
            Here you can see some notifications
          </Typography>
        ) : (
          ""
        )}
      </List>
    </Dialog>
  );
}
