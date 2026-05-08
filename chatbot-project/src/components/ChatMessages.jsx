     import { useRef, useEffect } from 'react'
     import { ChatMessage } from './ChatMessage';
     import './ChatMessages.css'
     

    function useAutoScroll(dependencies) {
            const ref = useRef(null);
            useEffect(() => {
                const containerElem = ref.current;
                if (containerElem) {
                containerElem.scrollTop = containerElem.scrollHeight;
                }
            }, dependencies);

            return ref;
            }  
       
     function ChatMessages({ chatMessages }){
            const chatMessagesRef = useAutoScroll([chatMessages]);
            
            return (
              <div 
                className="chat-messages-container"
                ref={chatMessagesRef}
                >
             {chatMessages.map((chatMessage) => {
                return (
                  <ChatMessage 
                    message={chatMessage.message}
                    sender={chatMessage.sender}
                    time={chatMessage.time}
                    key={chatMessage.id}
                  />
                );
                })}
                </div>
            );
      } 

      export default ChatMessages;