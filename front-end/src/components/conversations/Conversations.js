import axios from 'axios';
import { useEffect, useState } from 'react';
import classes from './Conversations.module.css';

const Conversations = ({ conversation, currentUser }) => {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const [user, setUser] = useState(null);

   useEffect(() => {
      const friendId = conversation.members.find((m) => m !== currentUser._id);
      const getUser = async () => {
         try {
            const res = await axios.get('/users?userId=' + friendId);
            setUser(res.data);
         } catch (error) {
            console.log(error);
         }
      };
      getUser();
   }, [currentUser, conversation]);

   return (
      <div className={classes.conversation}>
         <img
            className={classes.conversationImg}
            src={
               user?.profilePicture
                  ? PF + user.profilePicture
                  : PF + 'person/noAvatar.png'
            }
            alt=""
         />
         <span className={classes.conversationName}>{user?.username}</span>
      </div>
   );
};

export default Conversations;
