import React from "react";
import { Paper } from "@material-ui/core";

import styles from "../styles/StudentDashboard.css";

export default function FullInfoRequest(props) {
  const handleApprove = (e) => {
    props.approveRequest(+e.target.id);
  };

  return (
    <Paper style={(styles.paper, styles.fixedHeight)}>
      <div>
        {props.fullInfoRequest
          ? props.fullInfoRequest.map((i) => (
              <div key={i.id}>
                {i.email} {i.firstName} {i.lastName}
                <button id={i.id} onClick={handleApprove}>
                  Approve
                </button>
                <button>Reject</button>
              </div>
            ))
          : ""}
      </div>
      <div>
        {props.studentSkills
          ? props.studentSkills.map((i) => (
              <p key={i.id}>
                {i.name} {i.level_name} {i.time_level}{" "}
                {i.is_approved_skill ? "approved" : "not approved"}
              </p>
            ))
          : ""}
      </div>
    </Paper>
  );
}
