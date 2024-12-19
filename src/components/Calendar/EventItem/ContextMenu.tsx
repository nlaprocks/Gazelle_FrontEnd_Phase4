import React, { useEffect, useRef } from 'react';
import { Copy, Edit, Trash2 } from 'lucide-react';

interface ContextMenuProps {
    position: { x: number; y: number };
    onClose: () => void;
    onEdit: () => void;
    onDelete: () => void;
    onCopy: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
    position,
    onClose,
    onEdit,
    onDelete,
    onCopy,
}) => {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleAction = (action: () => void) => {
        action();
        onClose();
    };

    return (
        <div
            ref={menuRef}
            className="fixed bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[100]"
            style={{
                left: position.x,
                top: position.y,
            }}
        >
            <button
                onClick={() => handleAction(onEdit)}
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center gap-2"
            >
                <Edit size={16} />
                Edit
            </button>
            <button
                onClick={() => handleAction(onCopy)}
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center gap-2"
            >
                <Copy size={16} />
                Copy
            </button>
            <button
                onClick={() => handleAction(onDelete)}
                className="w-full px-4 py-2 text-sm text-left hover:bg-gray-100 flex items-center gap-2 text-red-600"
            >
                <Trash2 size={16} />
                Delete
            </button>
        </div>
    );
};