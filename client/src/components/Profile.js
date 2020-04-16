import React, { useState } from "react";
import {
  List,
  ListItem,
  IconButton,
  Avatar,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import styles from "../styles/StudentDashboard.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MentorsDialog from "./MentorsDialog";

import style from "../styles/test.css";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#C7B08B",
  },
}));

const StyledRating = withStyles({
  iconFilled: {
    color: "#5c6bc0",
  },
})(Rating);

export default function Profile(props) {
  const [mentors, setMentors] = useState(false);
  const [selSkill, setSelSkill] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [selectedSkillId, setSelectedSkillId] = React.useState(0);

  const handleClickOpen = (e) => {
    setOpen(true);
    setSelectedSkillId(+e.target.id);
    props.fetchMentorsForSkill(+e.target.id);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSendRequest = (mentor_id, skill_id) => {
    props.sendRequestToMentor(mentor_id, skill_id);
  };

  return (
    <Card style={(styles.paper, styles.fixedHeight)} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {props.studentInfo.firstName
              ? props.studentInfo.firstName.substring(0, 1)
              : "N"}
          </Avatar>
        }
        title={
          props.studentInfo.firstName ||
          "" + " " + props.studentInfo.lastName ||
          "" + " " + props.studentInfo.middleName ||
          ""
        }
        subheader={props.studentInfo.email}
      />

      <CardContent>
        <List className={classes.list}>
          <Typography variant="h6">Previous and current skills</Typography>
          {props.studentSkills.map((skill) => (
            <li key={skill.id}>
              <Typography paragraph>
                {skill.name}
                {
                  {
                    junior: (
                      <StyledRating name="1" value={1} max={3} disabled />
                    ),
                    middle: (
                      <StyledRating name="2" value={2} max={3} disabled />
                    ),
                    senior: (
                      <StyledRating name="3" value={3} max={3} disabled />
                    ),
                  }[skill.level_name]
                }
                {
                  {
                    true: "Finished",
                    false: "In process",
                  }[skill.is_approved_skill]
                }
              </Typography>
            </li>
          ))}
        </List>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <List>
            <Typography variant="h6">Available Skills</Typography>
            {props.availableSkills.map((avSkill) => (
              <ListItem key={avSkill.id} className="availskillslist">
                <Typography paragraph>
                  {avSkill.name}
                  {
                    {
                      junior: (
                        <StyledRating name="1" value={1} max={3} disabled />
                      ),
                      middle: (
                        <StyledRating name="2" value={2} max={3} disabled />
                      ),
                      senior: (
                        <StyledRating name="3" value={3} max={3} disabled />
                      ),
                    }[avSkill.level_name]
                  }
                  <button
                    key={avSkill.id}
                    id={avSkill.id}
                    onClick={(e) => handleClickOpen(e)}
                    className="styledButton"
                  >
                    >
                  </button>
                </Typography>
                <MentorsDialog
                  selectedSkillId={selectedSkillId}
                  open={open}
                  onClose={handleClose}
                  mentorsList={props.mentorsList}
                  handleSendRequest={(mentor_id, skill_id) =>
                    handleSendRequest(mentor_id, skill_id)
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
}
