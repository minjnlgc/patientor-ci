import {
  Card,
  CardContent,
  Typography,
  TextField,
  Input,
  MenuItem,
  Button,
  Checkbox,
  InputLabel,
  ListItemText,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../types";
import { SyntheticEvent, useState } from "react";

interface Props {
  toggleVisibility: () => void;
  diagnoses: Diagnosis[];
  onSubmit: (object: EntryWithoutId, id?: string) => void;
}

const HealthCheckEntryForm = ({
  toggleVisibility,
  diagnoses,
  onSubmit,
}: Props) => {
  const [diagnosisCode, setDiagnosisCode] = useState<Array<Diagnosis["code"]>>(
    []
  );
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthcheckrating, setHealthcheckrating] = useState<
    HealthCheckRating | string
  >("");

  const handleDiagnosisCodeChange = (
    event: SelectChangeEvent<typeof diagnosisCode>
  ) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCode(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    console.log("submit!");
    console.log("description:", description);
    console.log("date:", date);
    console.log("specialist:", specialist);
    console.log("health check rating:", healthcheckrating);
    console.log("diagnosisCode:", diagnosisCode);

    const healthCheckEntry: EntryWithoutId = {
      description: description,
      date: date,
      specialist: specialist,
      diagnosisCodes: diagnosisCode,
      healthCheckRating: healthcheckrating as HealthCheckRating,
      type: "HealthCheck",
    };

    console.log(healthCheckEntry);

    onSubmit(healthCheckEntry);
  };

  return (
    <Card sx={{ minWidth: 275, mt: 2 }}>
      <CardContent>
        <Typography gutterBottom>
          <strong>New HealthCheck entry</strong>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            id="description"
            fullWidth
            label="Description"
            multiline
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(event.target.value)
            }
            maxRows={4}
          />

          <Input
            type="date"
            sx={{ mb: 1.5, mt: 2.5, ml: 1 }}
            value={date || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDate(event.target.value)
            }
          />

          <TextField
            id="specialist"
            label="Specialist"
            value={specialist}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSpecialist(event.target.value)
            }
            fullWidth
            sx={{ mb: 2, mt: 2 }}
          />

          <TextField
            id="healthcheckrating"
            select
            label="Health check rating"
            defaultValue={healthcheckrating || ""}
            value={healthcheckrating}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setHealthcheckrating(
                Number(event.target.value) as HealthCheckRating
              )
            }
            fullWidth
            sx={{ mb: 2, mt: 2 }}
          >
            {Object.keys(HealthCheckRating)
              .filter((key) => isNaN(Number(key))) // Filters out numeric keys
              .map((key) => {
                const value =
                  HealthCheckRating[key as keyof typeof HealthCheckRating];
                return (
                  <MenuItem key={value} value={value}>
                    {key}
                  </MenuItem>
                );
              })}
          </TextField>

          {/* diagnosis codes */}
          <InputLabel id="diagnosis-codes-label" sx={{ mt: 1, ml: 0.2 }}>
            Diagnosis Codes
          </InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            id="diagnosisCodes"
            multiple
            value={diagnosisCode}
            fullWidth
            onChange={handleDiagnosisCodeChange}
            // input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(", ")}
            sx={{ mb: 2, mt: 1 }}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                <Checkbox
                  checked={diagnosisCode.indexOf(diagnosis.code) > -1}
                />
                <ListItemText primary={diagnosis.code} />
              </MenuItem>
            ))}
          </Select>

          <Button variant="contained" color="error" onClick={toggleVisibility}>
            Cancel
          </Button>
          <Button type="submit">Add</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HealthCheckEntryForm;
