import request from 'supertest';
import makeApp from './app';
import { jest } from '@jest/globals';
import * as database from './testdb';
const createUser = jest.fn();
const getUser = jest.fn();

const app = makeApp({
  createUser,
  getUser
});
// const app = makeApp(database);

describe("POST /users", () => {
  beforeEach(() => {
    createUser.mockReset();
  })
  describe("given a username and password", () => {
    test("should save the username and password to the database", async() => {
      const bodyData = [
        {username: "username1", password: "password1"},
        {username: "username2", password: "password2"},
        {username: "username3", password: "password3"},
      ]
      for (const [index, body] of bodyData.entries()) {
        createUser.mockReset();
        const result = await request(app).post("/users").send({
          username: body.username,
          password: body.password
        });
        // if no db
        // console.log(createUser.mock)
        expect(createUser.mock.calls.length).toBe(1); 
        expect(createUser.mock.calls[0][0]).toBe(body.username); 
        expect(createUser.mock.calls[0][1]).toBe(body.password); 

        // if db
        // expect(result).toBeGreaterThan(0);
// 
      }
    });
    
    test("should respond with a json object containing the user id", async() => {
      for(let i = 0; i< 10;i++) {
        createUser.mockReset();
        createUser.mockReturnValueOnce(1)
        // createUser.mockImplementationOnce(() => 1);
        const response = await request(app).post("/users").send({
          username: "username",
          password: "password"
        });
        // if no db
        expect(response.body.userId).toBe(1);
        // if db
        expect(response.body.userId).toBeGreaterThan(0);
      }
    });
    // should save the username and password to the database
    // should respond with a json object containing the userId
    
    // should response with a 200 status code
    test("should response with a 200 status code", async() => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.statusCode).toBe(200); 
    });

    // should specify json in the content type header  
    test("should specify json in the content type header", async() => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"));
    });
    
    test("response has userId", async () => {
      createUser.mockReset();
      createUser.mockImplementationOnce(() => 1);
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      });
      expect(response.body.userId).toBeDefined();
    });

    test("check if user exists", async () => {
      getUser.mockReset();
      const getUserResponse: any = {'userId':1};
      getUser.mockImplementationOnce(() => getUserResponse);
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      });
      console.log(response.body,'***********')
      expect(response.body.userId).toBeDefined();
      expect(response.body.userId).toBe(1);
    });
  });
  
  describe("when user name and password is missing", () => {
    // should respond with status code 400
    test("should respond with status code 400", async () => {
      const bodyData = [
        {username: "username"},
        {password: "password"},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});

describe("swapiGetter api test", () => {
  test("should return success status code", async() => {
    const response = await request(app).get("/api");
    expect(response.statusCode).toBe(200);
  });
});