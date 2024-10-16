Steps to Run the Project:

git clone https://github.com/tanmaydixit27/GPU-marketplace

cd GPU-marketplace

cd backend

npm install

cd ../frontend

npm install

Create a .env file in the backend folder (or wherever your backend is) and add any environment variables required for the project (e.g., MongoDB URI, JWT secret, etc.).

cd backend

npm run dev

cd frontend

npm start

Once both servers are running, open your browser and visit http://localhost:3000 to view the application.

Important Dependencies Backend (Node.js + Express) Core Dependencies:

express: Web framework for building the backend server. mongoose: To interact with MongoDB for data storage. jsonwebtoken: For handling JWT-based authentication. bcryptjs: For hashing passwords and securing user data. dotenv: For loading environment variables from .env. cors: To enable Cross-Origin Resource Sharing (necessary for connecting frontend and backend). cookie-parser: To handle cookies (optional, if using sessions). Dev Dependencies:

nodemon: For automatic server restarts during development. Other Utilities:

express-validator: For validating incoming request data. multer: For handling file uploads (if needed for images). morgan: HTTP request logging middleware (useful for debugging). Frontend (React) Core Dependencies:

react: Library for building user interfaces. react-dom: For rendering React components. axios: For making API calls to the backend. react-router-dom: For routing and navigation within the app. formik or react-hook-form: For handling form state and validation. State Management:

Context API or redux (if needed for more complex state management). Other Utilities:

jwt-decode: To decode JWT tokens in the frontend. react-toastify: For displaying notifications (e.g., for successful bids or errors). Optional (if needed): Session Management: express-session: For session-based authentication (if JWT is not used). API Routes User Authentication:

POST /api/auth/register: Register a new user. POST /api/auth/login: Login user and generate JWT. GPU Listings:

POST /api/listings: Create a new listing. GET /api/listings: Get all listings. GET /api/listings/:id: Get a single listing by ID. PUT /api/listings/:id: Update a listing. DELETE /api/listings/:id: Delete a listing. Bidding:

POST /api/listings/:id/bid: Place a bid on a listing. GET /api/listings/:id/bids: Get bids for a specific listing. This structure and list of dependencies should cover the MVP's core functionalities while allowing for future enhancements.
