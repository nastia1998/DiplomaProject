import React, { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Grid,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

import axios from "axios";
import StudentSkills from "./StudentSkills";

const useStyles = makeStyles({
  tst: {
    border: "1px solid #eeeeee",
    alignSelf: "center",
    background: "transparent",
    padding: "1rem 1rem",
    margin: "1rem",
    transition: "all .5s ease",
    color: "#41403E",
    fontSize: "1rem",
    letterSpacing: "1px",
    outline: "none",
    boxShadow: "20px 38px 34px -26px hsla(0,0%,0%,.1)",
    "&:hover": {
      boxShadow: "2px 8px 4px -6px hsla(0,0%,0%,.2)",
    },
  },
});

export default function Student(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [studentSkills, setStudentSkills] = useState([]);

  const handleClick = () => {
    setOpen(!open);
  };

  async function getStudentSkills() {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/userskills/${props.student.user_id}/requests/confirmed`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setStudentSkills(data);
  }

  useEffect(() => {
    getStudentSkills();
  }, []);

  return (
    <Draggable
      draggableId={`${props.student.user_skill_id}`}
      index={props.index}
    >
      {(provided, snapshot) => (
        <Grid
          container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          id={props.student.user_skill_id}
          onClick={handleClick}
          className={classes.tst}
          onClick={handleClick}
          direction="column"
        >
          <Grid item xs={12}>
            <List>
              <ListItemIcon>
                <Avatar>
                  {props.student
                    ? props.student.firstName.substring(0, 1)
                    : "N"}
                </Avatar>
              </ListItemIcon>
              <ListItemText>
                {props.student.email} {props.student.firstName}{" "}
                {props.student.lastName}
              </ListItemText>
            </List>
          </Grid>
          <StudentSkills studentSkills={studentSkills} in={open} />
          {/* <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={8}>
                  {props.student.name}
                </Grid>
                <Grid item xs={4}>
                  <IconButton
                    key={props.student.user_skill_id}
                    id={props.student.user_skill_id}
                    // onClick={handleApproveSkill}
                  >
                    <ThumbUpAltOutlinedIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Collapse> */}
        </Grid>
        // <div>
        //   <ListItem
        //     button
        //     {...provided.draggableProps}
        //     {...provided.dragHandleProps}
        //     ref={provided.innerRef}
        //     id={props.student.user_skill_id}
        //     onClick={handleClick}
        //   >
        //     {props.student.name}
        //   </ListItem>
        //   <Collapse in={open} timeout="auto" unmountOnExit>
        //     <List>
        //       <ListItemIcon>
        //         <Avatar>
        //           {props.student
        //             ? props.student.firstName.substring(0, 1)
        //             : "N"}
        //         </Avatar>
        //       </ListItemIcon>
        //       <ListItemText>
        //         {props.student.email} {props.student.firstName}{" "}
        //         {props.student.lastName}
        //       </ListItemText>
        //     </List>
        //   </Collapse>
        // </div>
      )}
    </Draggable>
  );
}
