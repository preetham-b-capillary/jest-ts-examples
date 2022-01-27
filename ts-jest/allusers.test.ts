import { Request, Response } from 'express';
import GetAllUsersRequest from './allusers'; 


describe('Get all user request', () => {

    test("return with all users", () => {
        const request = {};
        let responseObject = {};
        const response: Partial<Response> = {
            json: jest.fn().mockImplementationOnce((result) => {
                responseObject = result;
            })
        };



        const expectedUsers = [{user: 'q', age: 20}, {name: 'p', age: '24'}];

        GetAllUsersRequest(request as Request, response as Response);
        console.log(responseObject)
        expect(responseObject).toEqual(expectedUsers);
    });
});