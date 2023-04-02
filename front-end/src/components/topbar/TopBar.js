import classes from './TopBar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Person, Chat, Notifications } from '@mui/icons-material';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const TopBar = () => {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
   const navigate = useNavigate();

   const { user } = useContext(AuthContext);
   return (
      <div className={classes.topbarContainer}>
         <div className={classes.topbarLeft}>
            <Link to="/" style={{ textDecoration: 'none' }}>
               <span className={classes.logo}>Lamasocial</span>
            </Link>
         </div>
         <div className={classes.topbarCenter}>
            <div className={classes.searchbar}>
               <Search className={classes.searchIcon} />
               <input
                  placeholder="Search for friend, post or video"
                  className={classes.searchInput}
               />
            </div>
         </div>
         <div className={classes.topbarRight}>
            <div className={classes.topbarLinks}>
               <span className={classes.topbarLink}>Homepage</span>
               <span className={classes.topbarLink}>Timeline</span>
            </div>
            <div className={classes.topbarIcons}>
               <div
                  className={classes.topbarIconItem}
                  onClick={() => navigate(`/profile/${user.username}`)}
               >
                  <Person />
                  <span className={classes.topbarIconBadge}>1</span>
               </div>
               <div
                  className={classes.topbarIconItem}
                  onClick={() => navigate('/messenger')}
               >
                  <Chat />
                  <span className={classes.topbarIconBadge}>2</span>
               </div>
               <div className={classes.topbarIconItem}>
                  <Notifications />
                  <span className={classes.topbarIconBadge}>1</span>
               </div>
            </div>
            <Link to={`/profile/${user.username}`}>
               <img
                  src={
                     user.profilePicture
                        ? PF + user.profilePicture
                        : PF + 'person/noAvatar.png'
                  }
                  alt=""
                  className={classes.topbarImg}
               />
            </Link>
         </div>
      </div>
   );
};

export default TopBar;
