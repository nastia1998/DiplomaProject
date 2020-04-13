import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import styles from "../styles/ManagerDashboard.css";

import MentorRequestsQueue from "./MentorRequestsQueue";
import FullInfoRequest from "./FullInfoRequest";

export default function MentorDashboard() {
  const [mentorInfo, setMentorInfo] = useState([]);
  const [requestsList, setRequestsList] = useState([]);
  const [fullInfoRequest, setFullInfoRequest] = useState([]);
  const [studentSkills, setStudentSkills] = useState([]);

  async function fetchMentorInfo() {
    const { data } = await axios.get("http://localhost:3000/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setMentorInfo(data);
  }

  async function fetchRequestsList() {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/userskills/${localStorage.getItem(
        "userId"
      )}/requests`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setRequestsList(data);
  }

  async function fetchStudentSkills(user_id) {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/userskills/users/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setStudentSkills(data);
  }

  async function fetchFullInfoRequest(req_id, user_id) {
    fetchStudentSkills(user_id);
    let newRequestsList = requestsList.filter((i) => i.id === req_id);
    setFullInfoRequest(newRequestsList);
  }

  async function approveRequest(req_id) {
    const { data } = axios.put(
      `http://localhost:3000/api/v1/userskills/${req_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  }

  useEffect(() => {
    fetchRequestsList();
    fetchMentorInfo();
  }, []);

  return (
    <div style={styles.root}>
      <CssBaseline />
      <main style={styles.content}>
        <Container maxWidth="lg" style={styles.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={5}>
              <MentorRequestsQueue
                mentorInfo={mentorInfo}
                requestsList={requestsList}
                fetchFullInfoRequest={(request_id, user_id) =>
                  fetchFullInfoRequest(request_id, user_id)
                }
              />
            </Grid>
            <Grid item xs={12} md={12} lg={7}>
              <FullInfoRequest
                fullInfoRequest={fullInfoRequest}
                studentSkills={studentSkills}
                approveRequest={(request_id) => approveRequest(request_id)}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
