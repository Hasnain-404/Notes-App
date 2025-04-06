import express from 'express';
import { userAuth } from '../middlewares/userMiddleware.js';
import { createCard, getCards, updateCard, deleteCard } from '../controllers/cardControllers.js';

const router = express.Router();

router.post('/create', createCard);
router.get('/get', getCards);
router.put('/update/:id', updateCard);
router.delete('/delete/:id', deleteCard);

export default router;
