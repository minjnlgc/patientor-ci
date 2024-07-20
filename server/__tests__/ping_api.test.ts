import request from "supertest";
import app from "../src/app";

let server: any;

beforeEach((done) => {
  server = app.listen(done);
});

afterEach((done) => {
  server.close(done);
});

describe("GET /api/ping", () => {
  it("should respond with pong", async () => {
    await request(app)
      .get("/api/ping")
      .expect("Content-Type", /html/)
      .expect(200)
      .expect((res) => {
        if (res.text !== "pong") {
          throw new Error("Response does not contain pong");
        }
      });
  });
});
