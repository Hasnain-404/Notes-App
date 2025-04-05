import React from 'react';

const SearchBar = ({ onSearch }) => {
    return (
        <div className='bg-gray-100 px-[1vw] w-full sm:w-[60%] md:w-[40%] rounded flex items-center gap-2 shadow'>
            <i className="ri-search-line text-gray-500 text-lg"></i>
            <input
                className='py-[.7vw] px-[1vw] outline-none w-full bg-transparent placeholder:text-black'
                type="text"
                placeholder='Search notes...'
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
