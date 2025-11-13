import db from "../models/index.js";

const { Book } = db;

export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({
      success: true,
      message: "Les livres ont été récupérés avec succès",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findOne({ where: { id: req.params.id } });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Le livre n'a pas été trouvé",
      });
    }
    res.status(200).json({
      success: true,
      message: "Le livre a été récupéré avec succès",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, available } = req.body;
    const book = await Book.create({ title, author, available });
    res.status(201).json({
      success: true,
      message: "Le livre a été créé avec succès",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Le livre n'a pas été trouvé",
      });
    }
    await book.update(req.body);
    res.status(200).json({
      success: true,
      message: "Le livre a été mis à jour avec succès",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOne({ where: { id: req.params.id } });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Le livre n'a pas été trouvé",
      });
    }   
    await book.destroy();
    res.status(200).json({
      success: true,
      message: "Le livre a été supprimé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}