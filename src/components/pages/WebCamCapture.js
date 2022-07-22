import React from "react";
import Webcam from "react-webcam";
import { AiOutlineCamera } from "react-icons/ai";
import {Box} from "@material-ui/core";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebCamCapture = (props) => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    props.onCapture(imageSrc);
  }, [webcamRef, props]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Webcam
        audio={false}
        height={500}
        width={500}
        mirrored={true}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <AiOutlineCamera mt={5} size={25} onClick={capture} />
    </Box>
  );
};

export default WebCamCapture;
