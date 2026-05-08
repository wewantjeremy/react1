    import RobotProfileImage from '../assets/robot.png'
    //import UserProfileImage from '../assets/user.png'
    import UserProfileImage from '../assets/zhane.png'
    import './CHatMessage.css';
    import dayjs from 'dayjs'

    export function ChatMessage({ message, sender, time }) {
        
          return(
          <div className={sender === 'user' 
          ? 'chat-message-user' 
          : 'chat-message-robot'
          }>
            {sender === 'robot' && (
              <img src={RobotProfileImage} className="chat-message-profile" />
            )}
            <div className="chat-message-text">
            <div>  {message}
            </div>
            <div className="time">
            {dayjs(time).format('h:mma') }
            </div></div>
            {sender === 'user' && (
              <img src={UserProfileImage}  className="chat-message-profile-user" />
              
                
            )}
          </div>
          
        );
      }