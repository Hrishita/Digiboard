import React, { useState } from 'react';
import WebCamCapture from './WebCamCapture';
import { Typography, Button,Box } from '@material-ui/core';
import axios from 'axios';
import {useCookies}   from 'react-cookie';
import { API_ENDPOINT } from '../../const';
import { useNavigate } from "react-router-dom";

function CaptureImage() {

  const navigate = useNavigate();

  const [targetImage, setTargetImage] = useState('');
  const [cookie, setCookie] = useCookies()
  const handleCapturedImage = capturedImg => {
    setTargetImage(capturedImg);
  };


  const handleSubmit = () => {
    // const url = 'http://jay-alb-1749361.us-east-1.elb.amazonaws.com/comparator/compare';
    const url = `${API_ENDPOINT}/comparator/compare`;
    const data = { username: cookie.username, target_image: targetImage };
    axios.post(url, data).then(res => {
        console.log(res)
        navigate('/logout')
    }).catch(err => console.error(err));
  };

  return (
    <Box direction={'column'} justify={'space-between'}>
        <Box>
            
        </Box>

        <Box>
            { 
                targetImage 
                ? <Box boxsize="md">
                    <Box
                        component="img"
                        sx={{
                            height: "100%",
                            width: "auto"
                        }}
                        src={targetImage}
                        alt="target-image"
                    />
                 </Box>
                : <WebCamCapture onCapture={handleCapturedImage} />
            }
        </Box>

        <Box justify={'center'} sx={{ m:"2rem" , p:"2rem"}}>
            { targetImage && <>
                <Button  variant="contained"  onClick={() => {setTargetImage('')}} >
                    Retake
                </Button>
                
                <Button variant="contained"  onClick={handleSubmit} >
                    Submit
                </Button>
            </>
            }
        </Box>
    </Box>
  );
}

export default CaptureImage;
