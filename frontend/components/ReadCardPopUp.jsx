import React from 'react';
import dayjs from 'dayjs';

const ReadCardPopUp = ({ card, onClose }) => {
    if (!card) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade">
            <div className="bg-white rounded-xl w-[90vw] md:w-[60vw] lg:w-[40vw] max-h-[80vh] overflow-y-auto shadow-lg p-6 relative">

                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                    onClick={onClose}
                >
                    <i className="ri-close-line"></i>
                </button>

                {/* Date */}
                <div className="text-gray-500 text-sm mb-2">
                    {dayjs(card.createdAt).format('DD/MM/YYYY')}
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold capitalize text-blue-600 mb-4">
                    {card.title}
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-700 whitespace-pre-line">
                    {card.description}
                </p>
            </div>
        </div>
    );
};

export default ReadCardPopUp;
