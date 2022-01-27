import axios from 'axios';
import swapiGetter from './api';
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('swapiGetter', () => {
  test('should return a name', async() => {
    mockedAxios.get.mockResolvedValue({data: {name: 'Luke Skywalker'}})
    const result = await swapiGetter(1);
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result).toBe('Luke Skywalker');
  });

  test('should throw an error', async() => {
    mockedAxios.get.mockRejectedValue(null);
    const result = await swapiGetter(1);
    expect(mockedAxios.get).toHaveBeenCalled();
    expect(result).toBe(undefined);
  });
}); 