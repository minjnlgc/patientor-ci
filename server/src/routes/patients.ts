import express from "express";
import patientService from "../services/patientService";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getAllPatients());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newNonSensitivePatient = patientService.addPatient(newPatientEntry);
    res.json(newNonSensitivePatient);
  } catch (error: unknown) {
    console.log("error");
  }
});

router.get("/:id", (req, res) => {
  try {
    const patient = patientService.getPatientById(req.params.id);
    res.json(patient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
    } else {
      console.error("Unknown error:", error);
      res.status(500).json({ error: "An unknown error occured." });
    }
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const patient = patientService.createPatientEntry(req.params.id, req.body);
    console.log(req.body);
    res.json(patient);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(400).json({ error: error.message });
    } else {
      console.error("Unknown error:", error);
      res.status(500).json({ error: "An unknown error occured." });
    }
  }
});

export default router;
