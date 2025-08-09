## REST API

Base URL: `http://localhost:3000`

Authentication & Sessions
- Session cookie is set after successful login or signup. Some endpoints require a valid session.
- Content types supported: `application/json` and `application/x-www-form-urlencoded` unless otherwise stated.

### Auth

- POST `/auth/signup`
  - Body: `{ firstName, lastName, email, password }`
  - 302 → Redirect to `/dashboard` on success
  - 400 → Missing fields or email in use; 500 on DB error
  - Example:
    ```bash
    curl -i -X POST http://localhost:3000/auth/signup \
      -H 'Content-Type: application/json' \
      -d '{"firstName":"Ada","lastName":"Lovelace","email":"ada@example.com","password":"Secret123!"}'
    ```

- POST `/auth/login`
  - Body: `{ email, password }`
  - 302 → Redirect to `/dashboard` on success; sets session
  - 401 → Invalid credentials; 500 on DB error
  - Example:
    ```bash
    curl -i -X POST http://localhost:3000/auth/login \
      -H 'Content-Type: application/json' \
      -d '{"email":"ada@example.com","password":"Secret123!"}'
    ```

- POST `/auth/logout`
  - Ends the session; clears cookie if present
  - 302 → Redirect to `/`
  - Example:
    ```bash
    curl -i -X POST http://localhost:3000/auth/logout
    ```

### Search

- GET `/search`
  - Query params: `query` (string), `category` (string or "all"), `sort` ("default"|"price_asc"|"price_desc"|"alpha_asc"|"alpha_desc"), `page` (int, default 1), `limit` (int, default 9)
  - Renders HTML page `search.ejs` with paginated, sorted results
  - Example:
    ```bash
    curl 'http://localhost:3000/search?query=laptop&category=Electronics&sort=price_desc&page=1&limit=9'
    ```

### Posts

- POST `/submit` (multipart/form-data, requires session)
  - Fields: `title`, `course` (optional), `category` (categoryId), `price`, `location`, `description`, `image` (file)
  - Behavior: stores image under `public/img/items`, generates 200x200 thumbnail under `public/img/thumbnails`, inserts post in DB
  - 302 → Redirect to `/dashboard` on success; 400 on validation errors; 500 on failures
  - Example:
    ```bash
    curl -i -X POST http://localhost:3000/submit \
      -H 'Cookie: connect.sid=YOUR_SESSION_COOKIE' \
      -F 'title=Textbook' \
      -F 'course=CSC648' \
      -F 'category=3' \
      -F 'price=25.00' \
      -F 'location=Campus' \
      -F 'description=Gently used' \
      -F 'image=@/path/to/photo.jpg'
    ```

- DELETE `/delete-post/:id`
  - Deletes the post by id; returns text
  - 200 on success, 500 on failure
  - Example:
    ```bash
    curl -i -X DELETE http://localhost:3000/delete-post/123
    ```

### Messaging

- GET `/message/:postId`
  - Returns JSON with post details for composing a message
  - Response: `{ postDetails: { ... } }`
  - Example:
    ```bash
    curl -s http://localhost:3000/message/42 | jq .
    ```

- POST `/send-message` (requires session)
  - Body: `{ recipientId, content, postId }`
  - 200 → "Message sent successfully"; 500 on error
  - Example:
    ```bash
    curl -i -X POST http://localhost:3000/send-message \
      -H 'Content-Type: application/json' \
      -H 'Cookie: connect.sid=YOUR_SESSION_COOKIE' \
      -d '{"recipientId":7,"content":"Is this still available?","postId":42}'
    ```

- DELETE `/delete-message/:id`
  - Deletes a message by id; returns text
  - 200 on success, 500 on failure
  - Example:
    ```bash
    curl -i -X DELETE http://localhost:3000/delete-message/987
    ```

### Pages (HTML)
- GET `/` → Home
- GET `/dashboard` (requires session)
- GET `/createpost`
- GET `/about`, `/about/1..6`
- GET `/members`