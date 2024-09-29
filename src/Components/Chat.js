import React, { useEffect, useRef } from 'react';

function Chat({ visible }) {
    const chatContainerRef = useRef(null); // Reference to the draggable container
    const resizeHandleRef = useRef(null); // Reference to the resize handle
    let isDragging = false;
    let isResizing = false;
    let offset = { x: 0, y: 0 };

    // Effect for handling drag events
    useEffect(() => {
        const chatContainer = chatContainerRef.current;

        if (!chatContainer) return;

        const handleMouseDown = (e) => {
            // Prevent dragging if resizing
            if (isResizing) return;
            isDragging = true;
            offset = {
                x: e.clientX - chatContainer.getBoundingClientRect().left,
                y: e.clientY - chatContainer.getBoundingClientRect().top,
            };
            chatContainer.style.cursor = 'grabbing'; // Change cursor on drag
        };

        const handleMouseMove = (e) => {
            if (isDragging) {
                chatContainer.style.left = `${e.clientX - offset.x}px`;
                chatContainer.style.top = `${e.clientY - offset.y}px`;
            }
        };

        const handleMouseUp = () => {
            isDragging = false;
            chatContainer.style.cursor = 'grab'; // Reset cursor after drag
        };

        // Event listeners for mouse
        chatContainer.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        // Event listeners for touch
        const handleTouchStart = (e) => {
            // Prevent dragging if resizing
            if (isResizing) return;
            isDragging = true;
            const touch = e.touches[0];
            offset = {
                x: touch.clientX - chatContainer.getBoundingClientRect().left,
                y: touch.clientY - chatContainer.getBoundingClientRect().top,
            };
            chatContainer.style.cursor = 'grabbing'; // Change cursor on drag
        };

        const handleTouchMove = (e) => {
            if (isDragging) {
                const touch = e.touches[0];
                chatContainer.style.left = `${touch.clientX - offset.x}px`;
                chatContainer.style.top = `${touch.clientY - offset.y}px`;
            }
        };

        const handleTouchEnd = () => {
            isDragging = false;
            chatContainer.style.cursor = 'grab'; // Reset cursor after drag
        };

        chatContainer.addEventListener("touchstart", handleTouchStart);
        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        document.addEventListener("touchend", handleTouchEnd);

        return () => {
            chatContainer.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            chatContainer.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, []);

    // Set initial position and size for the chat container
    useEffect(() => {
        const chatContainer = chatContainerRef.current;

        if (chatContainer && visible) {
            chatContainer.style.left = '100px';
            chatContainer.style.top = '100px';
            chatContainer.style.position = 'absolute';
            chatContainer.style.zIndex = '1000';

            // Adjust size based on screen width
            const isMobile = window.innerWidth <= 768; // Change this breakpoint as needed
            chatContainer.style.width = isMobile ? '300px' : '400px'; // Set smaller width for mobile
            chatContainer.style.height = isMobile ? '400px' : '600px'; // Set smaller height for mobile
        }
    }, [visible]);

    // Resizing functionality
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        const resizeHandle = resizeHandleRef.current;

        if (!chatContainer || !resizeHandle) return;

        const handleMouseDownResize = (e) => {
            isResizing = true;
            document.body.style.cursor = 'nwse-resize'; // Change cursor on resize
            e.stopPropagation(); // Prevent the event from bubbling up to dragging
        };

        const handleMouseMoveResize = (e) => {
            if (isResizing) {
                const newWidth = e.clientX - chatContainer.getBoundingClientRect().left;
                const newHeight = e.clientY - chatContainer.getBoundingClientRect().top;
                if (newWidth > 200) chatContainer.style.width = `${newWidth}px`; // Min width
                if (newHeight > 300) chatContainer.style.height = `${newHeight}px`; // Min height
            }
        };

        const handleMouseUpResize = () => {
            isResizing = false;
            document.body.style.cursor = 'default'; // Reset cursor after resize
        };

        resizeHandle.addEventListener("mousedown", handleMouseDownResize);
        document.addEventListener("mousemove", handleMouseMoveResize);
        document.addEventListener("mouseup", handleMouseUpResize);

        // Resizing touch events
        const handleTouchStartResize = (e) => {
            isResizing = true;
            document.body.style.cursor = 'nwse-resize'; // Change cursor on resize
            e.stopPropagation(); // Prevent the event from bubbling up to dragging
        };

        const handleTouchMoveResize = (e) => {
            if (isResizing) {
                const touch = e.touches[0];
                const newWidth = touch.clientX - chatContainer.getBoundingClientRect().left;
                const newHeight = touch.clientY - chatContainer.getBoundingClientRect().top;
                if (newWidth > 200) chatContainer.style.width = `${newWidth}px`; // Min width
                if (newHeight > 300) chatContainer.style.height = `${newHeight}px`; // Min height
            }
        };

        const handleTouchEndResize = () => {
            isResizing = false;
            document.body.style.cursor = 'default'; // Reset cursor after resize
        };

        resizeHandle.addEventListener("touchstart", handleTouchStartResize);
        document.addEventListener("touchmove", handleTouchMoveResize, { passive: false });
        document.addEventListener("touchend", handleTouchEndResize);

        return () => {
            resizeHandle.removeEventListener("mousedown", handleMouseDownResize);
            document.removeEventListener("mousemove", handleMouseMoveResize);
            document.removeEventListener("mouseup", handleMouseUpResize);
            resizeHandle.removeEventListener("touchstart", handleTouchStartResize);
            document.removeEventListener("touchmove", handleTouchMoveResize);
            document.removeEventListener("touchend", handleTouchEndResize);
        };
    }, []);

    if (!visible) return null;

    return (
        <div 
            className='Chat' 
            ref={chatContainerRef} 
            style={{ 
                cursor: 'grab', 
                display: 'flex',          
                flexDirection: 'column',  
                alignItems: 'center',     
                justifyContent: 'center', 
                padding: '20px',          
                border: '1px solid #3498db', 
                borderRadius: '8px',      
                backgroundColor: '#ffffff',
                position: 'relative',      // Position relative to allow absolute positioning of the resize handle
            }} 
        >
            <iframe 
                title="chat" 
                src="https://minnit.chat/c/WBAR?embed&&nickname=" 
                style={{ 
                    border: 'none', 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '8px 8px 0 0', 
                }} 
            ></iframe>
            <a href="https://minnit.chat/c/WBAR" style={{ marginTop: '10px' }}>Open in new tab</a>
            {/* Resize handle */}
            <div 
                ref={resizeHandleRef} 
                style={{ 
                    width: '15px', 
                    height: '15px', 
                    backgroundColor: '#3498db', 
                    position: 'absolute', 
                    bottom: '5px', 
                    right: '5px', 
                    cursor: 'nwse-resize', 
                    borderRadius: '50%' 
                }} 
            />
        </div>
    );
}

export default Chat;
