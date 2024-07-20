import request from "supertest";
import app from "../src/app";
import diagnosesData from "../data/diagnoses";

const diagnosesURI: string = "/api/diagnoses";
let server: any;

beforeEach((done) => {
  server = app.listen(done);
});

afterEach((done) => {
  server.close(done);
});

describe(`GET ${diagnosesURI}: getDiagnoses`, () => {
  it("should respond with json and 200", async () => {
    await request(app)
      .get(diagnosesURI)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("should respond with same data", async () => {
    const response = await request(app).get(diagnosesURI);
    expect(response.body).toEqual(diagnosesData);
  });
});
