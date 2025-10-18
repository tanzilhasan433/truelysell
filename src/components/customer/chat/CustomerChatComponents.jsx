
'use client'; 
import React, { useState } from 'react';

// --- Icon Placeholder Components (for demonstration without external libraries) ---
const Search = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const MoreVertical = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>;
const Paperclip = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>;
const Send = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;
const Check = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const CheckCheck = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6L7 17l-5-5"></path><path d="M22 6l-11 11-5-5"></path></svg>;
const Video = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>;
const Phone = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;


// --- Data with placeholder images ---
const chats = [
    { id: 1, name: 'Aariyan Jose', avatar: 'https://placehold.co/100x100/E2E8F0/4A5568?text=AJ', lastMessage: 'is typing...', timestamp: '02:40 PM', unread: 12, status: 'typing' },
    { id: 2, name: 'Sarika Jain', avatar: 'https://placehold.co/100x100/FEE2E2/B91C1C?text=SJ', lastMessage: 'Do you know which', timestamp: '06:12 AM', unread: 0, status: 'sent' },
    { id: 3, name: 'Clyde Smith', avatar: 'https://placehold.co/100x100/D1FAE5/065F46?text=CS', lastMessage: 'Haha oh man', timestamp: '03:15 AM', unread: 55, status: 'delivered' },
    { id: 4, name: 'Estell Gibson', avatar: 'https://placehold.co/100x100/FEF3C7/92400E?text=EG', lastMessage: 'Missed Video Call', timestamp: '03:15 AM', unread: 0, status: 'missed' },
    { id: 5, name: 'Carla Jenkins', avatar: 'https://placehold.co/100x100/E0E7FF/3730A3?text=CJ', lastMessage: 'Incoming Video', timestamp: 'Sunday', unread: 0, status: 'delivered' },
    { id: 6, name: 'Federico Wells', avatar: 'https://placehold.co/100x100/F3E8FF/5B21B6?text=FW', lastMessage: 'Photo', timestamp: 'Wednesday', unread: 25, status: 'delivered' },
    { id: 7, name: 'Edward Lietz', avatar: 'https://placehold.co/100x100/D6D3D1/44403C?text=EL', lastMessage: 'Document', timestamp: '02:40 PM', unread: 0, status: 'read' },
];

const messages = [
    { id: 1, sender: 'Aariyan Jose', text: "Hi there! I'm interested in your services.", time: '10:45 am', self: false },
    { id: 2, text: "Can you tell me more about what you offer?. Can you explain it briefly...", time: '10:45 am', self: true, status: 'read' },
    { id: 'sep1', separator: 'Yesterday' },
    { id: 3, sender: 'Aariyan Jose', file: { name: 'Ecommerce.zip', size: '14.23 KB' }, time: '08:00 AM', self: false },
    { id: 4, text: "Hi there! I'm interested in learning more", time: '09:15 AM', self: true, status: 'read' },
    { id: 5, text: "Send me your Profile Video if Any??", time: '09:15 AM', self: true, status: 'sent' },
];


const MessageStatus = ({ status }) => {
    if (status === 'sent') return <Check className="h-4 w-4 text-gray-400" />;
    if (status === 'delivered') return <CheckCheck className="h-4 w-4 text-gray-400" />;
    if (status === 'read') return <CheckCheck className="h-4 w-4 text-blue-500" />;
    return null;
};

const CustomerChatComponent = () => {
    const [selectedChat, setSelectedChat] = useState(chats[0]);

    const ChatList = () => (
        <div className={` md:w-1/3 lg:w-[30%] p-4 bg-white border-r border-gray-200 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
            <h2 className="text-2xl font-bold mb-4">Chats</h2>
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search For Contacts or Messages"
                    className=" pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5">
                    <Search />
                </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">All Chats</h3>
            <div className="flex-grow overflow-y-auto -mr-4 pr-4">
                {chats.map(chat => (
                    <div
                        key={chat.id}
                        onClick={() => setSelectedChat(chat)}
                        className={`flex items-center p-3 rounded-lg cursor-pointer mb-2 ${selectedChat?.id === chat.id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                    >
                        <div className="relative">
                            <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                            {chat.status === 'typing' && <span className="absolute bottom-0 right-0 block h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>}
                        </div>
                        <div className="flex-grow ml-4">
                            <p className="font-semibold text-gray-800">{chat.name}</p>
                            {chat.status === 'typing' ? (
                                <p className="text-sm text-blue-500 italic">{chat.lastMessage}</p>
                            ) : (
                                <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                            )}
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-xs text-gray-400 mb-1">{chat.timestamp}</p>
                            {chat.unread > 0 && (
                                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {chat.unread}
                                </span>
                            )}
                            {chat.unread === 0 && chat.status !== 'typing' && <MessageStatus status={chat.status} />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    
    const ChatWindow = () => (
        <div className={`w-full md:w-2/3 lg:w-[70%] flex flex-col bg-gray-50 ${selectedChat ? 'flex' : 'hidden md:flex'}`}>
            {selectedChat ? (
                <>
                    <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
                        <div className="flex items-center">
                             <button onClick={() => setSelectedChat(null)} className="md:hidden mr-4 text-gray-600">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                             </button>
                            <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                            <div>
                                <h3 className="font-semibold text-gray-800">{selectedChat.name}</h3>
                                <p className="text-sm text-green-500">Online</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-500">
                            <div className="h-5 w-5 cursor-pointer hover:text-gray-800"><Phone /></div>
                            <div className="h-5 w-5 cursor-pointer hover:text-gray-800"><Video /></div>
                            <div className="h-5 w-5 cursor-pointer hover:text-gray-800"><MoreVertical /></div>
                        </div>
                    </div>

                    <div className="flex-grow p-6 overflow-y-auto">
                        <div className="flex flex-col space-y-4">
                            {messages.map(msg => (
                                msg.separator ? (
                                    <div key={msg.id} className="text-center my-4">
                                        <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full">{msg.separator}</span>
                                    </div>
                                ) : (
                                <div key={msg.id} className={`flex items-end gap-2 ${msg.self ? 'justify-end' : 'justify-start'}`}>
                                    {!msg.self && <img src={selectedChat.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover"/>}
                                    <div className={`max-w-md rounded-xl px-4 py-3 ${msg.self ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                                       {msg.text && <p className="text-sm">{msg.text}</p>}
                                       {msg.file && (
                                            <div className="flex items-center gap-3 p-2 bg-gray-100 rounded-lg">
                                                <div className="p-2 bg-gray-200 rounded-full">
                                                    <div className="h-5 w-5 text-gray-600"><Paperclip /></div>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-gray-800">{msg.file.name}</p>
                                                    <p className="text-xs text-gray-500">{msg.file.size}</p>
                                                </div>
                                            </div>
                                       )}
                                        <div className={`flex items-center gap-1 mt-1 ${msg.self ? 'justify-end' : 'justify-start'}`}>
                                            <p className={`text-xs ${msg.self ? 'text-blue-100' : 'text-gray-400'}`}>{msg.time}</p>
                                            {msg.self && <MessageStatus status={msg.status} />}
                                        </div>
                                    </div>
                                    {/* Corrected the hardcoded avatar path */}
                                    {msg.self && <img src="https://placehold.co/100x100/DBEAFE/1E3A8A?text=Me" alt="My Avatar" className="w-8 h-8 rounded-full object-cover"/>}
                                </div>
                                )
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-white border-t border-gray-200">
                        <div className="relative flex items-center">
                            <div className="absolute left-4 h-5 w-5 text-gray-500 cursor-pointer"><Paperclip /></div>
                            <input
                                type="text"
                                placeholder="Type Your Message"
                                className="w-full pl-12 pr-12 py-3 border border-gray-200 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="absolute right-3 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600">
                                <div className="h-5 w-5"><Send /></div>
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                    <p>Select a chat to start messaging</p>
                </div>
            )}
        </div>
    );
    
 
    return (
        <div className="h-screen w-screen flex antialiased text-gray-800">
            <ChatList />
            <ChatWindow />
        </div>
    );
};

export default CustomerChatComponent;