## Controllers Reference

### `controllers/userController.js`

- `signUp(req, res)`
  - Input: `firstName, lastName, email, password` (body)
  - Validates input, ensures email uniqueness via `userModel.findUserByEmail`, creates user via `userModel.createUser`, initializes session, redirects to `/dashboard`.

- `login(req, res)`
  - Input: `email, password` (body)
  - Validates credentials using `bcrypt.compare` and `userModel.findUserByEmail`, sets session, redirects to `/dashboard`, or returns 401 on failure.

- `logout(req, res)`
  - Destroys the session and redirects to `/`.

Example usage in a router:
```js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
```

### `controllers/fileUploadController.js`

- `uploadImage` (Multer instance)
  - Use as `uploadImage.single('image')` in a route to accept an uploaded file.
  - Side effects: populates `req.body.imagePathForDb` and `req.body.thumbnailPathForDb` with paths to store in DB.

- `generateAndUploadThumbnail(sourceImagePath, targetImagePath)`
  - Creates a 200x200 thumbnail using Sharp.

Example usage in a route:
```js
const { uploadImage, generateAndUploadThumbnail } = require('../controllers/fileUploadController');
const { ensureUserIsLoggedIn } = require('../middleware/authentication');

router.post('/submit', uploadImage.single('image'), ensureUserIsLoggedIn, async (req, res) => {
  // use req.body.imagePathForDb and req.body.thumbnailPathForDb
});
```