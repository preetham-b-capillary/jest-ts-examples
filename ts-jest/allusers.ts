import { Request, Response } from "express";

const GetAllUsers = (request: Request, response: Response) => {

    const expectedUsers = [{user: 'q', age: 20}, {name: 'p', age: '24'}];
    response.json(expectedUsers);
};

export default GetAllUsers;