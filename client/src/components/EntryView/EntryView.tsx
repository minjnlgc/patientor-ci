import { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { formTypes } from "../../constants";

import { Diagnosis, Entry, EntryWithoutId } from "../../types";
import diagnosisService from "../../services/diagnoses";
import HospitalEntryView from "./HospitalEntryView";
import OccupationalEntryView from "./OccupationalEntryView";
import HealthCheckEntryView from "./HealthCheckEntryView";
import AddEntryForm from "../AddEntryForm";

interface Props {
  entries: Entry[];
  onSubmit: (object: EntryWithoutId, id?: string) => void
}

const EntryView = ({ entries, onSubmit }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [close, setClose] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formType, setformType] = useState('');

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisibke = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleButtonClick = () => {
    setClose(!close);
  };

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const returnedDiagnoses = await diagnosisService.getAll();
      setDiagnoses(returnedDiagnoses);
    };

    fetchDiagnoses();
  }, [entries]);

  const assertNever = (value: never): never => {
    throw new Error(`Unexpected value: ${JSON.stringify(value)}`);
  };

  const handleFormChoice = (formType: string) => {
    console.log(formType);
    setClose(!close);
    setformType(formType)
    toggleVisibility();
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntryView entry={entry} diagnoses={diagnoses} />;
      case "OccupationalHealthcare":
        return <OccupationalEntryView entry={entry} diagnoses={diagnoses} />;
      case "HealthCheck":
        return <HealthCheckEntryView entry={entry} diagnoses={diagnoses} />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          style={{ marginTop: "1em" }}
          onClick={handleButtonClick}
        >
          Add New Entry
        </Button>
        <Collapse in={close} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {formTypes.map((type) => (
              <ListItemButton
                sx={{ pl: 4 }}
                key={type}
                onClick={() => handleFormChoice(type)}
              >
                <ListItemText primary={type} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </div>

      <div style={showWhenVisibke}>
        <AddEntryForm 
          toggleVisibility={toggleVisibility}
          formType={formType}
          diagnoses={diagnoses}
          onSubmit={onSubmit}
        />
      </div>

      <Typography variant="h5" style={{ marginTop: "1em" }}>
        entires
      </Typography>
      <div style={{ marginTop: "1em" }}>
        {entries.map((entry) => (
          <div key={entry.id}>
            <EntryDetails entry={entry} />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntryView;
