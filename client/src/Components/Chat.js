import React, {useEffect, useState} from 'react';
import './Chat.css';
import {useDraggable} from '@dnd-kit/core';

function Chat() {
    const [isVisible, setIsVisible] = useState(false);
    const [deltaOffset, setDeltaOffset] = useState({x: 0, y: 0});
    const [finalOffset, setFinalOffset] = useState({x: 0, y: 0});
    const [isMinimized, setIsMinimized] = useState(false);
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'chat',
    });

    useEffect(() => {
        if (transform) {
            setIsMinimized(false);
            const newDeltaOffset = {x: transform.x, y: transform.y};
            setDeltaOffset(newDeltaOffset);
        }
    }, [transform, isMinimized]);

    const handleDragEnd = () => {
        setFinalOffset(prev => ({
            x: prev.x + deltaOffset.x, y: prev.y + deltaOffset.y,
        }));
        setDeltaOffset({x: 0, y: 0});
    };

    const unMinimizeChat = () => {
        setIsMinimized(false);
        const chatHeight = document.getElementById('chat-container')?.offsetHeight;
        const offsetHeight = chatHeight - document.getElementById('chat-header')?.offsetHeight;
        setFinalOffset({x: finalOffset.x, y: 0});
    };

    const minimizeChat = () => {
        setIsMinimized(true);
        const chatHeight = document.getElementById('chat-container')?.offsetHeight;
        const offsetHeight = chatHeight - document.getElementById('chat-header')?.offsetHeight;
        setFinalOffset({x: finalOffset.x, y: offsetHeight});
    };

    let style = {
        transform: `translate3d(${deltaOffset.x + finalOffset.x}px, ${finalOffset.y + deltaOffset.y}px, 0)`,
        touchAction: 'none', // Prevent default touch actions

    };

    if (!isVisible) return (<button
            id={'show-chat-btn'}
            className={'btn btn-dark btn-lg'}
            onClick={() => setIsVisible(!isVisible)}
        >
            <i className={'bi bi-chat-fill'}></i> <span>Show chat</span>
        </button>);

    return (<div
            id={"chat-container"}
            ref={setNodeRef}
            style={style}
            onMouseUp={handleDragEnd}
            onTouchEnd={handleDragEnd}
        >
            <div id={'chat-header'}>
                <i
                    id={'close-chat'}
                    className={'bi bi-x h2'}
                    onClick={() => {
                        setFinalOffset({x: 0, y: 0});
                        setIsMinimized(false);
                        setIsVisible(false);
                    }}
                    title={'Close chat'}
                ></i>
                <i
                    id={'chat-h-grip'}
                    className="h2 bi bi-grip-horizontal"
                    {...listeners}
                    {...attributes}
                ></i>
                <i id={"chat-to-margin"} className="h5 bi bi-chevron-down"
                   onClick={isMinimized ? unMinimizeChat : minimizeChat}
                   style={isMinimized ? {transform: 'rotate(180deg)'} : {}}
                   title={isMinimized ? 'Maximize' : 'Minimize'}
                ></i>
            </div>
            <iframe
                title='chat'
                src='https://minnit.chat/c/WBAR?embed&&nickname='
                style={{
                    border: 'none', width: '100%', height: '100%', borderRadius: '8px 8px 0 0',
                }}
            ></iframe>
            <a href='https://minnit.chat/c/WBAR' target={'_blank'} rel={'noreferrer'} style={{marginTop: '10px'}}>
                Open in new tab
            </a>
        </div>);
}

export default Chat;