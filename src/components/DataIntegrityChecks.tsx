import "./DataIntegrityChecks.css";
import Stack from "@mui/material/Stack";
import { Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

interface LocationState {
  result: any;
}

const DataIntegrityChecks: React.FC = (props) => {
  const navigate = useNavigate();
  const location = useLocation().state as LocationState;

  useEffect(() => {
    console.log(location.result);
  }, [location.result]);

  return (
    <Box className="Grid">
      <h2 className="InputLabel">Data Integrity Validation</h2>
      <Stack spacing={0}>
        <div className="row">
          <label className="key">Date of Birth</label>
          <h4 className="value">
            {location.result.integrity_checks.valid_dob + ""}
          </h4>
        </div>
        <div className="row">
          <label className="key">Paasport Number</label>
          <h4 className="value">
            {location.result.integrity_checks.valid_passport_number + ""}
          </h4>
        </div>
        <div className="row">
          <label className="key">Date of Expiry</label>
          <h4 className="value">
            {location.result.integrity_checks.valid_expiry_date + ""}
          </h4>
        </div>
        <div className="row">
          <label className="key">Date of Issue</label>
          <h4 className="value">
            {location.result.integrity_checks.valid_issue_date + ""}
          </h4>
        </div>

        <Button
          variant="contained"
          className="button-back"
          onClick={() => {
            navigate("/profilelist");
          }}
        >
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default DataIntegrityChecks;
