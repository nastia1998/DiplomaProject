import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import styles from "../styles/ManagerDashboard.css";

import LevelsTable from "./LevelsTable";
import LevelsGrid from "./LevelsGrid";

export default function Dashboard() {
  return (
    <div style={styles.root}>
      <CssBaseline />
      <main style={styles.content}>
        <Container maxWidth="lg" style={styles.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              {/* <Paper style={(styles.paper, styles.fixedHeight)}> */}
              {/* <LevelsTable /> */}
              <LevelsTable />
              {/* </Paper> */}
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper style={(styles.paper, styles.fixedHeight)}>
                {/* <Deposits /> */}
              </Paper>
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
