import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import styles from "../styles/ManagerDashboard.css";
import axios from "axios";

import SkillsTable from "./SkillsTable";
import MentorsTable from "./MentorsTable";

export default function Dashboard() {
  const [skillsList, setSkillsList] = useState([]);
  const [mentorsList, setMentorsList] = useState([]);
  const [mentorsSkills, setMentorsSkills] = useState([]);
  const [studentsList, setStudentsList] = useState([]);

  async function fetchSkillsData() {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/skills/manager",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setSkillsList(data);
  }

  async function fetchMentorsData() {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/mentors/manager",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setMentorsList(data);
  }

  async function fetchMentorsSkillsData(id) {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/mentors/${id}/skills/manager`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    let b = [];
    Object.values(data).map((i, index) => {
      Object.values(i).map((u) => {
        b.push(`${index + 1}: ${u.name} `);
      });
    });
    setMentorsSkills([b, ...mentorsSkills]);
  }

  async function fetchStudentsData() {
    const { data } = await axios.get(
      "http://localhost:3000/api/v1/users/potentialmentors/manager",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setStudentsList(data);
  }
  async function resetMentorsSkills() {
    setMentorsSkills([]);
  }

  useEffect(() => {
    fetchSkillsData();
    fetchMentorsData();
    fetchStudentsData();
  }, []);

  const updateSkillsList = () => fetchSkillsData();
  const updateMentorsList = () => fetchMentorsData();
  const updateStudentsList = () => fetchStudentsData();
  const updateMentorsSkills = () => resetMentorsSkills();

  return (
    <div style={styles.root}>
      <CssBaseline />
      <main style={styles.content}>
        <Container maxWidth="lg" style={styles.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={6}>
              <SkillsTable
                skillsList={skillsList}
                updateSkillsList={() => updateSkillsList()}
                setSkillsList={(data) => setSkillsList(data)}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <MentorsTable
                mentorsList={mentorsList}
                studentsList={studentsList}
                mentorsSkills={mentorsSkills}
                setMentorsList={(data) => setMentorsList(data)}
                updateMentorsList={() => updateMentorsList()}
                updateStudentsList={() => updateStudentsList()}
                fetchMentorsSkillsData={fetchMentorsSkillsData}
                updateMentorsSkills={() => updateMentorsSkills()}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
