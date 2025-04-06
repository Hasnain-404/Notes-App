import express from 'express';
import { userAuth } from '../middlewares/userMiddleware.js';
import { createCard, getCards, updateCard, deleteCard } from '../controllers/cardControllers.js';

const router = express.Router();

router.post('/create', userAuth, createCard);
router.get('/get', userAuth, getCards);
router.put('/update/:id', userAuth, updateCard);
router.delete('/delete/:id', userAuth, deleteCard);

export default router;
