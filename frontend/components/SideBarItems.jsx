import React from "react"

const SideBarItems = ({ setSection }) => {

    return (
        <div className='px-5 py-7 text-xl cursor-pointer text-gray-300 h-screen'>
            <div className='py-2 px-7 hover:text-black' onClick={() => setSection("ALL")}>
                <i className="ri-sticky-note-add-fill"></i>
                <span className='px-3'>All Notes</span>
            </div>
        </div>
    )
}

export default SideBarItems