import React from "react";
import { Paper, Grid, Avatar, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { API_ENDPOINT } from "../const";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const paperStyle = {
    padding: "30px 20px",
    width: "300px",
    margin: "20px auto",
  };
  const headerStyle = {
    margin: "0",
  };
  const avatarStyle = {
    backgroundColor: "#f50057",
  };

  const textFieldStyle = {
    margin: "10px 0",
  };

  const help = {
    color: "red",
    margin: "0",
  };
  const buttonStyle = {
    margin: "10px 0",
  };

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmation_code, setConfirmationCode] = useState("");
  const location = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    callApi();
  };

  const callApi = () => { 
    const url = `${API_ENDPOINT}/cognito/confirm-forgot-password`
   // const url = "http://127.0.0.1:5001/cognito/confirm-forgot-password";
    const email = location.state.email;

    const reqData = { email, password, confirmation_code };

    axios
      .post(url, reqData)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Grid>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Reset Password</h2>
        </Grid>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            style={textFieldStyle}
            variant="outlined"
            label="Confirmation Code"
            fullWidth
            type="number"
            onChange={(e) => {
              setConfirmationCode(e.target.value);
            }}
            value={confirmation_code}
            name="cofirmationCode"
            required
          />
          <TextField
            style={textFieldStyle}
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            required
            value={password}
          />

          <TextField
            style={textFieldStyle}
            id="outlined-password-input"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            name="confirmPassword"
            required
            value={confirmPassword}
          />

          <Button
            style={buttonStyle}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
export default ForgotPassword;
