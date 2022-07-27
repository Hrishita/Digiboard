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

const Admin = () => {
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

  const handleClick = (e) => {
    callApi();
  };

  const callApi = () => {

     const url = ""
  
  }
   

  return (
    <Grid>
      <Paper elevation={3} style={paperStyle}>
         <Grid align="center">
          <h2 variant="h6" color="secondary" gutterBottom>Generate Report</h2>
        </Grid>
       
            <Typography variant="h6" gutterBottom>
                Hey Admin! Click on the button below to generate the user onboarding report. 
                The report will be sent to your email.
            </Typography>
            
                <Typography variant="h6">
               
            </Typography>

            <Grid align="center">
          <Button
            style={buttonStyle}
            onClick={handleClick}
            type="Logout"
            variant="contained"
            color="primary"
        
          >
           Generate Report
          </Button>
       </Grid>
      </Paper>
    </Grid>
  );
};
export default Admin;
