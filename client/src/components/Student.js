import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@material-ui/core";

export default function Student(props) {
  // const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(!open);
  // };

  return (
    <Draggable
      draggableId={`${props.student.user_skill_id}`}
      index={props.index}
    >
      {(provided) => (
        <div>
          <ListItem
            button
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            id={props.student.user_skill_id}
            // onClick={handleClick}
          >
            {props.student.name}
            {console.log(props.student)}
          </ListItem>
          {/* <Collapse in={open} timeout="auto" unmountOnExit>
            <List>
              <ListItemIcon>
                <Avatar>
                  {props.request
                    ? props.request.firstName.substring(0, 1)
                    : "N"}
                </Avatar>
              </ListItemIcon>
              <ListItemText>
                {props.request.email} {props.request.firstName}{" "}
                {props.request.lastName}
              </ListItemText>
            </List>
          </Collapse> */}
        </div>
      )}
    </Draggable>
  );
}
