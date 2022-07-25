import React from "react";
import { Paper, Grid, Avatar, Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomModal from "./modal/CustomModal";
import {useCookies} from 'react-cookie'
import { API_ENDPOINT } from "../const";
const Register = () => {
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState({});
  const [show, setShow] = useState(false);
  const [cookie, setCookie] = useCookies(['username'])

  const handleSubmit = (e) => {
    e.preventDefault();
    callApi();
  };

  const callApi = () => {
    const url = `${API_ENDPOINT}/authenticator/sign-up`
    const reqData = { email, password }

    axios.post(url, reqData).then(response => {
      setShow(response.data.response.Error && response.data.response.Error != {})
      const error = response.data.response.Error
      if (error) {
        setError({
          title: "Error",
          message: error['Message'],
        })
      } else {
     setCookie('username', response.data.response.UserSub, { path: '/'})
     navigate("/confirmation", { state: { email } });

      }
    }).catch(err => {
      console.error(err);
    })

  }
   


  return (
    <Grid>
      {
        show ? (<CustomModal open={show} handleClose={() => {setShow(false)}} title={error['title']} message={error['message']} />) : null
      }
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
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
            className={`input ${errors.email && "is-danger"}`}
            required
          />
          {errors.email && (
            <p style={help} className="help is-danger">
              {errors.email}
            </p>
          )}

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
            className={`input ${errors.password && "is-danger"}`}
            required
            value={password}
          />
          {errors.password && (
            <p style={help} className="help is-danger">
              {errors.password}
            </p>
          )}

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
            className={`input ${errors.confirmPassword && "is-danger"}`}
            required
            value={confirmPassword}
          />
          {errors.confirmPassword && (
            <p style={help} className="help is-danger">
              {errors.confirmPassword}
            </p>
          )}

          <Button
            style={buttonStyle}
            type="submit"
            variant="contained"
            color="primary"
          >
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};
export default Register;
