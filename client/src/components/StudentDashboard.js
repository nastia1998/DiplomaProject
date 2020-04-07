import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import styles from "../styles/StudentDashboard.css";
import axios from "axios";

import Profile from "./Profile";

export default function Dashboard() {
  const [studentInfo, setStudentInfo] = useState([]);
  const [studentSkills, setStundentSkills] = useState([]);
  const [availableSkills, setAvailableSkills] = useState([]);

  async function fetchStudentInfo() {
    const { data } = await axios.get("http://localhost:3000/api/v1/users/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    setStudentInfo(data);
  }

  async function fetchStudentSkills() {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/users/${localStorage.getItem(
        "userId"
      )}/userskills`
    );
    const res = [];
    Object.values(data).map(i => {
      const t = Object.values(i); //Skill[i]
      res.push(t[0]);
    });
    setStundentSkills(res);
  }

  async function fetchAvailableSkills() {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/skills/${localStorage.getItem(
        "userId"
      )}/student`
    );
    setAvailableSkills(data);
  }

  useEffect(() => {
    fetchStudentInfo();
    fetchStudentSkills();
    fetchAvailableSkills();
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
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              dddd
            </Grid>
            <Grid item xs={12} md={12} lg={5}>
              ssss
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
