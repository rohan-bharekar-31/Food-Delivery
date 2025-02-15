Food-Del: Full-Stack Food Delivery Platform
A robust, full-stack food delivery application built using the MERN stack. This project integrates a secure online payment system via Razorpay, offers JWT-based authentication for users and admins, and features an OTP-based delivery verification system.

Live Demo
Check out the live demo: Food-Del Live

Technologies Used
Frontend: React.js, HTML, CSS
Backend: Node.js, Express.js
Database: MongoDB
Payment Gateway: Razorpay
Authentication: JWT (JSON Web Tokens)
Verification: OTP-based email verification for delivery confirmation
Key Features
MERN Stack Implementation: Engineered using MongoDB, Express.js, React.js, and Node.js for a seamless full-stack experience.
Secure Transactions: Integrated Razorpay payment gateway to ensure secure online payments.
Authentication & Authorization: Implemented JWT-based authentication for secure access for both users and administrators.
Delivery Verification: Developed an OTP-based system that sends an OTP to the user’s email after successful payment to verify delivery.
Admin Panel: Designed and developed a dedicated Admin Panel for efficient management of orders and users.
Project Structure
plaintext
Copy
Edit
Food-Del/
├── client/          # React frontend application
├── server/          # Node.js & Express backend API
├── admin/           # Admin panel for order and user management
├── package.json     # Project metadata and dependencies
└── README.md        # Project documentation
Installation & Setup
Prerequisites
Node.js (v14+ recommended)
MongoDB (either locally installed or via MongoDB Atlas)
npm or yarn
Steps
Clone the Repository:

bash
Copy
Edit
git clone https://github.com/rohan-bharekar-31/Food-Delivery.git
cd Food-Delivery
Backend Setup:

Navigate to the server directory:

bash
Copy
Edit
cd server
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file (refer to a provided .env.example if available) to configure your MongoDB connection string, JWT secret, and Razorpay credentials.

Start the backend server:

bash
Copy
Edit
npm start
Frontend Setup:

Navigate to the client directory:

bash
Copy
Edit
cd ../client
Install dependencies:

bash
Copy
Edit
npm install
Start the React application:

bash
Copy
Edit
npm start
Admin Panel Setup:

Navigate to the admin directory:

bash
Copy
Edit
cd ../admin
Install dependencies:

bash
Copy
Edit
npm install
Start the Admin Panel:

bash
Copy
Edit
npm start
Configuration
Environment Variables: Ensure you have a .env file in the backend folder containing your MongoDB connection URI, Razorpay API keys, and JWT secret.
API Endpoints: Confirm that the API endpoints in both the client and admin panels are configured correctly to point to your backend server.
Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch for your feature or bug fix.
Commit your changes with clear messages.
Open a pull request detailing your changes.
Please adhere to the existing coding conventions and update tests as needed.

License
This project is licensed under the MIT License. See the LICENSE file for more details.

Contact
For any questions, feedback, or support, please reach out at [your-email@example.com].

