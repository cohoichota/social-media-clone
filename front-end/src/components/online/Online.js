import classes from './Online.module.css';

const Online = (props) => {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

   return (
      <li className={classes.rightbarFriend}>
         <div className={classes.rightbarProfileImgContainer}>
            <img
               className={classes.rightbarProfileImg}
               src={PF + props.user.profilePicture}
               alt=""
            />
            <span className={classes.rightbarOnline}></span>
         </div>
         <span className={classes.rightbarUsername}>{props.user.username}</span>
      </li>
   );
};

export default Online;
