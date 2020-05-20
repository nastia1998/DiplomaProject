import React from "react";
import {
  Dialog,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  ListItemAvatar,
} from "@material-ui/core";

import DialogTitle from "./DialogTitle";

export default function MentorsDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (e) => {
    let mentorid;
    if (!e.target.id) {
      const el = e.target.closest("ul > div");
      mentorid = el.id;
    } else {
      mentorid = e.target.id;
    }
    onClose(e);
    props.handleSendRequest(+mentorid, +props.selectedSkillId);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Select a mentor
      </DialogTitle>
      <List>
        {props.mentorsList
          ? props.mentorsList.map((i) => (
              <ListItem
                button
                key={i.id}
                id={i.id}
                className="mentor"
                alignItems="flex-start"
                onClick={(e) => handleListItemClick(e)}
              >
                <ListItemAvatar>
                  <Avatar src="../../public/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={i.email}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {i.firstName} {i.lastName}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))
          : ""}
      </List>
    </Dialog>
  );
}
