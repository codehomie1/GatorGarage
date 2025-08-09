### Route Modules and Endpoints

- `routes/homeRouter.js` (mounted at `/`)
  - GET `/` → Renders home with recent posts and categories.

- `routes/aboutRouter.js` (mounted at `/about`)
  - GET `/about` → Renders About page with `teamInfo` and categories.
  - GET `/about/1..6` → Renders specific team member page.

- `routes/authRouter.js` (mounted at `/auth`)
  - POST `/auth/signup` → Sign up.
  - POST `/auth/login` → Log in.
  - POST `/auth/logout` → Log out.

- `routes/searchRouter.js` (mounted at `/search`)
  - GET `/search` → Search items with query params; renders results.

- `routes/submitRouter.js` (mounted at `/`)
  - POST `/submit` → Create a new post (multipart/form-data). Requires login.

Additional endpoints defined in `server.js`
- GET `/dashboard` → Requires login. Renders dashboard with categories, messages, and posts.
- GET `/createpost` → Renders create-post page.
- GET `/members` → Renders member listing using `teamData`.
- GET `/message/:postId` → Returns JSON `{ postDetails }` for a post.
- POST `/send-message` → Requires login. Sends a message.
- DELETE `/delete-post/:id` → Deletes a post by id.
- DELETE `/delete-message/:id` → Deletes a message by id.