import classes from './Profile.module.css';
import TopBar from '../../components/topbar/TopBar';
import SideBar from '../../components/sidebar/SideBar';
import RightBar from '../../components/rightbar/RightBar';
import Feed from '../../components/feed/Feed';
import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'

const Profile = () => {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const [user, setUser] = useState({});
   const username = useParams().username;

   useEffect(() => {
      const fetchUser = async () => {
         const res = await axios.get(`/users?username=${username}`);
         setUser(res.data);
      };
      fetchUser();
   }, [username]);

   return (
      <Fragment>
         <TopBar />
         <div className={classes.profile}>
            <SideBar />
            <div className={classes.profileRight}>
               <div className={classes.profileRightTop}>
                  <div className={classes.profileCover}>
                     <img
                        className={classes.profileCoverImg}
                        src={
                           user.coverPicture
                              ? PF + user.coverPicture
                              : PF + 'person/noCover.png'
                        }
                        alt=""
                     />
                     <img
                        className={classes.profileUserImg}
                        src={
                           user.profilePicture
                              ? PF + user.profilePicture
                              : PF + 'person/noAvatar.png'
                        }
                        alt=""
                     />
                  </div>
                  <div className={classes.profileInfo}>
                     <h4 className={classes.profileInfoName}>
                        {user.username}
                     </h4>
                     <span className={classes.profileInfoDesc}>
                        {user.desc}
                     </span>
                  </div>
               </div>
               <div className={classes.profileRightBottom}>
                  <Feed username={username} />
                  <RightBar user={user} />
               </div>
            </div>
         </div>
      </Fragment>
   );
};

export default Profile;
