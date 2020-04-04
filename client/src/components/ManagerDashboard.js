import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import styles from "../styles/ManagerDashboard.css";
import axios from "axios";

import LevelsTable from "./LevelsTable";
import SkillsTable from "./SkillsTable";
import MentorsTable from "./MentorsTable";

export default function Dashboard() {
  const [levelsList, setLevelsList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [mentorsList, setMentorsList] = useState([]);
  const [studentsList, setStudentsList] = useState([]);

  async function fetchLevelsData() {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/levels/manager",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    setLevelsList(data);
  }

  async function fetchSkillsData() {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/skills/manager",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    setSkillsList(data);
  }

  async function fetchMentorsData() {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/mentors/manager",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    setMentorsList(data);
  }

  async function fetchStudentsData() {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/users/students/manager",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    setStudentsList(data);
  }

  useEffect(() => {
    fetchLevelsData();
    fetchSkillsData();
    fetchMentorsData();
    fetchStudentsData();
  }, []);

  const updateLevelsList = () => fetchLevelsData();
  const updateSkillsList = () => fetchSkillsData();
  const updateMentorsList = () => fetchMentorsData();
  const updateStudentsList = () => fetchStudentsData();

  return (
    <div style={styles.root}>
      <CssBaseline />
      <main style={styles.content}>
        <Container maxWidth="lg" style={styles.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <LevelsTable
                levelsList={levelsList}
                updateLevelsList={() => updateLevelsList()}
                updateSkillsList={() => updateSkillsList()}
                setLevelsList={data => setLevelsList(data)}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <SkillsTable
                skillsList={skillsList}
                levelsList={levelsList}
                updateSkillsList={() => updateSkillsList()}
                setSkillsList={data => setSkillsList(data)}
              />
            </Grid>
            <Grid item xs={12}>
              <MentorsTable
                mentorsList={mentorsList}
                studentsList={studentsList}
                setMentorsList={data => setMentorsList(data)}
                updateMentorsList={() => updateMentorsList()}
                updateStudentsList={() => updateStudentsList()}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
