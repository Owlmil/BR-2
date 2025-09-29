# Backend (Node.js + MySQL)

## Quick start

1. Create a MySQL database and import `sample-data.sql`.
2. Set environment variables or edit `db.js` for DB credentials:
   - DB_HOST, DB_USER, DB_PASSWORD, DB_NAME

3. Install dependencies:
   ```
   cd backend
   npm install
   ```

4. Run:
   ```
   npm run dev
   ```
API endpoints:
- GET /words/random
- GET /words
- POST /scores
- GET /scores
