import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Card, CardContent, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const HospitalEntryView = ({ entry, diagnoses }: Props) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom component="span">
          {entry.date}
        </Typography>
        <LocalHospitalIcon sx={{ ml: 1 }} />
        <Typography variant="body1" component="p" sx={{ mb: 1.5 }}>
          <i>{entry.description}</i>
        </Typography>
        <ul>
          {entry.diagnosisCodes
            ? entry.diagnosisCodes.map((code) => (
                <Typography key={code} variant="body2">
                  <li>
                    {code}{" "}
                    {diagnoses.map((d) => {
                      if (d.code === code) {
                        return d.name;
                      }
                    })}
                  </li>
                </Typography>
              ))
            : null}
        </ul>
        <Typography
          variant="body1"
          sx={{ fontSize: 15 }}
          color="text.secondary"
          component="p"
        >
          diagnose by {entry.specialist}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HospitalEntryView;
