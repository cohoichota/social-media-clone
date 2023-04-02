import classes from './RightBar.module.css';
import Online from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Users } from '../../dummyData';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';

const RightBar = ({ user }) => {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const [friends, setFriends] = useState([]);
   const { user: currentUser, dispatch } = useContext(AuthContext);
   const [followed, setFollowed] = useState(
      currentUser.followings.includes(user?._id)
   );

   useEffect(() => {
      if (user?._id) {
         const getFriends = async () => {
            try {
               const friendList = await axios.get('/users/friends/' + user._id);
               setFriends(friendList.data);
            } catch (error) {
               console.log(error);
            }
         };
         getFriends();
      }
   }, [user]);

   const followHandler = async () => {
      try {
         if (followed) {
            await axios.put(`/users/${user._id}/unfollow`, {
               userId: currentUser._id,
            });
            dispatch({ type: 'UNFOLLOW', payload: user._id });
         } else {
            await axios.put(`/users/${user._id}/follow`, {
               userId: currentUser._id,
            });
            dispatch({ type: 'FOLLOW', payload: user._id });
         }
         setFollowed(!followed);
      } catch (error) {
         console.log(error);
      }
   };

   const HomeRightbar = () => {
      return (
         <>
            <div className={classes.birthdayContainer}>
               <img
                  className={classes.birthdayImg}
                  src="assets/gift.png"
                  alt=""
               />
               <span className={classes.birthdayText}>
                  <b>Pola Foster</b> and <b>3 other friends</b> have a birthday
                  today.
               </span>
            </div>
            <img className={classes.rightbarAd} src="assets/ad.png" alt="" />
            <h4 className={classes.rightbarTitle}>Online Friends</h4>
            <ul className={classes.rightbarFriendList}>
               {Users.map((u) => (
                  <Online key={u.id} user={u} />
               ))}
            </ul>
         </>
      );
   };

   const ProfileRightbar = () => {
      return (
         <>
            {user.username !== currentUser.username && (
               <button
                  className={classes.rightbarFollowButton}
                  onClick={followHandler}
               >
                  {followed ? 'Unfollow' : 'Follow'}
                  {followed ? <Remove /> : <Add />}
               </button>
            )}
            <h4 className={classes.rightbarTitle}>User information</h4>
            <div className={classes.rightbarInfo}>
               <div className={classes.rightbarInfoItem}>
                  <span className={classes.rightbarInfoKey}>City:</span>
                  <span className={classes.rightbarInfoValue}>{user.city}</span>
               </div>
               <div className={classes.rightbarInfoItem}>
                  <span className={classes.rightbarInfoKey}>From:</span>
                  <span className={classes.rightbarInfoValue}>{user.from}</span>
               </div>
               <div className={classes.rightbarInfoItem}>
                  <span className={classes.rightbarInfoKey}>Relationship:</span>
                  <span className={classes.rightbarInfoValue}>
                     {user.relationship === 1
                        ? 'Single'
                        : user.relationship === 2
                        ? 'Married'
                        : '-'}
                  </span>
               </div>
            </div>
            <h4 className={classes.rightbarTitle}>User friends</h4>
            <div className={classes.rightbarFollowings}>
               {friends.map((friend) => (
                  <Link
                     to={'/profile/' + friend.username}
                     style={{ textDecoration: 'none' }}
                     key={friend.username}
                  >
                     <div className={classes.rightbarFollowing}>
                        <img
                           src={
                              friend.profilePicture
                                 ? PF + friend.profilePicture
                                 : PF + 'person/noAvatar.png'
                           }
                           alt=""
                           className={classes.rightbarFollowingImg}
                        />
                        <span className={classes.rightbarFollowingName}>
                           {friend.username}
                        </span>
                     </div>
                  </Link>
               ))}
            </div>
         </>
      );
   };
   return (
      <div className={classes.rightbar}>
         <div className={classes.rightbarWrapper}>
            {user ? <ProfileRightbar /> : <HomeRightbar />}
         </div>
      </div>
   );
};

export default RightBar;
