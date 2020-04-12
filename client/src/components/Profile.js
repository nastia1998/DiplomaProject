import React, { useState } from "react";
import {
  Paper,
  Grid,
  GridList,
  GridListTile,
  List,
  ListItem,
  IconButton,
  Button,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
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
  mentorslist: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    overflow: "auto",
    height: 567,
  },
}));

const StyledRating = withStyles({
  iconFilled: {
    color: "#2B924A",
  },
})(Rating);

export default function Profile(props) {
  const [mentors, setMentors] = useState(false);
  const [selSkill, setSelSkill] = useState(0);

  const classes = useStyles();

  const handleShowMentors = (e) => {
    props.fetchMentorsForSkill(e.target.id);
    setSelSkill(Number(e.target.id));
    const mentorsOptions = document.getElementsByClassName("mentor");
    for (let i = 0; i < mentorsOptions.length; i++) {
      if (
        Number(mentorsOptions[i].id) === Number(e.target.id) &&
        mentorsOptions[i].hidden === true
      ) {
        mentorsOptions[i].hidden = false;
      } else {
        mentorsOptions[i].hidden = true;
      }
    }
  };

  const handleSendRequest = (e) => {
    let skillid;
    let mentorid;
    if (!e.target.id) {
      const el = e.target.closest("ul > div");
      skillid = el.id;
      mentorid = el.getAttribute("mentorid");
    } else {
      skillid = e.target.id;
      mentorid = e.target.getAttribute("mentorid");
    }
    console.log(skillid, mentorid);
    props.sendRequestToMentor(mentorid, skillid);
  };

  return (
    <Paper style={(styles.paper, styles.fixedHeight)}>
      <div className={classes.container}>
        <List className={classes.list}>
          Info
          {props.studentInfo.email}
          {props.studentInfo.name}
          {props.studentInfo.firstName}
          {props.studentInfo.lastName}
          {props.studentInfo.middleName}
        </List>
        {/* <div className={classes.root}> */}
        <List className={classes.list}>
          Previous and current skills
          {props.studentSkills.map((skill) => (
            <li key={skill.id}>
              {skill.name}
              {
                {
                  junior: <StyledRating name="1" value={1} max={3} disabled />,
                  middle: <StyledRating name="2" value={2} max={3} disabled />,
                  senior: <StyledRating name="3" value={3} max={3} disabled />,
                }[skill.level_name]
              }
              {
                {
                  true: "Finished",
                  false: "Not finished",
                }[skill.approved]
              }
            </li>
          ))}
        </List>
        {/* </div> */}
        <List>
          Available Skills
          {props.availableSkills.map((avSkill) => (
            <ListItem key={avSkill.id} className="availskillslist">
              {avSkill.name}
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
                onClick={handleShowMentors}
                className="styledButton"
              >
                >
              </button>
              <List className={classes.mentorslist}>
                {props.mentorsList
                  ? props.mentorsList.map((i) =>
                      avSkill.id === selSkill ? (
                        <ListItem
                          button
                          key={i.id}
                          id={avSkill.id}
                          mentorid={i.id}
                          className="mentor"
                          alignItems="flex-start"
                          onClick={handleSendRequest}
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
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  {i.firstName} {i.lastName}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                      ) : (
                        ""
                      )
                    )
                  : ""}
              </List>
            </ListItem>
          ))}
        </List>
      </div>
    </Paper>
  );
}
