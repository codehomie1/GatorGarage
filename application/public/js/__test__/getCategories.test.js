const {getCategories} = require('../../../middleware/getCategories.js');
const {getCategoriesWithPictures} = require('../../../middleware/getCategories.js');

const db = require('../../../conf/database.js');

describe('Get Category Names Middleware Test', () => {
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
        expect(categoryNames).toEqual([
          { categoryName: 'Electronics' },
          { categoryName: 'Clothing' },
          { categoryName: 'Books' }
        ]);
    });
    });

describe('Get Categories Name and Pictures Middleware Test', () => {
    let mockDataCategories; // Define mockDataCategories variable

beforeAll(async () => {
    const query = `SELECT categoryName, categoryPicture FROM csc648_team6DB.categories`;
    mockDataCategories = [
        { categoryName: 'Electronics', categoryPicture: 'electronics.jpg' },
        { categoryName: 'Clothing', categoryPicture: 'clothing.jpg' },
        { categoryName: 'Books', categoryPicture: 'books.jpg' },
    ];
    db.query = jest.fn().mockResolvedValue([mockDataCategories]);
});


    afterAll(async () => {
        db.end();
    });

    it('should return an array of category names and pictures', async () => {
        const categoriesWithPictures = await getCategoriesWithPictures();
        expect(categoriesWithPictures).toEqual(mockDataCategories);
    });
});
