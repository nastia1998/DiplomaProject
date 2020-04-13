import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import styles from "../styles/StudentDashboard.css";
import axios from "axios";

import Profile from "./Profile";
import StudentRequestsQueue from "./StudentRequestsQueue";
import ConfirmedRequestsList from "./ConfirmedRequestsList";

export default function Dashboard() {
  const [studentInfo, setStudentInfo] = useState([]);
  const [studentSkills, setStundentSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);
  const [mentorsList, setMentorsList] = useState([]);
  const [unconfirmedRequests, setUnconfirmedRequests] = useState([]);
  const [confirmedRequests, setConfirmedRequests] = useState([]);

  async function fetchStudentInfo() {
    const { data } = await axios.get("http://localhost:3000/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setStudentInfo(data);
  }

  async function fetchStudentSkills() {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/userskills/users/${localStorage.getItem(
        "userId"
      )}`
    );
    // const res = [];
    // Object.values(data).map((i) => {
    //   const t = Object.values(i); //Skill[i]
    //   res.push(t[0]);
    // });
    // setStundentSkills(res);
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
      `http://localhost:3000/api/v1/userskills/${userskill_id}`,
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

  useEffect(() => {
    fetchStudentInfo();
    fetchStudentSkills();
    fetchAvailableSkills();
    getUnconfirmedRequests();
    getConfirmedRequests();
  }, []);

  const updateStudentInfo = () => fetchStudentInfo();

  return (
    <div style={styles.root}>
      <CssBaseline />
      <main style={styles.content}>
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
