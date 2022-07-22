import React from "react";
import { Paper, Grid, Avatar, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomModal from "./modal/CustomModal";
import { useLocation } from "react-router-dom";
import { API_ENDPOINT } from "../const";
const ConfirmationCode = () => {
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

  const [confirmation_code, setConfirmationCode] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState({});
  const [show, setShow] = useState(false);

  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    callApi();
  };

  const callApi = () => {
    const url = `${API_ENDPOINT}/cognito/confirm-code`

    //const url = "http://127.0.0.1:5001/cognito/confirm-code";
    const email = location.state.email;
    const reqData = { email, confirmation_code };

    axios
      .post(url, reqData)
      .then((response) => {
        setShow(response.data.response.Error && response.data.response.Error != {})
        const error = response.data.response.Error
        if (error) {
          setError({
            title: "Error",
            message: error['Message'],
          })
        } else {
          navigate("/");
        }

      })
      .catch((err) => {
        console.error(err);
      });
  };

   

  return (
    <Grid>
       {
        show ? (<CustomModal open={show} handleClose={() => {setShow(false)}} title={error['title']} message={error['message']} />) : null
      }
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <h2 style={headerStyle}>Enter Confirmation Code</h2>
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
            name="confirmation code"
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
export default ConfirmationCode;
