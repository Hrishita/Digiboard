import React from "react";
import { Paper, Grid, Avatar, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

  const [email, setEmail] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();
    callApi();
  };

  const callApi = () => {
    const url = `${API_ENDPOINT}/authenticator/forgot-password`
    const reqData = { email}

    axios.post(url, reqData).then(respose => {
      console.log(respose);
     navigate("/confirm-forgot-password", { state: { email } });
    }).catch(err => {
      console.error(err);
    })

  }
   


  return (
    <Grid>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Forgot Password</h2>
        </Grid>
        <form onSubmit={handleSubmit} noValidate>
        
          <TextField
            style={textFieldStyle}
            variant="outlined"
            label="Email"
            fullWidth
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            name="email"
            required
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
