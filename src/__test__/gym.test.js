const db = require('../models')
const { getAllGyms } = require('../services/gym/gym')
const Gym = db.gyms

jest.mock('../models'); // Mock all models

describe('getAllGyms', () => {
  test('returns gyms from database', async () => {
    const mockGyms = [{ id: 1, name: 'Alpha Gym' }];

    // Mock the findAll method of the Gym model
    Gym.findAll.mockResolvedValue(mockGyms); // `findAll` will return the mock data

    // Call the function to test
    const result = await getAllGyms();

    // Assert that the result is correct
    expect(result).toEqual(mockGyms);
  });
});
