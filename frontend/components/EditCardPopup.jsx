import React, { useState } from 'react';

const EditCardPopup = ({ card, onClose, onUpdate }) => {
    const [editCard, setEditCard] = useState({ ...card });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditCard(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(editCard);
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-[#1F1F1F] w-[90vw] md:w-[60vw] lg:w-[40vw] rounded-xl p-6 shadow-xl">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={editCard.title}
                        onChange={handleChange}
                        className="w-full py-2 px-3 rounded border mb-3 text-xl font-semibold 
                        dark:bg-[#2C2C2C] dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                        placeholder="Edit Title"
                    />
                    <textarea
                        name="description"
                        value={editCard.description}
                        onChange={handleChange}
                        className="w-full h-[200px] p-3 rounded border resize-none 
                        dark:bg-[#2C2C2C] dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
                        placeholder="Edit Description"
                    />
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 
                            dark:bg-gray-600 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditCardPopup;
