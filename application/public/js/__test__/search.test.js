const { searchItems } = require('../../../middleware/search.js');
const db = require('../../../conf/database.js');

// Mocking the database module
jest.mock('../../../conf/database.js', () => {
  const originalModule = jest.requireActual('../../../conf/database.js'); 
  return {
    ...originalModule,
    query: jest.fn(), 
    end: jest.fn(), 
  };
});

describe('searchItems Middleware', () => {
  const req = { query: { query: 'test' } };
  const res = {
    locals: {},
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  const next = jest.fn();


  it('successfully returns search results', async () => {
    // returns an array of objects
    const mockData = [
      { itemName: 'test', itemDescription: 'test' },
      { itemName: 'test', itemDescription: 'test' },
    ];
    db.query.mockResolvedValue([mockData]);
    
  });

  // Ensure all connections or the pool are closed after the tests
    afterAll(() => {
        db.pool.end();
    });
});
