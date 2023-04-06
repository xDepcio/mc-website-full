import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './LeaderboardsPage.css'
import {faSearch, faCrown, faChessBishop} from '@fortawesome/free-solid-svg-icons'
// import data from './dummydata'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {get20More, getEntry} from '../store/leaderboard'
import {Link, useNavigate} from 'react-router-dom'
import SearchField from './SearchField'

function LeaderboardsPage() {
    // console.log('data', data)
    let navigate = useNavigate()

    const dispatch = useDispatch()
    const leaderboardListPlayers = useSelector((state) => state.leaderboard.players);
    const leaderboardListGuilds = useSelector((state) => state.leaderboard.guilds);
    const totalPlayers = useSelector((state) => state.leaderboard.totalPlayers)
    const totalGuilds = useSelector((state) => state.leaderboard.totalGuilds)
    // console.log(leaderboardListPlayers, leaderboardListGuilds)

    const [selectedBoard, setSelectedBoard] = useState('players')
    // const [searchValue, setSearchValue] = useState('')
    const [boardHeader, setBoardHeader] = useState('Topka rankingu graczy')
    const [currentPage, setCurrentPage] = useState(1)
    const [movedToNextPage, setMovedToNextPage] = useState(false)
    const [displayedDataFraction, setDisplayedDataFraction] =
        useState(
            selectedBoard === 'players' ?
                leaderboardListPlayers.slice(10*(currentPage-1), 10*currentPage) :
                leaderboardListGuilds.slice(10*(currentPage-1), 10*currentPage)
            )

    useEffect(() => {
        setDisplayedDataFraction(
            selectedBoard === 'players' ?
            leaderboardListPlayers.slice(10*(currentPage-1), 10*currentPage) :
            leaderboardListGuilds.slice(10*(currentPage-1), 10*currentPage)
        )
    }, [currentPage, selectedBoard])

    useEffect(async () => {
        if(movedToNextPage) {
            if(selectedBoard === 'players' && leaderboardListPlayers.length < totalPlayers) {
                if((currentPage + 1)*10 > leaderboardListPlayers.length && (currentPage)*10 < totalPlayers) {
                    const res = await dispatch(get20More(Math.floor(leaderboardListPlayers.length/10) + 1))
                }
            }
            else if(leaderboardListGuilds.length < totalGuilds) {
                if((currentPage + 1)*10 > leaderboardListGuilds.length && (currentPage)*10 < totalGuilds) {
                    const res = await dispatch(get20More(Math.floor(leaderboardListGuilds.length/10) + 1))
                }
            }
        }
        setMovedToNextPage(false)
    }, [currentPage])

    useEffect(async () => {

        if(leaderboardListPlayers.length === 0 || leaderboardListGuilds.length === 0) {
            const res = await dispatch(get20More(1))
            const re2 = await dispatch(get20More(2))
            const re3 = await dispatch(get20More(3))
            // console.log('res', res)
            setSelectedBoard('guilds')
            setSelectedBoard('players')
        }
        // const res = await fetch('http://localhost:8000/api/leaderboards/top')
        // console.log('res', await res.json())

    }, [])

    // const handleSearchSubmit = async (e) => {
    //     e.preventDefault()

    //     // const searchRes = await dispatch(getEntry(searchValue))
    //     // console.log('searchRes:', searchRes)
    //     navigate(`/leaderboards/${searchValue}`)
    // }

    // console.log(leaderboardListPlayers, leaderboardListGuilds)
    // console.log('displayedDataFraction', displayedDataFraction)
    // console.log(`current page is ${currentPage}`)


    return (
        <div className='leaderboard-page-outer-wrapper'>
            <SearchField />
            {/* <div className='search-ele'>
                <form onSubmit={handleSearchSubmit}>
                    <FontAwesomeIcon className='search-icon' icon={faSearch} />
                    <input placeholder='Szukaj gracza lub gildii...'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}></input>
                </form>
            </div> */}
            <div className="main-leaderboard-wrapper">
                <div className="leaderboard-categories">
                    <ul>
                        <li onClick={() => {
                            setSelectedBoard('players')
                            setBoardHeader('Topka rankingu graczy')
                            setCurrentPage(1)
                            }}>Topka rankingu graczy</li>
                        <li onClick={() => {
                            setSelectedBoard('guilds')
                            setBoardHeader('Topka rankingu gildii')
                            setCurrentPage(1)
                        }}>Topka rankingu gildii</li>
                        <li onClick={() => {
                            setSelectedBoard('players')
                            setBoardHeader('Topka wykopanego kamienia')
                            setCurrentPage(1)
                            }}>Topka wykopanego kamienia</li>
                        <li onClick={() => {
                            setSelectedBoard('players')
                            setBoardHeader('Topka zjedzonych koxów')
                            setCurrentPage(1)
                            }}>Topka zjedzonych koxów</li>
                        <li onClick={() => {
                            setSelectedBoard('players')
                            setBoardHeader('Topka śmierci')
                            setCurrentPage(1)
                            }}>Topka śmierci</li>
                    </ul>
                </div>
                <div className="leaderboard-table-main-page">
                    <div className='in-leaderboard-nav'>
                        <button
                        onClick={() => {
                            setMovedToNextPage(false)
                            setCurrentPage(Math.max(1, currentPage-1))
                        }}
                        className='in-leaderboard-nav--left-button'>{`<< Poprzednia strona`}</button>
                        <h2>{boardHeader}</h2>
                        <button
                        onClick={() => {
                            setMovedToNextPage(true)
                            setCurrentPage(
                                Math.min(
                                    Math.ceil(
                                        selectedBoard === 'players' ?
                                            leaderboardListPlayers.length/10 :
                                            leaderboardListGuilds.length/10
                                        ), currentPage+1
                                    )
                                )
                        }}
                        className='in-leaderboard-nav--right-button'>{`Następna strona >>`}</button>
                    </div>
                    {displayedDataFraction.map((ele, i) => {
                        // console.log('ELE', ele)
                        return (
                            <div className='single-row-in-table--leaderboard-page' key={i}>
                                <div
                                style={{
                                    fontSize: ((currentPage - 1) * 10) + (i + 1) >= 10 ? 35 : '',
                                    marginRight: ((currentPage - 1) * 10) + (i + 1) >= 10 ? `-9px` : ''
                                }}
                                className='in-table-rank--leaderboard-page'>
                                    {((currentPage - 1) * 10) + (i + 1)}
                                </div>
                                <Link className='name-link' to={`/leaderboards/${selectedBoard === 'players' ? ele.nickname : ele.name}`}><div className='player-image--leaderboard-page'>
                                    <div style={{backgroundImage: `url(https://minotar.net/avatar/${ele.nickname}/45)`}}></div>
                                    {/* <img src='https://minotar.net/avatar/d9135e082f2244c89cb0bee234155292/128'></img> */}
                                </div></Link>
                                <Link className='name-link' to={`/leaderboards/${selectedBoard === 'players' ? ele.nickname : ele.name}`}>
                                <div className='in-table-nick--leaderboard-page'>
                                    {ele.nickname ? ele.nickname : ele.name}
                                    {(((currentPage - 1) * 10) + (i + 1)) == 1 && <FontAwesomeIcon className='top-1-icon' icon={faCrown}/>}
                                </div></Link>
                                <div className='in-table-points--leaderboard-page'>{Math.floor(ele.points)} pkt.</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default LeaderboardsPage
