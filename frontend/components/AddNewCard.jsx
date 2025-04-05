import React, { useState, useRef, useEffect } from 'react';
import CardPopUp from './CardPopUp';

const AddNewCard = ({ onCardAdded }) => {
    const [showCard, setShowCard] = useState(false);
    const cardRef = useRef(null);

    const handleShowCard = () => setShowCard(prev => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setShowCard(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='py-7'>
            <div
                className='border-dashed border-2 w-full sm:w-[12vw] h-[20vh] flex items-center justify-center rounded-2xl cursor-pointer'
                onClick={handleShowCard}
            >
                <div className='text-xl text-center'>
                    <i className="ri-edit-2-fill block"></i>
                    <div className='capitalize'>New Note</div>
                </div>
            </div>

            {showCard && (
                <div ref={cardRef}>
                    <CardPopUp closePopUp={handleShowCard} onCardAdded={onCardAdded} />
                </div>
            )}
        </div>
    );
};

export default AddNewCard;
