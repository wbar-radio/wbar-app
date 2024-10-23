import React, { useEffect, useState } from 'react';
import './Chat.css';
import { useDraggable } from '@dnd-kit/core';

function Chat() {
    const [isVisible, setIsVisible] = useState(false);
    const [deltaPosition, setDeltaPosition] = useState({ x: 0, y: 0 });
    const [finalPosition, setFinalPosition] = useState({ x: 0, y: 0 });

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'chat',
    });

    useEffect(() => {
        if (transform) {
            console.log("update final position", finalPosition)
            setDeltaPosition({ x: transform.x, y: transform.y });
        }
    }, [transform]);

    const handleDragEnd = () => {
        setFinalPosition(prev => ({
            x: prev.x + deltaPosition.x,
            y: prev.y + deltaPosition.y,
        }));
        setDeltaPosition({ x: 0, y: 0 });
    };


    let style = {
        transform: `translate3d(${deltaPosition.x + finalPosition.x}px, ${finalPosition.y+deltaPosition.y}px, 0)`,
    };



    if (!isVisible)
        return (
            <button
                id={'show-chat-btn'}
                className={'btn btn-dark btn-lg'}
                onClick={() => setIsVisible(!isVisible)}
            >
                Show chat <i className={'bi bi-chat-fill'}></i>
            </button>
        );

    return (
        <div
            id={"chat-container"}
            ref={setNodeRef}
            style={style}
            onMouseUp={handleDragEnd}

        >
            <div id={'chat-header'}>
                <i
                    id={'chat-h-grip'}
                    className="h2 bi bi-grip-horizontal"
                    {...listeners}
                    {...attributes}
                ></i>
                <i
                    id={'close-chat'}
                    className={'bi bi-x h2'}
                    onClick={() => {
                        console.log("clicked");
                        setIsVisible(false)
                    }}
                ></i>
            </div>
            <iframe
                title='chat'
                src='https://minnit.chat/c/WBAR?embed&&nickname='
                style={{
                    border: 'none',
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px 8px 0 0',
                }}
            ></iframe>

            <a href='https://minnit.chat/c/WBAR' style={{ marginTop: '10px' }}>
                Open in new tab
            </a>
        </div>
    );
}

export default Chat;