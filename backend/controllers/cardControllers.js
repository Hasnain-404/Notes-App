import Card from '../models/cardModel.js';
import User from '../models/userModels.js';

const createCard = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.userId;

    try {
        if (!title || !description) {
            return res.json({ message: 'Please provide all fields' });
        }

        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found in database' });
        }

        const newCard = new Card({ title, description, user: user._id });
        await newCard.save();

        return res.status(201).json({ message: 'Card created successfully' });
    } catch (error) {
        return res.json({ message: `Error in : ${error.message}` });
    }
};

const getCards = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            return res.json({ message: 'User not found in database' });
        }

        const cards = await Card.find({ user: user._id });

        return res.status(200).json(cards);
    } catch (error) {
        return res.json({ message: `Error in : ${error.message}` });
    }
}

const updateCard = async (req, res) => {
    const { title, description } = req.body;
    const cardId = req.params.id;

    try {
        if (!title || !description) {
            return res.json({ message: 'Please provide all fields' });
        }

        const updatedCard = await Card.findByIdAndUpdate(cardId, { title, description }, { new: true });

        if (!updatedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }

        return res.status(200).json(updatedCard);
    } catch (error) {
        return res.json({ message: `Error in : ${error.message}` });
    }
}

const deleteCard = async (req, res) => {
    const cardId = req.params.id;

    try {
        const deletedCard = await Card.findByIdAndDelete(cardId);

        if (!deletedCard) {
            return res.status(404).json({ message: 'Card not found' });
        }

        return res.status(200).json({ message: 'Card deleted successfully' });
    } catch (error) {
        return res.json({ message: `Error in : ${error.message}` });
    }
}

export { createCard, getCards, updateCard, deleteCard };
