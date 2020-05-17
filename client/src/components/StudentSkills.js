import React from "react";
import { Collapse, Grid, IconButton, List } from "@material-ui/core";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";

export default function StudentSkills(props) {
  return (
    <Collapse in={props.open} timeout="auto" unmountOnExit>
      <List>
        {props.studentSkills.map((skill) => (
          <p key={skill.userskill_id}>{skill.name}</p>
        ))}
      </List>
      {/* <Grid item xs={12}>
        <Grid container>
          <Grid item xs={8}>
            {props.student.name}
          </Grid>
          <Grid item xs={12}>
            <IconButton
              key={props.student.user_skill_id}
              id={props.student.user_skill_id}
              // onClick={handleApproveSkill}
            >
              <ThumbUpAltOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid> */}
    </Collapse>
  );
}
