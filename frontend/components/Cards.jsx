import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import ReadCardPopUp from './ReadCardPopUp';
import EditCardPopup from './EditCardPopup';
import SearchBar from './SearchBar';
import Loader from './Loader';

const Cards = ({ filter, section, reloadCards }) => {
    const lightColors = ['bg-[#FFF9DB]', 'bg-[#E9F8E5]', 'bg-[#DDF3FF]', 'bg-[#FDE2E2]'];

    const [cardInfo, setCardInfo] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [editCard, setEditCard] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                setLoading(true);
                const response = await axios.get("https://notes-app-87nm.onrender.com/api/card/get");
                setCardInfo(response.data);
            } catch (error) {
                console.log("Error in getting cards", error.response.data);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [section, filter, reloadCards]);

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const filterCards = (cards) => {
        const today = dayjs();
        return cards.filter(card => {
            const createdAt = dayjs(card.createdAt);
            if (filter === "TODAY") return createdAt.isSame(today, 'day');
            if (filter === "WEEK") return createdAt.isSame(today, 'week');
            if (filter === "MONTH") return createdAt.isSame(today, 'month');
            return true;
        });
    };

    const handleTrash = async (id) => {
        try {
            await axios.delete(`/api/card/delete/${id}`);
            setCardInfo(prev => prev.filter(card => card._id !== id));
        } catch (error) {
            console.log("Error trashing card:", error);
        }
    };

    const handleUpdateCard = async (updatedCard) => {
        try {
            await axios.put(`/api/card/update/${updatedCard._id}`, updatedCard);
            setCardInfo(prev =>
                prev.map(card => (card._id === updatedCard._id ? updatedCard : card))
            );
            setEditCard(null);
        } catch (error) {
            console.log("Error updating card:", error);
        }
    };

    const filteredByDate = filterCards(cardInfo);

    const filteredBySearch = filteredByDate.filter(card =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            {/* SearchBar */}
            <div className='mb-4'>
                <SearchBar onSearch={handleSearchChange} />
            </div>

            {/* Cards Grid */}
            {loading ? (
                <div className="flex justify-center items-center min-h-[300px]">
                    <Loader />
                </div>
            ) : (
                <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4">
                    {filteredBySearch.map((card, index) => (
                        <div
                            key={card._id}
                            className={`min-h-[200px] p-5 rounded-2xl shadow-md 
                            ${lightColors[index % lightColors.length]} dark:bg-[#1E201E] dark:text-white
                            transition-all duration-300 transform hover:scale-105 hover:shadow-lg cursor-pointer`}
                            onClick={() => setSelectedCard(card)}
                        >
                            <div className='text-[#3C3D37] dark:text-gray-300 text-sm'>
                                <span>{dayjs(card.createdAt).format('DD/MM/YYYY')}</span>
                            </div>

                            <div className='flex items-center justify-between text-xl font-bold capitalize mt-2 text-black dark:text-white'>
                                <span>{card.title}</span>

                                <div
                                    className='space-x-2'
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i
                                        className="ri-edit-line hover:text-white"
                                        title="Edit"
                                        onClick={() => setEditCard(card)}
                                    ></i>
                                    <i
                                        className="ri-delete-bin-line hover:text-white"
                                        title="Delete"
                                        onClick={() => handleTrash(card._id)}
                                    ></i>
                                </div>
                            </div>

                            <hr className="my-2 border-black/30 dark:border-white/20" />
                            <div className='py-3 text-md break-words line-clamp-4 text-black dark:text-gray-200'>
                                {card.description}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* View Card Popup */}
            {selectedCard && (
                <ReadCardPopUp
                    card={selectedCard}
                    onClose={() => setSelectedCard(null)}
                />
            )}

            {/* Edit Card Popup */}
            {editCard && (
                <EditCardPopup
                    card={editCard}
                    onClose={() => setEditCard(null)}
                    onUpdate={handleUpdateCard}
                />
            )}
        </>
    );
};

export default Cards;
