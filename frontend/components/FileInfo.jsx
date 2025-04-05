import React, { useState } from 'react';

const FileInfo = ({ setFilter }) => {
    const [selected, setSelected] = useState("ALL");

    const handleClick = (value) => {
        setFilter(value);
        setSelected(value);
    };

    const getClass = (value) =>
        `relative px-4 sm:px-7 py-1 cursor-pointer 
        ${selected === value
            ? 'text-black font-semibold after:content-["------"] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:text-black'
            : 'text-gray-300 hover:text-black'
        }`;

    return (
        <div className='py-6 text-sm sm:text-[17px] flex flex-wrap gap-4 sm:gap-7'>
            <span className={getClass("TODAY")} onClick={() => handleClick("TODAY")}>Today</span>
            <span className={getClass("WEEK")} onClick={() => handleClick("WEEK")}>This Week</span>
            <span className={getClass("MONTH")} onClick={() => handleClick("MONTH")}>This Month</span>
        </div>
    );
};

export default FileInfo;
