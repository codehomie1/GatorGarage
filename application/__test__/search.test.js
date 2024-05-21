const {searchItems, getRecentPosts} = require('../middleware/search.js');
const db = require('../conf/database.js');

// Mocking the database module
jest.mock('../conf/database.js', () => {
    const originalModule = jest.requireActual('../conf/database.js');
    return {
        ...originalModule,
        query: jest.fn(),
        end: jest.fn(),
    };
});

describe('Middleware Tests', () => {
    const res = {
        locals: {},
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
    };
    const next = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('searchItems Middleware', () => {
        const req = {query: {query: 'test'}};

        it('successfully returns search results', async () => {
            const mockData = [
                {itemName: 'test', itemDescription: 'test'},
                {itemName: 'test', itemDescription: 'test'},
            ];
            db.query.mockResolvedValue([mockData]);

            await searchItems(req, res, next);

            expect(db.query).toHaveBeenCalled();
            expect(res.locals.items).toEqual(mockData);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('getRecentPosts Middleware', () => {
        it('successfully fetches the latest three posts and proceeds', async () => {
            // Full set of posts
            const allPostItems = [
                {postId: 1, sellerName: 'JohnDoe', sellerEmail: 'john@example.com'},
                {postId: 2, sellerName: 'JaneDoe', sellerEmail: 'jane@example.com'},
                {postId: 3, sellerName: 'AliceSmith', sellerEmail: 'alice@example.com'},
                {postId: 4, sellerName: 'BobJohnson', sellerEmail: 'bob@example.com'},
                {postId: 5, sellerName: 'CarolWhite', sellerEmail: 'carol@example.com'}
            ];

            // Assuming the latest three posts (by highest postId)
            const latestThreePosts = [
                {postId: 5, sellerName: 'CarolWhite', sellerEmail: 'carol@example.com'},
                {postId: 4, sellerName: 'BobJohnson', sellerEmail: 'bob@example.com'},
                {postId: 3, sellerName: 'AliceSmith', sellerEmail: 'alice@example.com'}
            ];

            // Mocking the db.query to resolve with the latest three post items
            db.query.mockResolvedValue([latestThreePosts]);

            await getRecentPosts(null, res, next);

            expect(db.query).toHaveBeenCalled();  // Verify that db.query was indeed called
            expect(res.locals.recentPosts).toEqual(latestThreePosts);  // Check if only the latest three posts are returned
            expect(next).toHaveBeenCalled();  // Make sure next() is called, indicating successful middleware processing
        });
    });

    afterAll(async () => {
        // Explicitly close the pool if your actual db object contains a pool
        if (db.pool) {
            await db.pool.end();
        } else {
            // Fallback if it's directly from db and not using pool.
            await db.end();
        }
    });
});