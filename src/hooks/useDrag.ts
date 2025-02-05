import { useState, useRef, useCallback } from 'react';

interface UseDragProps {
    onDragEnd: (weeksDelta: number) => void;
    elementRef: React.RefObject<HTMLElement>;
    backgroundColor: string;
}

export const useDrag = ({ onDragEnd, elementRef, backgroundColor }: UseDragProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [weeksDelta, setWeeksDelta] = useState(0);
    const startXRef = useRef<number>(0);
    const currentXRef = useRef<number>(0);
    const ghostRef = useRef<HTMLDivElement | null>(null);

    const getCellWidth = () => {
        const cells = document.querySelectorAll('td');
        if (cells.length > 0) {
            return cells[0].offsetWidth;
        }
        return 40; // fallback width
    };

    const createGhost = (element: HTMLElement) => {
        const ghost = element.cloneNode(true) as HTMLDivElement;
        ghost.style.position = 'fixed';
        ghost.style.pointerEvents = 'none';
        ghost.style.opacity = '0.7';
        ghost.style.backgroundColor = backgroundColor;
        ghost.style.width = `${element.offsetWidth}px`;
        ghost.style.height = `${element.offsetHeight}px`;
        ghost.style.zIndex = '1000';
        ghost.style.transition = 'transform 0.1s ease-out';
        
        document.body.appendChild(ghost);
        return ghost;
    };

    const updateGhostPosition = (ghost: HTMLDivElement, element: HTMLElement, deltaX: number) => {
        const rect = element.getBoundingClientRect();
        ghost.style.top = `${rect.top}px`;
        ghost.style.left = `${rect.left}px`;
        ghost.style.transform = `translateX(${deltaX}px)`;
    };

    const handleDragStart = useCallback((e: React.MouseEvent) => {
        if (!elementRef.current) return;
        e.preventDefault();
        e.stopPropagation();

        const element = elementRef.current;
        setIsDragging(true);
        startXRef.current = e.clientX;
        currentXRef.current = e.clientX;
        
        // Create ghost element
        ghostRef.current = createGhost(element);
        if (ghostRef.current) {
            updateGhostPosition(ghostRef.current, element, 0);
        }

        const cellWidth = getCellWidth();

        const handleDragMove = (e: MouseEvent) => {
            if (!isDragging || !element || !ghostRef.current) return;

            const deltaX = e.clientX - startXRef.current;
            const newWeeksDelta = Math.round(deltaX / cellWidth);
            
            // Update ghost position
            updateGhostPosition(ghostRef.current, element, deltaX);
            currentXRef.current = e.clientX;

            // Update weeks delta for snapping feedback
            if (newWeeksDelta !== weeksDelta) {
                setWeeksDelta(newWeeksDelta);
            }
        };

        const handleDragEnd = () => {
            setIsDragging(false);
            const deltaX = currentXRef.current - startXRef.current;
            const finalWeeksDelta = Math.round(deltaX / cellWidth);

            // Remove ghost
            if (ghostRef.current) {
                ghostRef.current.remove();
                ghostRef.current = null;
            }

            // Reset weeks delta
            setWeeksDelta(0);

            // Notify parent of the change
            if (finalWeeksDelta !== 0) {
                onDragEnd(finalWeeksDelta);
            }

            document.removeEventListener('mousemove', handleDragMove);
            document.removeEventListener('mouseup', handleDragEnd);
        };

        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
    }, [elementRef, isDragging, onDragEnd, weeksDelta, backgroundColor]);

    return {
        isDragging,
        weeksDelta,
        dragProps: {
            onMouseDown: handleDragStart,
            style: { 
                cursor: 'move',
                backgroundColor,
                opacity: isDragging ? 0.3 : 1,
                transition: isDragging ? 'none' : 'opacity 0.2s ease-in-out'
            },
        },
    };
};