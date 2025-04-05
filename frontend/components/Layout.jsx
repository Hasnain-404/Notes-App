import React, { useEffect, useState } from 'react';
import SideBarItems from './SideBarItems';
import UserInfo from './UserInfo';
import Dashboard from './Dashboard';

const Layout = () => {
    const [section, setSection] = useState("ALL");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [reloadCards, setReloadCards] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="min-h-screen flex bg-[#FBFFE4] dark:bg-[#2a2a2a] text-black dark:text-white">

            {/* Sidebar */}
            <div className={`bg-[#FBFFE4] dark:bg-[#2a2a2a] h-screen fixed md:static z-50 transition-transform duration-300 
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 
                w-[70vw] md:w-[20vw]`}>

                {/* Fold Icon for Mobile */}
                <div className="flex items-center justify-between px-5 py-4 md:hidden">
                    <div className="text-2xl font-bold text-blue-400 dark:text-[#48A6A7]">Cloud Notes</div>
                    <div className="text-2xl cursor-pointer" onClick={toggleSidebar}>
                        <i className="ri-menu-fold-line"></i>
                    </div>
                </div>

                <div className="px-7 py-7 text-2xl font-bold text-blue-400 dark:text-yellow-300 hidden md:block">
                    Cloud Notes
                </div>

                <SideBarItems setSection={(sectionName) => {
                    setSection(sectionName);
                    setSidebarOpen(false);
                }} />
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 w-full">

                {/* Top bar */}
                <div className="bg-[#FBFFE4] dark:bg-[#2a2a2a] h-16 w-full flex items-center justify-between px-5">

                    {/* Hamburger icon */}
                    <div className="md:hidden text-2xl cursor-pointer" onClick={toggleSidebar}>
                        <i className="ri-menu-unfold-line"></i>
                    </div>

                    {/* Page Title */}
                    <div className="text-xl md:text-3xl font-bold uppercase">
                        My Notes
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center gap-4">
                        <UserInfo />
                    </div>
                </div>

                {/* Content */}
                <div className="bg-gray-100 dark:bg-[#333333] p-4 overflow-auto flex-1 rounded-tl-2xl">
                    <div className="py-6">
                        <div className="capitalize text-xl font-medium px-2 md:px-7">
                            My Notes
                        </div>

                        {/* Dashboard Section */}
                        <Dashboard section={section} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
