import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import styles from "../styles/ManagerDashboard.css";
import axios from "axios";

import LevelsTable from "./LevelsTable";
import SkillsTable from "./SkillsTable";

export default function Dashboard() {
  const [levelsList, setLevelsList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);

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

  useEffect(() => {
    fetchLevelsData();
    fetchSkillsData();
  }, []);

  const updateLevelsList = () => fetchLevelsData();
  const updateSkillsList = () => fetchSkillsData();

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
              <Paper style={(styles.paper, styles.fixedHeight)}>
                {/* <Orders /> */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
