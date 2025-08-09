## Middleware Reference

All middleware are CommonJS modules exported from files in `application/middleware/`.

### `authentication.ensureUserIsLoggedIn(req, res, next)`
- Redirects to `/` if `req.session.userID` is missing; otherwise calls `next()`.
- Use to protect routes that require authentication.
- Example:
  ```js
  const { ensureUserIsLoggedIn } = require('../middleware/authentication');
  app.get('/dashboard', ensureUserIsLoggedIn, handler);
  ```

### `getCategories.getCategories(req, res, next)`
- Returns `Promise<Array<{categoryName:string}>>` with category names.
- Intended for navbar usage.

### `getCategories.getCategoriesWithPictures(req, res, next)`
- Returns `Promise<Array<{categoryName:string, categoryPicture:string}>>` for homepage display.

### `posts.getPostInfo(req, res, next)`
- Reads `req.params.postId` and returns a single post joined with seller data, or `null` if not found.

### `posts.getUserPosts(userID, req, res, next)`
- Returns an array of posts for the given `userID`, ordered by `postDate DESC`.

### `posts.createPost(title, course, category, price, location, description, image, thumbnail, userID, req, res, next)`
- Inserts a new post. Handles presence/absence of `course`. Resolves on success, rejects on error.

### `posts.deletePost(postID, req, res, next)`
- Deletes a post by id. Resolves on success, rejects on error.

### `posts.updatePost(title, course, category, price, location, description, postID, req, res, next)`
- Updates a post record. Returns 404 on errors via response.

### `messages.getUserMessages(userID, req, res, next)`
- Returns a user’s received messages with item and sender info, ordered by `sendTime DESC`.

### `messages.getMessageDetails(req, res, next)`
- Expects `req.params.messageId`. On success sets `res.locals.message` and calls `next()`; 404 if not found.

### `messages.messageUser(req, res, next)`
- Expects `req.params.postId`. On success sets `res.locals.postDetails` and calls `next()`.

### `messages.sendMessage(recipientID, senderID, content, postID, req, res, next)`
- Inserts a message. Resolves on success, throws on error.

### `messages.deleteMessage(msgID, req, res, next)`
- Deletes a message by id. Resolves on success, rejects on error.

### `search.searchItems(req, res, next)`
- Reads `query` and `category` from `req.query`. Sets `res.locals.items` and `res.locals.message` then calls `next()`.
- Supports sorting via `sort` query param and returns curated items if there are no results.

### `search.getRecentPosts(req, res, next)`
- Sets `res.locals.recentPosts` to the last 9 authorized, unsold items.

### `dashboard.fetchUserInfo(userID, req, res, next)`
- Returns an array with `{ firstName, lastName, email, bio }` for the given user.