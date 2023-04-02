import classes from './CloseFriend.module.css';

const CloseFriend = (props) => {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   return (
      <li className={classes.sidebarFriend}>
         <img
            className={classes.sidebarFriendImg}
            src={PF + props.user.profilePicture}
            alt=""
         />
         <span className={classes.sidebarFriendName}>
            {props.user.username}
         </span>
      </li>
   );
};

export default CloseFriend;
