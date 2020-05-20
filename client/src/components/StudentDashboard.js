import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import RefreshIcon from "@material-ui/icons/Refresh";
import { useHistory } from "react-router-dom";

import styles from "../styles/StudentDashboard.css";
import axios from "axios";

import Profile from "./Profile";
import StudentRequestsQueue from "./StudentRequestsQueue";
import ConfirmedRequestsList from "./ConfirmedRequestsList";
import { IconButton, Tooltip, Typography } from "@material-ui/core";

export default function StudentDashboard() {
  let history = useHistory();

  const [studentInfo, setStudentInfo] = useState([]);
  const [studentSkills, setStundentSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [mentorsList, setMentorsList] = useState([]);
  const [unconfirmedRequests, setUnconfirmedRequests] = useState([]);
  const [confirmedRequests, setConfirmedRequests] = useState([]);

  async function fetchStudentInfo() {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/users/me",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStudentInfo(data);
    } catch (error) {
      if (+error.response.status === 401) {
        localStorage.clear();
        history.push("/");
      }
    }
  }

  async function fetchStudentSkills() {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/userskills/users/${localStorage.getItem(
        "userId"
      )}`
    );
    setStundentSkills(data);
  }

  async function fetchAvailableSkills() {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/skills/${localStorage.getItem(
        "userId"
      )}/student`
    );
    setAvailableSkills(data);
  }

  async function fetchMentorsForSkill(skill_id) {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/mentors/${skill_id}/student`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setMentorsList(data);
  }

  async function clearMentorsList() {
    setMentorsList([]);
  }

  async function sendRequestToMentor(mentor_id, skill_id) {
    const body = {
      user_id: Number(localStorage.getItem("userId")),
      skill_id: Number(skill_id),
      mentor_id: Number(mentor_id),
    };
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/userskills/requests",
      body,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    updateAvailableSkills();
    fetchStudentSkills();
    getUnconfirmedRequests();
  }

  async function updateAvailableSkills() {
    fetchAvailableSkills();
  }

  async function getUnconfirmedRequests() {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/userskills/${localStorage.getItem(
        "userId"
      )}/requests/unconfirmed`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setUnconfirmedRequests(data);
  }

  async function getConfirmedRequests() {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/userskills/${localStorage.getItem(
        "userId"
      )}/requests/confirmed`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setConfirmedRequests(data);
  }

  async function cancelRequest(userskill_id) {
    await axios.delete(
      `http://localhost:3000/api/v1/userskills/${userskill_id}/notifications`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    getUnconfirmedRequests();
    fetchAvailableSkills();
    fetchStudentSkills();
  }

  const handleGoToMentorDashboard = () => {
    history.push("/mentordashboard");
  };

  const handleRefresh = () => {
    fetchStudentSkills();
    fetchAvailableSkills();
  };

  useEffect(() => {
    fetchStudentInfo();
    fetchStudentSkills();
    fetchAvailableSkills();
    getUnconfirmedRequests();
    getConfirmedRequests();
  }, []);

  return (
    <div style={styles.root}>
      <CssBaseline />
      {localStorage.getItem("role") === "mentor" ? (
        <Tooltip title="Go to mentor dashboard">
          <IconButton onClick={handleGoToMentorDashboard}>
            <KeyboardBackspaceIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}

      <main style={styles.content}>
        <Typography variant="h6" style={{ marginTop: 5, marginLeft: 15 }}>
          Student dashboard
          <IconButton onClick={() => handleRefresh()}>
            <RefreshIcon />
          </IconButton>
        </Typography>
        <Container maxWidth="lg" style={styles.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={5}>
              <Profile
                studentInfo={studentInfo}
                studentSkills={studentSkills}
                availableSkills={availableSkills}
                fetchMentorsForSkill={fetchMentorsForSkill}
                clearMentorsList={clearMentorsList}
                mentorsList={mentorsList}
                sendRequestToMentor={sendRequestToMentor}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <StudentRequestsQueue
                unconfirmedRequests={unconfirmedRequests}
                cancelRequest={(userskill_id) => cancelRequest(userskill_id)}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={4}>
              <ConfirmedRequestsList confirmedRequests={confirmedRequests} />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
