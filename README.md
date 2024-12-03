# **CodeTogether**  
A real-time code collaboration platform designed for developers to collaborate seamlessly in a shared coding environment. Built with the MERN stack (MongoDB, Express.js, React, Node.js), WebSocket, and CodeMirror, CodeTogether enables live multi-user editing, secure room-based sessions, and an intuitive coding interface.  

---

## **Features**  
- **Real-Time Collaboration**: Collaborate with multiple users simultaneously using WebSocket for live synchronization.  
- **CodeMirror Integration**: Enjoy a rich coding experience with syntax highlighting and customizable themes.  
- **Secure Rooms**: Generate unique room IDs to ensure private and secure collaboration.  
- **Responsive Design**: Optimized for both desktop and mobile devices.  
- **Scalable Backend**: Efficient API and WebSocket handling for high-performance collaboration.  

---

## **Tech Stack**  
### **Frontend**  
- React.js  
- Bootstrap (UI Framework)  
- CodeMirror (Code Editor)  

### **Backend**  
- Node.js  
- Express.js  
- WebSocket  

### **Database**  
- MongoDB  

---

## **Setup and Installation**  
Follow these steps to set up the project locally:  

### **Prerequisites**  
- **Node.js** (v14 or higher)  
- **MongoDB**  

### **Steps**  
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/CodeTogether.git
   cd CodeTogether
   
### Install dependencies for the client and server:

cd client
npm install
cd ../server
npm install

### Configure environment variables:

Create a .env file in the server directory.
Add the following variables:
MONGO_URI=<your-mongodb-connection-string>
PORT=5000

### Run the application:
### Start the client
cd client
npm start

### Start the server
cd ../server
npm start

### Access the app at http://localhost:3000.

## How It Works
### Create or Join a Room: Enter a unique room ID to start collaborating.
### Live Coding: Share a collaborative editor space with other participants.
### Instant Updates: Changes are synchronized across all connected users in real time.
