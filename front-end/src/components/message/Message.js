import classes from './Message.module.css';
import moment from 'moment';

const Message = ({ message, own }) => {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   return (
      <div className={`${classes.message} ${own ? classes.own : ''}`}>
         <div className={classes.messageTop}>
            <img
               className={classes.messageImg}
               src={PF + 'person/1.jpeg'}
               alt=""
            />
            <p className={classes.messageText}>{message.text}</p>
         </div>
         <div className={classes.messageBottom}>
            {moment(message.createdAt).startOf('hour').fromNow()}
         </div>
      </div>
   );
};

export default Message;
