import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import styles from "../styles/SignUpIn.css.js";
import axios from "axios";

export default function SignUp() {
  let history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCpassword] = useState();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mname, setMname] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [cpasswordError, setCPasswordError] = useState(false);
  const [errorTextE, setErrorTextE] = useState("");
  const [errorTextP, setErrorTextP] = useState("");
  const [errorTextCP, setErrorTextCP] = useState("");

  const onChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "cpassword":
        setCpassword(e.target.value);
        break;
      case "firstName":
        setFname(e.target.value);
        break;
      case "lastName":
        setLname(e.target.value);
        break;
      case "middleName":
        setMname(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: email,
      password: password,
      firstName: fname,
      lastName: lname,
      middleName: mname,
    };
    if (!body.email) {
      setEmailError(true);
      setErrorTextE("Email is required!");
    } else if (!body.password) {
      setPasswordError(true);
      setErrorTextP("Password is required!");
    } else if (password !== cpassword) {
      setPasswordError(true);
      setCPasswordError(true);
      setErrorTextP("Fields should match!");
      setErrorTextCP("Fields should match!");
    } else if (password.length < 8) {
      setPasswordError(true);
      setErrorTextP("Minimal number of symbols is 8");
    } else {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/v1/users",
          body
        );
        if (data.userData) history.push("/");
      } catch (e) {
        if (+e.response.status === 400) {
          setEmailError(true);
          setErrorTextE("Email is not correct!");
        }
        return e.message;
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={styles.container}>
        <Avatar style={styles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form style={styles.form} noValidate onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email address"
                name="email"
                autoComplete="email"
                onChange={onChange}
                error={emailError}
                helperText={errorTextE}
                inputProps={{ maxLength: 40 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
                error={passwordError}
                helperText={errorTextP}
                inputProps={{ maxLength: 30 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm password"
                type="password"
                id="cpassword"
                autoComplete="current-password"
                onChange={onChange}
                error={cpasswordError}
                helperText={errorTextCP}
                inputProps={{ maxLength: 30 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First name"
                autoFocus
                onChange={onChange}
                inputProps={{ maxLength: 15 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="middleName"
                label="Middle name"
                name="middleName"
                autoComplete="mname"
                onChange={onChange}
                inputProps={{ maxLength: 15 }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last name"
                name="lastName"
                autoComplete="lname"
                onChange={onChange}
                inputProps={{ maxLength: 15 }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={styles.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
