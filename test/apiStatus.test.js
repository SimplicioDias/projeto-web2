const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");

describe("Status da API", () => {
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it("deve responder na rota raiz /", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("API está funcionando!");
    });
});
