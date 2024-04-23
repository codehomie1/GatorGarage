require('dotenv').config();
const mysql = require('mysql2/promise');

// Database configuration using environment variables
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// Function to retrieve post counts per categoryId
async function checkCategoryItemCounts(connection) {
  const [counts] = await connection.query(`
    SELECT categoryId, COUNT(*) AS itemCount
    FROM itemPost
    GROUP BY categoryId
    HAVING itemCount >= 10
  `);
  return counts;
}

// Jest test cases
describe('Category Post Counts Test', () => {
  let connection;

  beforeAll(async () => {
    connection = await mysql.createConnection(dbConfig);
  });

  afterAll(async () => {
    await connection.end();
  });

  test('Each category should have at least 10 item posts', async () => {
    const categoryCounts = await checkCategoryItemCounts(connection);
    const [totalCategoriesResult] = await connection.query(`SELECT COUNT(DISTINCT categoryId) AS total FROM itemPost`);
    const totalCategories = totalCategoriesResult[0].total;

    expect(categoryCounts.length).toBe(totalCategories);
    categoryCounts.forEach(count => {
      expect(count.itemCount).toBeGreaterThanOrEqual(10);
    });
  });
});
