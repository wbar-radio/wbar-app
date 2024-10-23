import React, {useEffect, useRef, useState} from 'react';
import './Chat.css';

function Chat() {
    const chatContainerRef = useRef(null);
    const resizeHandleRef = useRef(null);
    let isDragging = false;
    let isResizing = false;
    let offset = {x: 0, y: 0};

    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (!chatContainer) return;

        const handleMouseDown = (e) => {
            if (isResizing) return;
            isDragging = true;
            offset = {
                x: e.clientX - chatContainer.getBoundingClientRect().left,
                y: e.clientY - chatContainer.getBoundingClientRect().top,
            };
            chatContainer.style.cursor = 'grabbing';
        };

        const handleMouseMove = (e) => {
            if (isDragging) {
                chatContainer.style.left = `${e.clientX - offset.x}px`;
                chatContainer.style.top = `${e.clientY - offset.y}px`;
            }
        };

        const handleMouseUp = () => {
            isDragging = false;
            chatContainer.style.cursor = 'grab';
        };

        // Only add dragging event listeners if not on mobile
        const isMobile = window.innerWidth <= 768;
        if (!isMobile) {
            chatContainer.addEventListener("mousedown", handleMouseDown);
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            if (!isMobile) {
                chatContainer.removeEventListener("mousedown", handleMouseDown);
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            }
        };
    }, []);

    // Set initial position and size for the chat container
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        if (chatContainer && visibility) {
            const isMobile = window.innerWidth <= 768;
            chatContainer.style.position = isMobile ? 'fixed' : 'absolute'; // Use fixed on mobile
            chatContainer.style.left = isMobile ? '10px' : '100px'; // Adjust left position for mobile
            chatContainer.style.bottom = isMobile ? '10px' : '100px'; // Adjust top position for mobile
            chatContainer.style.zIndex = '1000';
            chatContainer.style.width = isMobile ? '300px' : '400px';
            chatContainer.style.height = isMobile ? '400px' : '600px';
        }
    }, [visibility]);

    if (!visibility) return (
        <button className={'btn btn-primary btn-lg'} onClick={() => setVisibility(!visibility)}>
            Show chat <i className={'bi bi-chat-fill'}></i>
        </button>
    );

    return (
        <div
            className='Chat'
            ref={chatContainerRef}
            style={{
                cursor: 'grab',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                border: '1px solid #3498db',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                position: 'relative',
            }}
        >
            <div id={"chat-header"} className={'row'}>
                {/*<span className={'spacer'}></span>*/}
                <i id={"close-chat"} className={"bi bi-x h2"} onClick={() => setVisibility(!visibility)}></i>
            </div>
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

            <a href="https://minnit.chat/c/WBAR" style={{marginTop: '10px'}}>Open in new tab</a>

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
    )
        ;
}

export default Chat;
