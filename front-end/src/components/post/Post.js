import classes from './Post.module.css';
import { MoreVert } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext';

const Post = (props) => {
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

   const { user: currentUser } = useContext(AuthContext);

   const [like, setLike] = useState(props.post.likes.length);
   const [isLiked, setIsLiked] = useState(false);
   const [user, setUser] = useState({});

   useEffect(() => {
      setIsLiked(props.post.likes.includes(currentUser._id));
   }, [currentUser._id, props.post.likes]);

   const likeHandler = async () => {
      try {
         await axios.put('/posts/' + props.post._id + '/like', {
            userId: currentUser._id,
         });
      } catch (error) {}
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
   };

   useEffect(() => {
      const fetchUser = async () => {
         const res = await axios.get(`/users?userId=${props.post.userId}`);
         setUser(res.data);
      };
      fetchUser();
   }, [props.post.userId]);

   return (
      <div className={classes.post}>
         <div className={classes.postWrapper}>
            <div className={classes.postTop}>
               <div className={classes.postTopLeft}>
                  <Link to={`/profile/${user.username}`}>
                     <img
                        className={classes.postProfileImg}
                        src={
                           user.profilePicture
                              ? PF + user.profilePicture
                              : PF + 'person/noAvatar.png'
                        }
                        alt=""
                     />
                  </Link>
                  <span className={classes.postUsername}>{user.username}</span>
                  <span className={classes.postDate}>
                     {moment(props.post.createdAt).startOf('hour').fromNow()}
                  </span>
               </div>
               <div className={classes.postTopRight}>
                  <MoreVert />
               </div>
            </div>
            <div className={classes.postCenter}>
               <span className={classes.postText}>{props.post?.desc}</span>
               <img
                  className={classes.postImg}
                  src={PF + props.post.img}
                  alt=""
               />
            </div>
            <div className={classes.postBottom}>
               <div className={classes.postBottomLeft}>
                  <img
                     className={classes.likeIcon}
                     src={`${PF}like.png`}
                     onClick={likeHandler}
                     alt=""
                  />
                  <img
                     className={classes.likeIcon}
                     src={`${PF}heart.png`}
                     onClick={likeHandler}
                     alt=""
                  />
                  <span className={classes.postLikeCounter}>
                     {like} people like it
                  </span>
               </div>
               <div className={classes.postBottomRight}>
                  <span className={classes.postCommentText}>
                     {props.post.comment} comments
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Post;
