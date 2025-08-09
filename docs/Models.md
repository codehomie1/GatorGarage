## Models Reference

### `models/userModel.js`

- `createUser(firstName, lastName, email, password) -> Promise<number>`
  - Hashes `password` with bcrypt, inserts a new user, and returns the new `userID`.

- `findUserByEmail(email) -> Promise<object|null>`
  - Returns the user row if found, otherwise `null`.

### Database Connection
- `conf/database.js` creates a mysql2 connection pool using env vars: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.