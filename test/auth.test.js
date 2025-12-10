const request = require("supertest");
const app = require("../server");

describe("Auth - Login", () => {
    it("deve retornar erro ao tentar logar sem enviar dados", async () => {
        const res = await request(app).post("/api/login").send({});
        expect(res.status).toBe(401);
        expect(res.body.error).toBeDefined();
    });
});
