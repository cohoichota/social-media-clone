import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversations from '../../components/conversations/Conversations';
import Message from '../../components/message/Message';
import TopBar from '../../components/topbar/TopBar';
import { AuthContext } from '../../context/AuthContext';
import classes from './Messenger.module.css';
import axios from 'axios';
import { io } from 'socket.io-client';

const Messenger = () => {
   const [conversations, setConversations] = useState([]);
   const [currentChat, setCurrentChat] = useState(null);
   const [messages, setMessages] = useState([]);
   const [newMessage, setNewMessage] = useState([]);
   const [onlineUser, setOnlineUser] = useState([]);

   const scrollRef = useRef();

   const { user } = useContext(AuthContext);

   const socket = useRef();
   const [arrivalMessage, setArrivalMessage] = useState(null);
   useEffect(() => {
      socket.current = io('ws://localhost:8900');
      socket.current.on('getMessage', (data) => {
         setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now(),
         });
      });
   }, []);
   useEffect(() => {
      arrivalMessage &&
         currentChat?.members.includes(arrivalMessage.sender) &&
         setMessages((prev) => [...prev, arrivalMessage]);
   }, [arrivalMessage, currentChat]);
   useEffect(() => {
      socket.current.emit('addUser', user._id);
      socket.current.on('getUsers', (users) => {
         setOnlineUser(
            user.followings.filter((f) => users.some((u) => u.userId === f))
         );
      });
   }, [user]);

   useEffect(() => {
      const getConversations = async () => {
         try {
            const res = await axios.get('/conversations/' + user._id);
            setConversations(res.data);
         } catch (error) {
            console.log(error);
         }
      };
      getConversations();
   }, [user._id]);

   useEffect(() => {
      const getMessages = async () => {
         try {
            const res = await axios.get('/messages/' + currentChat?._id);
            setMessages(res.data);
         } catch (error) {
            console.log(error);
         }
      };
      getMessages();
   }, [currentChat]);

   const submitHandler = async (event) => {
      event.preventDefault();
      const message = {
         sender: user._id,
         text: newMessage,
         conversationId: currentChat._id,
      };

      const receiverId = currentChat.members.find(
         (member) => member !== user._id
      );
      socket.current.emit('sendMessage', {
         senderId: user._id,
         receiverId: receiverId,
         text: newMessage,
      });

      try {
         const res = await axios.post('/messages', message);
         setMessages([...messages, res.data]);
         setNewMessage('');
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   return (
      <Fragment>
         <TopBar />
         <div className={classes.messenger}>
            <div className={classes.chatMenu}>
               <div className={classes.chatMenuWrapper}>
                  <input
                     placeholder="Search for friends"
                     className={classes.checkMenuInput}
                  ></input>
                  {conversations.map((c) => (
                     <div onClick={() => setCurrentChat(c)} key={c._id}>
                        <Conversations conversation={c} currentUser={user} />
                     </div>
                  ))}
               </div>
            </div>
            <div className={classes.chatBox}>
               <div className={classes.chatBoxWrapper}>
                  {currentChat ? (
                     <Fragment>
                        <div className={classes.chatBoxTop}>
                           {messages.map((m) => (
                              <div ref={scrollRef} key={m._id}>
                                 <Message
                                    message={m}
                                    own={m.sender === user._id}
                                 />
                              </div>
                           ))}
                        </div>
                        <div className={classes.chatBoxBottom}>
                           <textarea
                              className={classes.chatMessageInput}
                              placeholder="write something..."
                              onChange={(e) => setNewMessage(e.target.value)}
                              value={newMessage}
                           ></textarea>
                           <button
                              className={classes.chatSubmitButton}
                              onClick={submitHandler}
                           >
                              Send
                           </button>
                        </div>
                     </Fragment>
                  ) : (
                     <span className={classes.noConversationText}>
                        Open a conversation to start a chat.
                     </span>
                  )}
               </div>
            </div>
            <div className={classes.chatOnline}>
               <div className={classes.chatOnlineWrapper}>
                  <ChatOnline
                     onlineUser={onlineUser}
                     currentId={user._id}
                     setCurrentChat={setCurrentChat}
                  />
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default Messenger;
