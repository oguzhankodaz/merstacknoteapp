# 📝 MERN Notes App

This is a full-stack **MERN** (MongoDB, Express.js, React, Node.js) application that allows users to create, view, and manage their personal notes.

---

## 📁 Project Structure

```
/MERN
├── client   # React frontend
└── server   # Express backend + MongoDB
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/oguzhankodaz/merstacknoteapp.git
cd merstacknoteapp
```

### Install Dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### Setup Environment Variables

Create a `.env` file inside the `server/` folder and add:

```
MONGO_URI=your_mongodb_connection_string
PORT=5001
```

### Run the Application

```bash
# Start the server
cd server
npm run dev
```

Open a new terminal:

```bash
# Start the client
cd client
npm run dev
```

---

## 🛠 Tech Stack

- React (Vite)
- Express.js
- MongoDB (Mongoose)
- Node.js
- Tailwind CSS
- ShadCN UI
- Axios
- React Router
