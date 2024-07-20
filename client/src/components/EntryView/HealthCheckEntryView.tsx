import { Card, CardContent, Typography } from "@mui/material";
import { Diagnosis, Entry, HealthCheckEntry } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const isHealthCheckEntry = (entry: Entry): entry is HealthCheckEntry => {
  return entry.type === "HealthCheck";
};

const HealthCheckEntryView = ({ entry, diagnoses }: Props) => {
  if (!isHealthCheckEntry(entry)) {
    return null;
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom component="span">
          {entry.date}
        </Typography>
        <MedicalServicesIcon sx={{ ml: 1 }} />
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

export default HealthCheckEntryView;
