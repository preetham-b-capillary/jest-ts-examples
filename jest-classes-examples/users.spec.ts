import { Users } from "./users";
import { Http } from './common/http';

// Importing the dependency to be modified. Since we are telling Jest to replace the real class with the mock one, we’re going to be actually modifying the mock class
jest.mock('./common/http');

describe('Users', () => {
  let instance: Users;
  
  beforeEach(() => {
    instance = new Users();
  });
  
  it('should get all users as an array', async() => {
    expect(instance).toBeInstanceOf(Users);
    const allUsers = await instance.all();
    expect(allUsers).toBeDefined();
    expect(allUsers[0]).toBeDefined();
  });
  
  it('should get receive an error', async() => {
    // Modifying the Http class prototype to change the get() method so that it returns an error instead of an array
    Http.prototype.get = jest.fn().mockImplementationOnce(() => {
      return new Error('Some Manual error emit occured');
    });
    const error: any = await instance.all();
    // expect(error).toBeInstanceOf(Error);
    // Checking that the output from the tested method is now an actual error 
    expect(error.message).toBe('Some Manual error emit occured');
  });
});