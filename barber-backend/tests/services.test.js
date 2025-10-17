import request from "supertest";
import app from "../app.js"; //Express instance
import { prisma } from "../prismaClient.js";

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Service API", () => {
  test("GET /api/services returns 200", async () => {
    const res = await request(app).get("/api/services");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/services rejects without token", async () => {
    const res = await request(app)
      .post("/api/services")
      .send({ name: "TestCut", durationMin: 30, priceCents: 1500 });
    expect(res.statusCode).toBe(401);
  });
});
