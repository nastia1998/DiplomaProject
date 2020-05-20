import React from "react";
import { Badge } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";

export default function CustomNotificationIcon(props) {
  return (
    <Badge badgeContent={props.count} color="error">
      <NotificationsIcon />
    </Badge>
  );
}
