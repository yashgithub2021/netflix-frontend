import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const DEMO_MESSAGES = [];

const Chat = () => {
    const [messages, setMessages] = useState(DEMO_MESSAGES);
    const [socket, setSocket] = useState(null);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const newSocket = io('https://netflix-socket.onrender.com');
        setSocket(newSocket);

        newSocket.on('newMsg', (message) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: Date.now(), user: 'Bot', text: message },
            ]);
        });

        return () => {
            if (newSocket) newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (socket && input.trim()) {

            socket.emit('message', input.trim());

            setMessages((prevMessages) => [
                ...prevMessages,
                { id: Date.now(), user: 'You', text: input.trim() },
            ]);
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-[80vh] max-w-lg mx-auto mt-10 bg-black border border-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center px-4 py-3 border-b border-gray-800 bg-[#141414] rounded-t-lg">
                <img src="/netflix-logo.png" alt="Chat Logo" className="w-30 h-8 mr-2" />
                <span className="font-bold text-lg text-white">Chat Bot</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`px-4 py-2 rounded-2xl max-w-xs break-words text-sm shadow-md '
                                ${msg.user === 'You'
                                    ? 'bg-[#e50914] text-white rounded-br-none'
                                    : 'bg-gray-800 text-white rounded-bl-none'}
                            `}
                        >
                            <span className="block font-semibold mb-1 text-xs opacity-70">{msg.user}</span>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form
                className="flex items-center p-3 border-t border-gray-800 bg-[#141414] rounded-b-lg"
                onSubmit={handleSend}
            >
                <input
                    type="text"
                    className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-l-lg focus:outline-none"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-[#e50914] hover:bg-red-700 text-white px-5 py-2 rounded-r-lg font-semibold transition-colors"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;