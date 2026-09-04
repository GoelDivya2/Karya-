# Karya

Karya is a collaborative workspace that allows users to create and join rooms, upload PDF documents, and ask questions about the uploaded content using a Retrieval-Augmented Generation (RAG) pipeline.

The project combines **MERN backend development, RAG, vector search, LLMs, and real-time communication** to create a collaborative document-based question-answering platform.

## 🚀 Features

* 🔐 User authentication using JWT
* 👥 Create and join collaborative rooms
* 📄 Upload PDF documents
* 🗑️ Delete uploaded documents
* ✂️ Extract and split PDF text into chunks
* 🔢 Generate embeddings for document chunks
* 🧠 Store embeddings in Pinecone
* 💬 Ask questions about uploaded documents
* 🤖 Generate answers using Google Gemini
* ⚡ Real-time communication using Socket.IO
* 💾 Store users, rooms, documents, and questions in MongoDB

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Multer
* Socket.IO

### AI / RAG

* LangChain.js
* Google Gemini
* Gemini Embeddings
* Pinecone
* RAG (Retrieval-Augmented Generation)

## 🧠 RAG Pipeline

The document-question answering system follows this flow:

```text
PDF Upload
    ↓
PDF Text Extraction
    ↓
Text Chunking
    ↓
Generate Embeddings
    ↓
Store Vectors in Pinecone
    ↓
User Asks Question
    ↓
Retrieve Relevant Chunks
    ↓
Send Context + Question to Gemini
    ↓
Generate Answer
```

## 📁 Project Structure

```text
Karya/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── pinecone.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── documentController.js
│   │   ├── questionController.js
│   │   └── roomController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── models/
│   │   ├── Documents.js
│   │   ├── Question.js
│   │   ├── Room.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── documentRoutes.js
│   │   ├── questionRoutes.js
│   │   └── roomRoutes.js
│   │
│   ├── services/
│   │   ├── chunkService.js
│   │   ├── embeddingService.js
│   │   ├── llmService.js
│   │   ├── pdfProcessor.js
│   │   └── pineconeService.js
│   │
│   ├── sockets/
│   │   ├── socket.js
│   │   └── socketHandler.js
│   │
│   ├── app.js
│   ├── server.js
│   ├── testSocket.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/GoelDivya2/Karya-.git
cd Karya
```

### 2. Navigate to the backend

```bash
cd backend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `backend` directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

PINECONE_API_KEY=your_pinecone_api_key

GOOGLE_API_KEY=your_google_api_key
```

Replace the values with your own credentials.

### 5. Start the server

For development:

```bash
npm run dev
```

Or:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

## 🔒 Environment Variables

API keys and database credentials are kept in `.env` and are **not committed to the repository**.

Required environment variables include:

* `MONGO_URI`
* `JWT_SECRET`
* `PINECONE_API_KEY`
* `GOOGLE_API_KEY`
* `PORT`

## 🔮 Future Improvements

* Complete frontend interface
* Improve real-time collaborative features
* Add chat history and better question management
* Add document-level access control
* Improve RAG retrieval and answer quality
* Deploy the complete application
* Add typing indicators and real-time room updates

## 👨‍💻 Author

**Divya Goel**

B.Tech Computer Science & Engineering

---

⭐ If you find this project interesting, feel free to explore the repository.
