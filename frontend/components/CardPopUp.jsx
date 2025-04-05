import React, { useState } from 'react';
import axios from 'axios';

const CardPopUp = ({ closePopUp, onCardAdded }) => {
    const [inputs, setInputs] = useState({
        title: "",
        description: ""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInputs((prevVal) => ({
            ...prevVal, [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("/api/card/create", inputs);
            console.log("Card saved:", response.data);
            if (onCardAdded) onCardAdded();
            closePopUp();
        } catch (error) {
            console.error("Error saving card:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-[#1F1F1F] w-[90vw] md:w-[65vw] h-[70vh] rounded-xl py-4 px-5 relative shadow-xl">
                <form onSubmit={handleSubmit}>
                    <input
                        className='w-full py-3 px-4 outline-none rounded font-bold capitalize text-xl 
                        bg-gray-100 dark:bg-[#2C2C2C] dark:text-white dark:placeholder-gray-400'
                        type="text"
                        name='title'
                        value={inputs.title}
                        onChange={handleChange}
                        placeholder='Title...'
                        disabled={loading}
                    />
                    <hr className="my-4 border-gray-300 dark:border-gray-600" />
                    <div className='mt-7'>
                        <textarea
                            className='w-full outline-none resize-none text-xl bg-gray-100 dark:bg-[#2C2C2C] 
                            dark:text-white dark:placeholder-gray-400 p-3 rounded'
                            placeholder='Take a note...'
                            rows="4"
                            name='description'
                            value={inputs.description}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div className='absolute bottom-4 right-4'>
                        <button
                            type="submit"
                            className='px-5 py-3 rounded cursor-pointer text-white bg-blue-500 
                            hover:bg-blue-600 active:scale-90 transition disabled:opacity-50'
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Card"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CardPopUp;
