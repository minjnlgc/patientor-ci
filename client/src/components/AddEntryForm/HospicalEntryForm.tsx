import {
  SelectChangeEvent,
  Card,
  CardContent,
  Typography,
  TextField,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, EntryWithoutId } from "../../types";

interface Props {
  toggleVisibility: () => void;
  diagnoses: Diagnosis[];
  onSubmit: (object: EntryWithoutId, id?: string) => void;
}

const HospitalEntryForm = ({
  toggleVisibility,
  diagnoses,
  onSubmit,
}: Props) => {
  const [diagnosisCode, setDiagnosisCode] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");

  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

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
    const OccupationalEntry: EntryWithoutId = {
      description: description,
      date: date,
      specialist: specialist,
      diagnosisCodes: diagnosisCode,
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
      type: "Hospital",
    };

    console.log(OccupationalEntry);

    onSubmit(OccupationalEntry);
  };

  return (
    <Card sx={{ minWidth: 275, mt: 2 }}>
      <CardContent>
        <Typography gutterBottom sx={{ mb: 1 }}>
          <strong>New Hospital entry</strong>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            id="description"
            fullWidth
            label="Description"
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(event.target.value)
            }
            multiline
            maxRows={4}
          />

          <Input
            type="date"
            id="date"
            value={date}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDate(event.target.value)
            }
            sx={{ mb: 1.5, mt: 2.5, ml: 1 }}
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

          {/* sick leaves */}
          <InputLabel sx={{ mb: 1, ml: 1 }}>Discharge Information</InputLabel>

          <InputLabel sx={{ ml: 1.5 }}>Discharge Date</InputLabel>
          <Input
            type="date"
            id="discharge-date"
            value={dischargeDate}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDischargeDate(event.target.value)
            }
            sx={{ mb: 1.5, mt: 0.5, ml: 1.5 }}
          />
          <br />
          <TextField
            id="criteria"
            label="Criteria"
            value={dischargeCriteria}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDischargeCriteria(event.target.value)
            }
            sx={{ mb: 1.5, mt: 0.5, ml: 1.5 }}
          />

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

export default HospitalEntryForm;
