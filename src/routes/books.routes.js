import { Router } from 'express';
import { getBooks, createBook, updateBook, getBookById, deleteBook } from '../controllers/books.controller.js';
import { uploadImage } from '../utils/uploadImage.js';

const router = Router();

router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', uploadImage.single('img_cover'), createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;