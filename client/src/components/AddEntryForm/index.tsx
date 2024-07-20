import HealthCheckEntryForm from "./HealthCheckEntryForm";

import { formTypes } from "../../constants";
import OccupationalEntryForm from "./OccupationalEntryForm";
import { Diagnosis, EntryWithoutId } from "../../types";
import HospitalEntryForm from "./HospicalEntryForm";

interface Props {
  toggleVisibility: () => void;
  formType: string;
  diagnoses: Diagnosis[];
  onSubmit: (object: EntryWithoutId, id?: string) => void
}

const AddEntryForm = ({ toggleVisibility, formType, diagnoses, onSubmit }: Props) => {
  switch (formType) {
    case formTypes[0]:
      return (
        <HealthCheckEntryForm
          toggleVisibility={toggleVisibility}
          diagnoses={diagnoses}
          onSubmit={onSubmit}
        />
      );
    case formTypes[1]:
      return (
        <HospitalEntryForm
          toggleVisibility={toggleVisibility}
          diagnoses={diagnoses}
          onSubmit={onSubmit}
        />
      );
    case formTypes[2]:
      return (
        <OccupationalEntryForm
          toggleVisibility={toggleVisibility}
          diagnoses={diagnoses}
          onSubmit={onSubmit}
        />
      );
    default:
      return <div>Invalid form types</div>;
  }
};

export default AddEntryForm;
