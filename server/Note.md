
# Başlangıç

npm init -y  ile bşlat
daha sonra  npm install express --save

# 2. adım

server.js dosyası oluştur
https://expressjs.com/ dan dökümanlara bak

# -----------------------------------------------

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

# -----------------------------------------------


node server.js ile başlat

# Serveri otomatik yenilemek için 

1. nodemon Kurulumu npm install --save-dev nodemon

2. package.json içinde script tanımla

"scripts": {
  "dev": "nodemon index.js"
}
3. Uygulamayı başlat npm run dev


# routes klasörü oluştur
ve isteidğin routes işini oluştur

// routes/notesRoutes.js
# -----------------------------------------------
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("you just fetched");
});

router.post("/", (req, res) => {
  res.status(201).json({ message: "post Created" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: "post updated" });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "post deleted" });
});

export default router;

# -----------------------------------------------


# CONTROLLERS KLASÖRÜ OLUŞTUR

notesController.js
# -----------------------------------------------
export const getAllNotes = (req, res) => {
    res.status(200).send("you just fetched");
  }
  export const createNote = (req, res) => {
    res.status(201).json({ message: "post Created" });
  }
  export const updateNote = (req, res) => {
    res.status(200).json({ message: "post updated" });
  }
  export const deleteNote = (req, res) => {
    res.status(200).json({ message: "post deleted" });
  }
# -----------------------------------------------

controllers routes ve server.js i src kasörünün içine aldım
daha sonra gidip packagejsonu güncellemem gerek

# ------------------Sadece Buralar-----------------------------

  "main": "src/server.js",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  },
# -----------------------------------------------

# MONGO DB DATABASE OLUŞTRUDUM

npm i mongoose

src içine config dosyası oluştur onun içinede db.js

# -----------------------------------------------

/** @format */

import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://oguzhankodaz:BIQfFcBnBxA2Vzs5@cluster0.f2cdpvx.mongodb.net/notes_db?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDb connected succesfully");
  } catch (error) {
    console.log("error connecting to mongodb");
    process.exit(1) //    Node.js uygulamasını manuel olarak kapatır.
  }
};
# -----------------------------------------------
...mongodb.net/notes_db?... bu linkteki soru işaretinden önceki kısım veritabanı adı ezberle.
sonra bunu gidip  server.js içinde kullan

const app = express();
const port = 5001;
connectDB(); // veritabanı bağlantı işini hallediyoruz

npm i dotenv yap ve env içine koy MONGO_URI olarak şifreyi

server.js içine bunları ekle 

import dotenv from 'dotenv'
dotenv.config()

# MODELS DOSYASI OLUŞTUR

Note.js d osyası oluştrudum içine 

-----------------------------------------------
/** @format */

import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true } // created at and updated at
);

const Note = mongoose.model("Note", notesSchema);

export default Note;
-----------------------------------------------

# MİDLEWARE DOSYASI OLUŞTURUP İÇİNE BİR RATE LİMİT EKLEDİM



import { rateLimit } from "express-rate-limit";

// 1. GLOBAL RATE LIMIT (Uygulamanın en başına koy)
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 dakika
    limit: 100,               // 100 istek
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
      status: 429,
      message: "Too many requests, please try again later.", // ← Bu kısım!
    },
  });

  bunu kullanmak için : server içinkde route kullan
   app.use("/api/notes", limiter, notesRoutes);


  # SERVER BAŞLATMAYI ASYNC HALE GETİRDİM

  const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Bağlantı olmazsa uygulamayı kapat
  }
};
startServer();












