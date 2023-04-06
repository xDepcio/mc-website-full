import CreateTweet from './CreateTweet';
import TweetList from './TweetList';
import MainPage from './MainPage';
import {Route, Routes} from 'react-router-dom'
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import { useEffect, useState } from 'react';
import LeaderboardsPage from './components/LeaderboardsPage';
import SingleRankPlayer from './components/SingleRankPlayer';
import SingleRankGuild from './components/SingleRankGuild';
import { useSelector } from 'react-redux';
import SingleRank from './components/SingleRank';
import LoadPage from './components/LoadPage';
import ShopPage from './components/ShopPage';
import PaySuccess from './components/PaySuccess'
import Terms from './components/Terms';

function App() {

  // const searchResult = useSelector((state) => state.leaderboard.searchResult)
  // console.log('SER::::', searchResult)
  // const [searchElement, setSearchElement] = useState(<SingleRankPlayer />)
  // console.log('searchElement', searchElement)

  // useEffect(() => {
  //   if(searchResult) {
  //     setSearchElement(searchResult.isPlayer ? <SingleRankPlayer /> : <SingleRankGuild />)
  //   }
  // }, [searchResult])

  return (
    <>
      <Navigation />
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route exact path='/leaderboards' element={<LeaderboardsPage />} />
        <Route exact path='/leaderboards/:searchName' element={<SingleRank />} />
        <Route exact path='/shop' element={<ShopPage />} />
        <Route exact path='/success' element={<PaySuccess />} />
        <Route exact path='/terms' element={<Terms />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
