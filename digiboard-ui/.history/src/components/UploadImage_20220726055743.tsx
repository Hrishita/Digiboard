import "./UploadImage.css";
import Grid from "@mui/material/Stack";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import passportImage from "../assets/passport.png";
import { API_ENDPOINT } from "../const";

function UploadImage() {
  const navigate = useNavigate();
  const [files, setFiles] = useState(""); //store file
  const [alert, setAlert] = useState(""); //alert

  const selectFiles = (event: any) => {
    setFiles(event.target.files);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        let currentFile = files[0];

        let formData = new FormData();
        formData.append("file", currentFile);

        axios
          .post(`${API_ENDPOINT}/extractor/image/details`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(function (response) {
            navigate("/profile", {
              state: {
                result: response.data,
              },
            });
          })
          .catch(function (error) {
            setAlert(error.response.data);
          });
      }}
    >
      <Grid spacing={0} className="Grid">
        <Box className="Box">
          <h1 className="InputLabel">DigiBoard</h1>
        </Box>
        <h4 className="heading">Upload Passport Photo</h4>
        <text className="Instruction">
          Upload a good quality photo of your passport's bio page. Please avoid
          uploading image with glare, blurness and low light
        </text>
        <img className="image" src={passportImage}></img>
        <input
          className="ChooseFile"
          type="file"
          name="image"
          placeholder="Image"
          onChange={selectFiles}
        />
        <Box className="Box">
          <Button type="submit" variant="contained" className="Button">
            Submit
          </Button>
        </Box>
        {alert ? <Alert severity="error">{alert}</Alert> : <></>}{" "}
      </Grid>
    </form>
  );
}

export default UploadImage;
