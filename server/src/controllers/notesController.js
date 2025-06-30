/** @format */

import Note from "../models/Notes.js";
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Azalan sıra (yeni → eski)
    res.status(200).json(notes);
  } catch (error) {
    console.error("error in getAllNotes controller");

    res.status(500).json({ message: "internal server error" });
  }
};
export const createNote = async (req, res) => {
  try {
    // 1. İstek (request) gövdesinden title ve content alanlarını alıyoruz
    const { title, content } = req.body;

    // 2. Bu alanları kullanarak yeni bir Note örneği oluşturuyoruz (henüz veritabanına kaydedilmedi)
    const note = new Note({ title, content });

    // 3. Veritabanına kaydediyoruz (MongoDB'ye INSERT işlemi yapar)
    await note.save();

    // 4. Başarılı yanıt dönüyoruz. Status 201 (Created) ve açıklayıcı bir mesaj gönderiyoruz
    res.status(201).json({ message: "note Created Succesfuly", note: note });
  } catch (error) {
    // 5. Hata olursa burası çalışır, örneğin title boşsa, Mongo validation hatası olabilir
    console.error("Error in createNote controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateNote = async (req, res) => {
  try {
    // 1. İstek gövdesinden yeni başlık ve içerik verisini alıyoruz
    const { title, content } = req.body;

    // 2. URL parametresinden id'yi alıp bu id'ye sahip notu güncelliyoruz
    // findByIdAndUpdate → MongoDB'de direkt ID ile güncelleme yapar
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote)
      return res.status(404).json({ message: "note not found" });

    // 3. Başarılı güncelleme yanıtı
    res.status(200).json(updatedNote);
  } catch (error) {
    // 4. Hata durumunda logla ve kullanıcıya mesaj dön
    console.error("Error in updated controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote)
      return res.status(404).json({ message: "note not found" });

    res.status(200).json({ message: "delete succesful", deletedNote });
  } catch (error) {
    console.error("Error in delete controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "note not found" });
    return res.json(note);
  } catch (error) {
    console.error("error in getNoteById controller");

    res.status(500).json({ message: "internal server error" });
  }
};
