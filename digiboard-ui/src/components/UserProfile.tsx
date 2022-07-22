import "./UserProfile.css";
import Stack from "@mui/material/Stack";
import { Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

interface LocationState {
  result: any;
}

const UserProfile: React.FC = (props) => {
  const navigate = useNavigate();
  const location = useLocation().state as LocationState;

  return (
    <Box className="Grid">
      <h2 className="InputLabel">User Profile</h2>
      <Stack spacing={0}>
        <div className="row">
          <label className="key">Given Name</label>
          <h4 className="value">{location.result.data.given_name}</h4>
        </div>
        <div className="row">
          <label className="key">Surname</label>
          <h4 className="value">{location.result.data.surname}</h4>
        </div>
        <div className="row">
          <label className="key">Date of Birth</label>
          <h4 className="value">{location.result.data.date_of_birth}</h4>
        </div>
        <div className="row">
          <label className="key">Sex</label>
          <h4 className="value">{location.result.data.sex}</h4>
        </div>
        <div className="row">
          <label className="key">Passport Number</label>
          <h4 className="value">{location.result.data.passport_number}</h4>
        </div>
        <div className="row">
          <label className="key">Date of Expiry</label>
          <h4 className="value">{location.result.data.date_of_expiry}</h4>
        </div>
        <div className="row">
          <label className="key">Date of Issue</label>
          <h4 className="value">{location.result.data.date_of_issue}</h4>
        </div>
        <div className="row">
          <label className="key">Place of Issue</label>
          <h4 className="value">{location.result.data.place_of_issue}</h4>
        </div>
        <div className="row">
          <label className="key">Place of Birth</label>
          <h4 className="value">{location.result.data.place_of_birth}</h4>
        </div>

        <Button
          variant="contained"
          className="button-back"
          onClick={() => {
            navigate("/checks", {
              state: {
                result: location.result,
              },
            });
          }}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default UserProfile;
