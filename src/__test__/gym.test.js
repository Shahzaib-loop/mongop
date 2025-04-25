const { Gym } = require('../models');
const { getAllGyms } = require('../services/gym/gym');

describe('GymService - getAllGyms', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('returns gyms from database', async () => {
    const mockGyms = [{ id: 1, name: 'Alpha Gym' }];
    Gym.findAll.mockResolvedValue(mockGyms);

    const result = await getAllGyms();

    expect(Gym.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockGyms);
  });
});
