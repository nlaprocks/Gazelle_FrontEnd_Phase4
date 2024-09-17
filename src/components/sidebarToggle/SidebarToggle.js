import React from 'react';

const SidebarToggle = ({ sidebarState, sidebarHandler }) => {
    return (
        <span className={`nla-toggle-line bg-primary w-8 h-8 rounded-full flex items-center justify-center text-white ${sidebarState ? 'right' : 'left'}`} onClick={sidebarHandler}>
            <i className={`fa-solid ${sidebarState ? 'fa-caret-right' : 'fa-caret-left'}`}></i>
        </span>
    );
};

export default SidebarToggle;