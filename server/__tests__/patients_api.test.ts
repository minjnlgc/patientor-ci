import request from "supertest";
import app from "../src/app";
import patientEntries from "../data/patients";

const patientURI: string = "/api/patients";
let server: any;

beforeEach((done) => {
  server = app.listen(done);
});

afterEach((done) => {
  server.close(done);
});

describe(`GET ${patientURI}: getAllPatients`, () => {
  it("should respond with json and 200", async () => {
    await request(app)
      .get(patientURI)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("should have the same length with the patient entries", async () => {
    const response = await request(app).get(patientURI);
    expect(response.body.length).toEqual(patientEntries.length);
  });

  it("should have the unique identifier id for patients", async () => {
    const response = await request(app).get(patientURI);
    response.body.forEach((patient: any) => {
      expect(patient).toHaveProperty("id");
    });
  });
});

describe(`POST ${patientURI}: addPatient`, () => {
  const new_patient = {
    name: "Sho Hirano",
    occupation: "idol",
    dateOfBirth: "1997-01-29",
    gender: "male",
    ssn: "19970129",
    entries: [],
  };

  it("should respond with json and 200, and have corresponding properties", async () => {
    const response = await request(app)
      .post(patientURI)
      .send(new_patient)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name", new_patient.name);
    expect(response.body).toHaveProperty(
      "dateOfBirth",
      new_patient.dateOfBirth
    );
    expect(response.body).toHaveProperty("gender", new_patient.gender);
    expect(response.body).toHaveProperty("occupation", new_patient.occupation);
  });
});

describe(`GET ${patientURI}: getPatientById`, () => {
  const patient_object = {
    id: "d27736ec-f723-11e9-8f0b-362b9e155667",
    name: "Hans Gruber",
    dateOfBirth: "1970-04-25",
    gender: "other",
    occupation: "Technician",
  };

  it("should respond with json and 200", async () => {
    await request(app)
      .get(`${patientURI}/${patient_object.id}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("should respond with json and 200", async () => {
    const response = await request(app).get(
      `${patientURI}/${patient_object.id}`
    );

    expect(response.body).toHaveProperty("id", patient_object.id);
    expect(response.body).toHaveProperty("name", patient_object.name);
    expect(response.body).toHaveProperty(
      "dateOfBirth",
      patient_object.dateOfBirth
    );
    expect(response.body).toHaveProperty("gender", patient_object.gender);
    expect(response.body).toHaveProperty(
      "occupation",
      patient_object.occupation
    );
  });
});
