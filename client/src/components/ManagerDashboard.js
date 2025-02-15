import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";

import styles from "../styles/ManagerDashboard.css";
import axios from "axios";

import SkillsTable from "./SkillsTable";
import MentorsTable from "./MentorsTable";

export default function ManagerDashboard(props) {
  let history = useHistory();
  const [skillsList, setSkillsList] = useState([]);
  const [mentorsList, setMentorsList] = useState([]);
  const [mentorsSkills, setMentorsSkills] = useState([]);
  const [studentsList, setStudentsList] = useState([]);
  const [specialSkillsList, setSpecialSkillsList] = useState([]);
  const [usersList, setUsersList] = useState([]);

  async function fetchSkillsData() {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/skills/manager",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSkillsList(data);
      const specialList = data.filter((i) => i.level_name === "senior");
      setSpecialSkillsList(specialList);
    } catch (error) {
      if (+error.response.status === 401) {
        localStorage.clear();
        history.push("/");
      }
    }
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
      "http://localhost:3000/api/v1/userskills/potentialmentors/manager",
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

  async function fetchUsersData() {
    const { data } = await axios.get(`http://localhost:3000/api/v1/users`);
    setUsersList(data);
  }

  useEffect(() => {
    fetchSkillsData();
    fetchMentorsData();
    fetchStudentsData();
    fetchUsersData();
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
                openMessage={props.openMessage}
                severity={props.severity}
                messageText={props.messageText}
                handleShowMessage={(s, e) => props.handleShowMessage(s, e)}
                handleCloseMessage={(e, r) => props.handleCloseMessage(e, r)}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <MentorsTable
                mentorsList={mentorsList}
                studentsList={studentsList}
                usersList={usersList}
                mentorsSkills={mentorsSkills}
                specialSkillsList={specialSkillsList}
                setMentorsList={(data) => setMentorsList(data)}
                updateMentorsList={() => updateMentorsList()}
                updateStudentsList={() => updateStudentsList()}
                fetchMentorsSkillsData={(id) => fetchMentorsSkillsData(id)}
                updateMentorsSkills={() => updateMentorsSkills()}
                openMessage={props.openMessage}
                severity={props.severity}
                messageText={props.messageText}
                handleShowMessage={(s, e) => props.handleShowMessage(s, e)}
                handleCloseMessage={(e, r) => props.handleCloseMessage(e, r)}
              />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
