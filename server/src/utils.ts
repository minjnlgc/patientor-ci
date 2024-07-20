import {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
  Gender,
  Entry,
  EntryWithoutId,
  Diagnosis,
  Discharge,
  HealthCheckRating,
  SickLeave,
} from "./types";

/**
 * Patient Utilities
 * Contains utility functions related to handling patient data.
 */

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect gender: " + gender);
  }
  return gender;
};

export const toNonSensitivePatient = (
  patient: Patient
): NonSensitivePatientEntry => {
  if (!patient || typeof patient !== "object") {
    throw new Error("Incorrect or missing data");
  }

  const newPatient: NonSensitivePatientEntry = {
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  };

  return newPatient;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "occupation" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "ssn" in object &&
    "entries" in object
  ) {
    const newPatient = {
      name: parseName(object.name),
      occupation: parseOccupation(object.occupation),
      dateOfBirth: parseDate(object.dateOfBirth),
      gender: parseGender(object.gender),
      ssn: parseSsn(object.ssn),
      entries: parseEntries(object.entries),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};

/**
 * Entry Utilities
 * Contains utility functions related to handling Entry data.
 */

const isEntry = (entry: unknown): entry is Entry => {
  if (typeof entry !== "object" || entry === null) {
    throw new Error("Incorrect entry: " + JSON.stringify(entry));
  }
  if (!("type" in entry)) {
    throw new Error("Incorrect entry: " + JSON.stringify(entry));
  }

  if (
    entry.type === "Hospital" ||
    entry.type === "HealthCheck" ||
    entry.type === "OccupationalHealthcare"
  ) {
    return true;
  }
  return false;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error("Invalid entries: not an array");
  }

  const parsedEntries: Entry[] = entries.map((entry, index) => {
    if (!isEntry(entry)) {
      throw new Error(
        `Invalid entry at index ${index}: Entry does not conform to type Entry.`
      );
    }
    return entry;
  });

  return parsedEntries;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description");
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist");
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  console.log("parseDiagnosisCodes:", object);
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !discharge ||
    typeof discharge !== "object" ||
    !("date" in discharge) ||
    !("criteria" in discharge)
  ) {
    throw new Error("Incorrect or missing discharge: " + discharge);
  }

  return {
    date: parseDate(discharge.date),
    criteria: parseDescription(discharge.criteria),
  };
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("Incorrect or missing employerName");
  }
  return employerName;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => v.toString())
    .includes(param.toString());
};

const isNumber = (num: unknown): num is number => {
  return typeof num === "number" || num instanceof Number;
};

const parseHealthCheckRating = (healthCheckRating: unknown) => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect or missing healthCheckRating");
  }
  return healthCheckRating;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    !sickLeave ||
    typeof sickLeave !== "object" ||
    !("startDate" in sickLeave) ||
    !("endDate" in sickLeave)
  ) {
    throw new Error("Incorrect or missing sickLeave: " + sickLeave);
  }

  const { startDate, endDate } = sickLeave as {
    startDate: unknown;
    endDate: unknown;
  };

  if (!isString(startDate) || !isString(endDate)) {
    throw new Error("Incorrect or missing sickLeave dates");
  }

  if (!isDate(startDate) || !isDate(endDate)) {
    throw new Error("Incorrect date format for sickLeave");
  }

  return {
    startDate,
    endDate,
  };
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing date");
  }

  let baseEntry = {} as {
    date: string;
    description: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis["code"]>;
  };

  if ("date" in object && "description" in object && "specialist" in object) {
    baseEntry = {
      date: parseDate(object.date),
      description: parseDescription(object.description),
      specialist: parseSpecialist(object.specialist),
    };

    if ("diagnosisCodes" in object) {
      baseEntry.diagnosisCodes = parseDiagnosisCodes(object);
    }
  }

  if ("type" in object) {
    switch (object.type) {
      case "Hospital":
        if (!("discharge" in object)) {
          throw new Error("Missing discharge for Hospital entry");
        }

        return {
          ...baseEntry,
          type: "Hospital",
          discharge: parseDischarge(object.discharge),
        };

      case "OccupationalHealthcare":
        if (!("employerName" in object)) {
          throw new Error("Missing employerName for Hospital entry");
        }

        const occupationalEntry: EntryWithoutId = {
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName: parseEmployerName(object.employerName),
        };

        if ("sickLeave" in object) {
          occupationalEntry.sickLeave = parseSickLeave(object.sickLeave);
        }

        return occupationalEntry;

      case "HealthCheck":
        if (!("healthCheckRating" in object)) {
          throw new Error("Missing healthCheckRating for Hospital entry");
        }

        return {
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };

      default:
        throw new Error("Invalid entry type");
    }
  } else {
    throw new Error("Missing entry type");
  }
};
