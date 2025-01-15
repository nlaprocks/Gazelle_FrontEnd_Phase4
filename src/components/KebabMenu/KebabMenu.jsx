import React, { useState, useRef, useEffect } from 'react';

const KebabMenu = ({
    elem,
    duplicateProjectHandler,
    handleEditProjectModal,
    deleteProjectHandler,
    handleUpgradeVersion
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="kebab-menu" ref={menuRef}>
            <button onClick={toggleMenu} className="kebab-button">
                &#8942;
            </button>
            {isOpen && (
                <div className="kebab-dropdown">
                    <ul>
                        <li onClick={() => duplicateProjectHandler(elem?.id)}>Duplicate</li>
                        <li onClick={() => handleEditProjectModal(elem?.id)}>Edit Project</li>
                        <li onClick={() => handleUpgradeVersion(elem?.id)}>Upgrade Version</li>
                        <li onClick={() => deleteProjectHandler(elem?.id)}>Delete Project</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default KebabMenu;