import { Schema, model } from 'mongoose';
import User from './userModels.js';

const cardSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Card = model('Card', cardSchema);
export default Card;
