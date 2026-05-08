import { useState, useEffect } from 'react'
import { ChatInput } from './components/ChatInput.jsx';
import './App.css'
import ChatMessages from './components/ChatMessages.jsx';
import { Chatbot } from 'supersimpledev'


  function App() {
    const [chatMessages, setChatMessages] = useState(() => 
    { 
      return JSON.parse(localStorage.getItem('messages')) || [];
    });

    useEffect(() => {
      localStorage.setItem('messages', JSON.stringify(chatMessages));
     }, [chatMessages]);

    useEffect(() => {
      Chatbot.addResponses({
        scott : 'Scawwwwt',
        drew : 'drew the tankengine',
      });
    }, []);  

    return (
      <div className="app-container">

        <ChatMessages
          chatMessages={chatMessages}
        />
        <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
          />
          
      </div>
    );
  }

export default App
