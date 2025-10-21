import request from "supertest";
import app from "../app.js";
import { prisma } from "../prismaClient.js";

beforeAll(async () => {
    await prisma.$connect();
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe("Appointments API", () => {
    //GET /api/appointments, rejects requests without a token
    test("GET /api/appointments requires auth", async () => {
        const res = await request(app).get("/api/appointments");
        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty("error");
    });

    //POST /api/appointments, rejects unauthenticated bookings
    test("POST /api/appointments rejects without token", async () => {
        const res = await request(app)
        .post("/api/appointments")
        .send({
            serviceId: 1,
            startAt: new Date().toISOString(),
        });
        expect(res.statusCode).toBe(401);
    });
});