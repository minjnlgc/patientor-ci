import patientData from "../../data/patients";
import { v1 as uuidv1 } from "uuid";

import {
  Patient,
  NonSensitivePatientEntry,
  NewPatientEntry,
} from "../types";
import { toNewEntry, toNonSensitivePatient } from "../utils";

let patients: Patient[] = patientData;

const getAllPatients = (): NonSensitivePatientEntry[] => {
  console.log(patients);
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): NonSensitivePatientEntry => {
  const newPatient = {
    ...entry,
    id: uuidv1(),
  };

  patients.push(newPatient);

  const newNonSensitivePatient = toNonSensitivePatient(newPatient);
  return newNonSensitivePatient;
};

const getPatientById = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);

  if (typeof patient !== "object") {
    throw new Error(`Cannot find patient with id: ${id}`);
  }
  return patient;
};

const createPatientEntry = (id: string, entryData: unknown): Patient => {
  const patient = getPatientById(id);
  try {
    const newEntryData = {
      ...toNewEntry(entryData),
      id: uuidv1(),
    };
    patient.entries = patient.entries.concat(newEntryData);
    patients = patients.map((p) => (p.id === patient.id ? patient : p));
    return patient;

  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update patient entry: ${error.message}`);
    } else {
      throw new Error(`Unknown error: ${error}`);
    }
  }
};

export default {
  getAllPatients,
  addPatient,
  getPatientById,
  createPatientEntry,
};
