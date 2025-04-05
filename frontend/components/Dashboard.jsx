import React, { useState } from 'react';
import FileInfo from './FileInfo';
import Cards from './Cards';
import AddNewCard from './AddNewCard';

const Dashboard = ({ section }) => {
    const [filter, setFilter] = useState("ALL");
    const [reloadCards, setReloadCards] = useState(false);

    const handleCardAdded = () => {
        setReloadCards(prev => !prev);
    };

    return (
        <div className='flex flex-col w-full'>
            <FileInfo setFilter={setFilter} />

            {/* Pass props to Cards */}
            <Cards section={section} filter={filter} reloadCards={reloadCards} />

            {/* Pass onCardAdded to AddNewCard */}
            <div className="mt-5">
                <AddNewCard onCardAdded={handleCardAdded} />
            </div>
        </div>
    );
};

export default Dashboard;
