import classes from './Home.module.css';
import TopBar from '../../components/topbar/TopBar';
import SideBar from '../../components/sidebar/SideBar';
import RightBar from '../../components/rightbar/RightBar';
import Feed from '../../components/feed/Feed';

const Home = () => {
   return (
      <>
         <TopBar />
         <div className={classes.homeContainer}>
            <SideBar />
            <Feed />
            <RightBar />
         </div>
      </>
   );
};

export default Home;
