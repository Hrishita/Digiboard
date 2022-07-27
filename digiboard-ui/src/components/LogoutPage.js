import React from "react";
import { Paper, Grid, Avatar, Button } from "@material-ui/core";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINT } from "../const";
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  }
}));

const LogoutPage = () => {
    const classes = useStyles();

  const navigate = useNavigate();
  const paperStyle = {
    padding: "30px 20px",
    width: "300px",
    margin: "20px auto",
  };
   
 const buttonStyle = {
    margin: "10px 0",
  };

  const handleSubmit = (e) => {
    callApi();
  };

  const callApi = () => {

    // const url = `${API_ENDPOINT}/authenticator/forgot-password`
    // const reqData = { email}

    // axios.post(url, reqData).then(respose => {
    //   console.log(respose);
    //  navigate("/confirm-forgot-password", { state: { email } });
    // }).catch(err => {
    //   console.error(err);
    // })

  }
   

  return (
    <Grid>
      <Paper elevation={3} style={paperStyle}>
         <Grid align="center">
          <h2 variant="h6" color="secondary" gutterBottom>Onboarding Completed</h2>
        </Grid>
       
            <Typography variant="h6" gutterBottom>
                Your onboarding is completed. You will shortly recevie results.
            </Typography>
            
                <Typography variant="h6">
               
            </Typography>

            <Grid align="center">
          <Button
            style={buttonStyle}
            onClick={() => navigate("/login")}
            type="Logout"
            variant="contained"
            color="primary"
        
          >
           Logout
          </Button>
       </Grid>
      </Paper>
    </Grid>
  );
};
export default LogoutPage;
