import React, { useState } from "react";
import { Paper, Grid, GridList, GridListTile, List } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import styles from "../styles/StudentDashboard.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import style from "../styles/test.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    overflow: "hidden",
    marginLeft: "10px",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    maxHeight: "100%",
    overflow: "auto",
  },
}));

const StyledRating = withStyles({
  iconFilled: {
    color: "#2B924A",
  },
  iconHover: {
    color: "#2B924A",
  },
})(Rating);

export default function Profile(props) {
  const [mentors, setMentors] = useState(true);

  const classes = useStyles();

  const handleShowMentors = (e) => {
    alert("Handle show mentors " + e.target.id);
  };

  return (
    <Paper style={(styles.paper, styles.fixedHeight)}>
      <div>
        Info
        {props.studentInfo.email}
        {props.studentInfo.name}
        {props.studentInfo.firstName}
        {props.studentInfo.lastName}
        {props.studentInfo.middleName}
      </div>
      <div className={classes.root}>
        <List className={classes.list}>
          Previous and current skills
          {props.studentSkills.map((skill) => (
            <li key={skill.id}>
              {skill.name} {skill.level_name}
              {
                {
                  junior: <StyledRating name="1" value={1} max={3} disabled />,
                  middle: <StyledRating name="2" value={2} max={3} disabled />,
                  senior: <StyledRating name="3" value={3} max={3} disabled />,
                }[skill.level_name]
              }
            </li>
          ))}
        </List>
      </div>
      <List className={(classes.list, "nav1")}>
        AvailableSkills
        {props.availableSkills.map((avSkill) => (
          <li key={avSkill.id}>
            {/* <div className="nav1"> */}
            {avSkill.name} {avSkill.level_name}
            {
              {
                junior: <StyledRating name="1" value={1} max={3} disabled />,
                middle: <StyledRating name="2" value={2} max={3} disabled />,
                senior: <StyledRating name="3" value={3} max={3} disabled />,
              }[avSkill.level_name]
            }
            <button
              key={avSkill.id}
              id={avSkill.id}
              onClick={(e) => handleShowMentors(e)}
            >
              >
            </button>
            {/* <ul> */}
            <div hidden={mentors}>
              <li>1</li>
              <li>2</li>
            </div>
            {/* </ul> */}
            {/* </div> */}
          </li>
        ))}
      </List>
    </Paper>
  );
}
