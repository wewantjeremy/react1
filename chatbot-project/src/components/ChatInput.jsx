import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import LoadingGif from '../assets/loading-spinner.gif';
import './ChatInput.css'
import dayjs from 'dayjs';
import ChatMessages from './ChatMessages.jsx';

export function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false); 

function saveInputText(event){
      setInputText(event.target.value);  
    }
      
async function sendMessage() {
  if (isLoading || inputText === '') {
    return;
  }

  const message = inputText;
  setInputText('');
  setIsLoading(true);

  const newChatMessages = [
    ...chatMessages,
    {
      message: message,
      sender: 'user',
      time: dayjs().valueOf(),
      id: crypto.randomUUID()
    },
    {
      message: (
      <img src={LoadingGif} className="loading-spinner"/>),
      sender: 'robot',
      time: dayjs().valueOf(),
      id: crypto.randomUUID()
    }
  ];

  setChatMessages(newChatMessages);

  const response = await Chatbot.getResponseAsync(message);

  setChatMessages([
    ...newChatMessages.slice(0, -1),
    {
      message: response,
      sender: 'robot',
       time: dayjs().valueOf(),
      id: crypto.randomUUID()
    }
  ]);

  setIsLoading(false);
}
  
        return (
          <div className="chat-input-container">
            <input placeholder={chatMessages.length === 0 ? "Welcome to the chatbot project! Send a message using the textbox." : "Send a message to chat..."}
            size="30"
            onChange={saveInputText}
            value={inputText}
            className="chat-input"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
              sendMessage();
            }
              if (event.key === 'Escape') {
              setInputText("");
            }
          }}
            />
            <button 
            onClick={sendMessage}
            className="send-button"
            >Send</button>
            <button onClick={() => setChatMessages([])}
              className="clear-button">
              Clear
            </button>
          </div>
        );
      }
