import React from "react";
import { Link,Paper, Grid, Avatar, Button, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomModal from "./modal/CustomModal";
import {useCookies} from 'react-cookie';
import { API_ENDPOINT } from "../const";

const Login = () => {
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
  const [error, setError] = useState({});
  const [show, setShow] = useState(false);
  const [cookie, setCookie] = useCookies(['access_token', 'refresh_token'])


  const handleSubmit = (e) => {
    e.preventDefault();
    callApi();
  };

  const handleClick = () => {
    navigate("/sign-up");
  }

  const callApi = () => {
    const url = `${API_ENDPOINT}/authenticator/login`
    const reqData = { email, password }

    axios.post(url, reqData).then(response => {
      console.log(response);
      setShow(response.data.response.Error && response.data.response.Error != {})
      const error = response.data.response.Error
      if (error) {
        setError({
          title: "Error",
          message: error['Message'],
        })
      } else {
        setCookie('username', response.data.username, { path: '/'})
        navigate("/upload-passport");
        
      console.log('Access Token:'+response.data.response.AuthenticationResult.AccessToken)
      console.log('Refresh Token:'+response.data.response.AuthenticationResult.RefreshToken)
      console.log('Id Token:'+response.data.response.AuthenticationResult.IdToken)
      // setCookie('access_token', response.data.response.AuthenticationResult.AccessToken, { path: '/'})
      // setCookie('refresh_token', response.data.response.AuthenticationResult.RefreshToken, { path: '/'})
      // setCookie('id_token', response.data.response.AuthenticationResult.IdToken, { path: '/'})

      }

    }).catch(err => {
      alert(err)
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
          <h2 style={headerStyle}>Login</h2>
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
        
        

          <Button
            style={buttonStyle}
            type="submit"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <br />
          <Link onClick={() => {
    handleClick()}}
 variant="body2">
  {'Not Yet Registered? Sign Up'}
</Link>        </form>
      </Paper>
    </Grid>
  );
};
export default Login;
