import {
  Card,
  CardContent,
  Typography,
  TextField,
  Input,
  Button,
  InputLabel,
  MenuItem,
  Select,
  ListItemText,
  Checkbox,
  SelectChangeEvent,
} from "@mui/material";
import { Diagnosis, EntryWithoutId } from "../../types";
import { SyntheticEvent, useState } from "react";

interface Props {
  toggleVisibility: () => void;
  diagnoses: Diagnosis[];
  onSubmit: (object: EntryWithoutId, id?: string) => void;
}

const OccupationalEntryForm = ({
  toggleVisibility,
  diagnoses,
  onSubmit,
}: Props) => {
  const [diagnosisCode, setDiagnosisCode] = useState<Array<Diagnosis["code"]>>(
    []
  );
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [specialist, setSpecialist] = useState("");

  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

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

    let occupationalEntry: EntryWithoutId = {
      description: description,
      date: date,
      specialist: specialist,
      diagnosisCodes: diagnosisCode,
      employerName: employerName,
      type: "OccupationalHealthcare",
    };

    if (sickLeaveStartDate && sickLeaveEndDate) {
      occupationalEntry.sickLeave = {
        startDate: sickLeaveStartDate,
        endDate: sickLeaveEndDate,
      };
    }

    console.log(occupationalEntry);

    onSubmit(occupationalEntry);
  };

  return (
    <Card sx={{ minWidth: 275, mt: 2 }}>
      <CardContent>
        <Typography gutterBottom sx={{ mb: 1 }}>
          <strong>New Occupational Health Care entry</strong>
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
            sx={{ mb: 1.5, mt: 2.5, ml: 1 }}
            value={date || ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDate(event.target.value)
            }
          />

          <TextField
            id="employerName"
            label="Employer Name"
            value={employerName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmployerName(event.target.value)
            }
            fullWidth
            sx={{ mb: 2, mt: 2 }}
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
          <InputLabel sx={{ mb: 1, ml: 1 }}>Sick Leave</InputLabel>

          <InputLabel sx={{ ml: 1.5 }}>Start Date</InputLabel>
          <Input
            type="date"
            id="startDate"
            value={sickLeaveStartDate}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSickLeaveStartDate(event.target.value)
            }
            sx={{ mb: 1.5, mt: 0.5, ml: 1.5 }}
          />

          <InputLabel sx={{ ml: 1.5 }}>End Date</InputLabel>
          <Input
            type="date"
            id="EndDate"
            value={sickLeaveEndDate}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSickLeaveEndDate(event.target.value)
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

export default OccupationalEntryForm;
