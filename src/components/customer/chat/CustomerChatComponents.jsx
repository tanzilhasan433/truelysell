'use client'; 
import React, { useState } from 'react';
import { Search, MoreVertical, Paperclip, Send, Check, CheckCheck, Video, Phone } from 'lucide-react'; // Using lucide-react for icons


const chats = [
    { id: 1, name: 'Aariyan Jose', avatar: '/img/aariyan.jpg', lastMessage: 'is typing...', timestamp: '02:40 PM', unread: 12, status: 'typing' },
    { id: 2, name: 'Sarika Jain', avatar: '/img/sarika.jpg', lastMessage: 'Do you know which', timestamp: '06:12 AM', unread: 0, status: 'sent' },
    { id: 3, name: 'Clyde Smith', avatar: '/img/clyde.jpg', lastMessage: 'Haha oh man', timestamp: '03:15 AM', unread: 55, status: 'delivered' },
    { id: 4, name: 'Estell Gibson', avatar: '/img/estell.jpg', lastMessage: 'Missed Video Call', timestamp: '03:15 AM', unread: 0, status: 'missed' },
    { id: 5, name: 'Carla Jenkins', avatar: '/img/carla.jpg', lastMessage: 'Incoming Video', timestamp: 'Sunday', unread: 0, status: 'delivered' },
    { id: 6, name: 'Federico Wells', avatar: '/img/federico.jpg', lastMessage: 'Photo', timestamp: 'Wednesday', unread: 25, status: 'delivered' },
    { id: 7, name: 'Edward Lietz', avatar: '/img/edward.jpg', lastMessage: 'Document', timestamp: '02:40 PM', unread: 0, status: 'read' },
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
        <div className={`w-full md:w-1/3 lg:w-[30%] p-4 bg-white border-r border-gray-200 flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
            <h2 className="text-2xl font-bold mb-4">Chats</h2>
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search For Contacts or Messages"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
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
            {selectedChat && (
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
                            <Phone className="h-5 w-5 cursor-pointer hover:text-gray-800" />
                            <Video className="h-5 w-5 cursor-pointer hover:text-gray-800" />
                            <MoreVertical className="h-5 w-5 cursor-pointer hover:text-gray-800" />
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
                                                    <Paperclip className="h-5 w-5 text-gray-600" />
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
                                    {msg.self && <img src="/img/my-avatar.png" alt="My Avatar" className="w-8 h-8 rounded-full object-cover"/>}
                                </div>
                                )
                            ))}
                        </div>
                    </div>

                   
                    <div className="p-4 bg-white border-t border-gray-200">
                        <div className="relative flex items-center">
                            <Paperclip className="absolute left-4 h-5 w-5 text-gray-500 cursor-pointer" />
                            <input
                                type="text"
                                placeholder="Type Your Message"
                                className="w-full pl-12 pr-12 py-3 border border-gray-200 bg-gray-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="absolute right-4 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600">
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </>
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