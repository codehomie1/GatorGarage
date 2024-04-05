const { getCategories } = require('../../../middleware/getCategories.js'); 

const db = require('../../../conf/database.js'); 

describe('Get Categories Middleware Test', () => {
    beforeAll(async () => {
        const query = `SELECT categoryName FROM csc648_team6DB.categories`;
        const mockData = [
        { categoryName: 'Electronics' },
        { categoryName: 'Clothing' },
        { categoryName: 'Books' },
        ];
        db.query = jest.fn().mockResolvedValue([mockData]);
    });

    // test will stop open handle 
    afterAll(async () => {
        db.end();
    });
     
    
    it('should return an array of category names', async () => {
        const categoryNames = await getCategories();
        expect(categoryNames).toEqual(['Electronics', 'Clothing', 'Books']);
    });
    });