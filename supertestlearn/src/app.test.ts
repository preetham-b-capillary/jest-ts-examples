import request from "supertest";
import app from "./app";

describe("POST /users", () => {
    describe("given a username and password", () => {
        // should save the username and password to the database
        // should respond with a json object containing the userId


        // should response with a 200 status code
        test("should response with a 200 status code", async() => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "asdfghjkl1"
            })
            expect(response.statusCode).toBe(200); 
        });
        // should specify json in the content type header  
        test("should specify json in the content type header", async() => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "sdfghjkl1"
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
        });

        test("response has userId", async () => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "sdfghjkl1"
            });
            expect(response.body.userId).toBeDefined();
        });

        test("when password is small letters only", async () => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "sdfghjkla"
            });
            expect(response.statusCode).toBe(400);
        });

        test("when password is small numbers only", async () => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "12345678"
            });
            expect(response.statusCode).toBe(400);
        });

        test("when password length is too low", async () => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "a1"
            });
            expect(response.statusCode).toBe(400);
        });

        test("when password length is too low", async () => {
            const response = await request(app).post("/users").send({
                username: "username",
                password: "asdfghjkl1"
            });
            expect(response.statusCode).toBe(200);
        });
    });

    describe("when user name and password is missing", () => {
        // should respond with status code 400

        test("should respond with status code 400", async () => {
            const bodyData = [
                {username: "username"},
                {password: "sdfghjkl1"},
                {}
            ]
            for (const body of bodyData) {
                const response = await request(app).post("/users").send(body);
                expect(response.statusCode).toBe(400);
            }
            
        }); 
    });
});