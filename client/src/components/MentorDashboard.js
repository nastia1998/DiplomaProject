import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { IconButton, Tooltip, Typography } from "@material-ui/core";
import TrendingFlatIcon from "@material-ui/icons/TrendingFlat";
import { useHistory } from "react-router-dom";

import styles from "../styles/MentorDashboard.css";

import MentorRequestsQueue from "./MentorRequestsQueue";
import FullInfoRequest from "./FullInfoRequest";
import StudentsList from "./StudentsList";

export default function MentorDashboard() {
  let history = useHistory();

  const [mentorInfo, setMentorInfo] = useState([]);
  const [requestsList, setRequestsList] = useState([]);
  const [fullInfoRequest, setFullInfoRequest] = useState([]);
  const [studentSkills, setStudentSkills] = useState([]);
  const [studentsList, setStudentsList] = useState([]);

  async function fetchMentorInfo() {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/users/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMentorInfo(data);
    } catch (error) {
      if (+error.response.status === 401) {
        localStorage.clear();
        history.push("/");
      }
    }
  }

  async function getStudentsList() {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/userskills/${localStorage.getItem(
        "userId"
      )}/students`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setStudentsList(data);
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

  async function approveRequest(userskill_id) {
    await axios.put(`http://localhost:3000/api/v1/userskills/${userskill_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchRequestsList();
    fetchFullInfoRequest(0, 0);
    getStudentsList();
  }

  async function rejectRequest(userskill_id) {
    await axios.delete(
      `http://localhost:3000/api/v1/userskills/${userskill_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    fetchRequestsList();
    fetchFullInfoRequest(0, 0);
    getStudentsList();
  }

  async function approveSkill(userskill_id) {
    await axios.put(
      `http://localhost:3000/api/v1/userskills/${userskill_id}/skill`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    getStudentsList();
  }

  const handleGoToStudentDashboard = () => {
    history.push("/studentdashboard");
  };

  useEffect(() => {
    fetchRequestsList();
    fetchMentorInfo();
    getStudentsList();
  }, []);

  return (
    <div style={styles.root}>
      <CssBaseline />
      <Tooltip title="Go to student dashboard">
        <IconButton onClick={handleGoToStudentDashboard}>
          <TrendingFlatIcon />
        </IconButton>
      </Tooltip>
      <main style={styles.content}>
        <Typography variant="h6" style={{ marginTop: "5px" }}>
          Mentor dashboard
        </Typography>
        <Container maxWidth="lg" style={styles.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MentorRequestsQueue
                mentorInfo={mentorInfo}
                requestsList={requestsList}
                fetchFullInfoRequest={(request_id, user_id) =>
                  fetchFullInfoRequest(request_id, user_id)
                }
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <FullInfoRequest
                fullInfoRequest={fullInfoRequest}
                studentSkills={studentSkills}
                approveRequest={(userskill_id) => approveRequest(userskill_id)}
                rejectRequest={(userskill_id) => rejectRequest(userskill_id)}
              />
            </Grid>
            <Grid item xs={12}>
              <StudentsList
                studentsList={studentsList}
                approveSkill={(userskill_id) => approveSkill(userskill_id)}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
