import { Route, Routes, NavLink, Link } from 'react-router-dom';
import Navigation from "./components/Navigation"
import './MainPage.css'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faCrown, faD } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faDiscord, faYoutube, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons'
import EventCard from './components/EventCard';
import { useDispatch, useSelector } from 'react-redux';
import { getTop10, get20More } from './store/leaderboard'
import Footer from './components/Footer';

const playerdata = {
    players: [
        { nick: 'xDepcio', points: 1745 },
        { nick: 'Kajtoszek', points: 1567 },
        { nick: 'Mat', points: 1432 },
        { nick: 'xDepcio', points: 1745 },
        { nick: 'xDepcio', points: 1745 },
        { nick: 'xDepcio', points: 1745 },
        { nick: 'xDepcio', points: 1745 },
        { nick: 'xDepcio', points: 1745 },
        { nick: 'xDepcio', points: 1745 },
        { nick: 'xDepcio', points: 1745 },
    ],
    guilds: [
        { nick: 'TWIX', points: 2100 },
        { nick: 'BASE', points: 1964 },
        { nick: 'TWIX', points: 2100 },
        { nick: 'TWIX', points: 2100 },
        { nick: 'TWIX', points: 2100 },
    ]
}

const eventsData = [
    {
        offset: '37%',
        day: 1,
        title: 'Event pierożki',
        description: 'Podczas tego eventu po zabicu graczy istnieje szansa 20% na wypadnięcie pierożka',
        imageUrl: 'https://lh3.googleusercontent.com/NESNHDRt69Jmx-CcF9EaniFVfvfFL8RABjl3m3H8wHcjXvwUS62_DvraG_I4kKz5SERAO6WQJEDwPglKMNREmKmQXE1CnhzrCvU=s400'
    },
    {
        offset: '11.15%',
        day: 2,
        title: 'Event PVP',
        description: 'Podczas tego eventu po zabicu graczy istnieje szansa 20% na wypadnięcie pierożka',
        imageUrl: 'https://lh3.googleusercontent.com/NESNHDRt69Jmx-CcF9EaniFVfvfFL8RABjl3m3H8wHcjXvwUS62_DvraG_I4kKz5SERAO6WQJEDwPglKMNREmKmQXE1CnhzrCvU=s400'
    },
    {
        offset: '-14.7%',
        day: 3,
        title: 'Event Parkour',
        description: 'Podczas tego eventu po zabicu graczy istnieje szansa 20% na wypadnięcie pierożka',
        imageUrl: 'https://lh3.googleusercontent.com/NESNHDRt69Jmx-CcF9EaniFVfvfFL8RABjl3m3H8wHcjXvwUS62_DvraG_I4kKz5SERAO6WQJEDwPglKMNREmKmQXE1CnhzrCvU=s400'
    },
    {
        offset: '-40.55%',
        day: 4,
        title: 'Event pierożki',
        description: 'Podczas tego eventu po zabicu graczy istnieje szansa 20% na wypadnięcie pierożka',
        imageUrl: 'https://lh3.googleusercontent.com/NESNHDRt69Jmx-CcF9EaniFVfvfFL8RABjl3m3H8wHcjXvwUS62_DvraG_I4kKz5SERAO6WQJEDwPglKMNREmKmQXE1CnhzrCvU=s400'
    },
    {
        offset: '-66.4%',
        day: 5,
        title: 'Event pierożki',
        description: 'Podczas tego eventu po zabicu graczy istnieje szansa 20% na wypadnięcie pierożka',
        imageUrl: 'https://lh3.googleusercontent.com/NESNHDRt69Jmx-CcF9EaniFVfvfFL8RABjl3m3H8wHcjXvwUS62_DvraG_I4kKz5SERAO6WQJEDwPglKMNREmKmQXE1CnhzrCvU=s400'
    },
    {
        offset: '-92.25%',
        day: 6,
        title: 'Event pierożki',
        description: 'Podczas tego eventu po zabicu graczy istnieje szansa 20% na wypadnięcie pierożka',
        imageUrl: 'https://lh3.googleusercontent.com/NESNHDRt69Jmx-CcF9EaniFVfvfFL8RABjl3m3H8wHcjXvwUS62_DvraG_I4kKz5SERAO6WQJEDwPglKMNREmKmQXE1CnhzrCvU=s400'
    }
]

function MainPage() {

    const dispatch = useDispatch()
    const leaderboardList = useSelector((state) => state.leaderboard);

    const [data, setData] = useState(leaderboardList.players ? leaderboardList.players.slice(0, 10) : undefined)
    const [additionalClass, setAdditionalClass] = useState('into-load')
    const [cardOffset, setCardOffset] = useState('37%')
    const [selectedEvent, setSelectedEvent] = useState(1)

    useEffect(async () => {
        setTimeout(() => {
            setAdditionalClass('')
        }, 1000)

        if (leaderboardList.players.length === 0) {
            const res = await dispatch(get20More(1))
            const re2 = await dispatch(get20More(2))
            const re3 = await dispatch(get20More(3))
            // console.log('res', res)
        }
        // const res = await fetch('http://localhost:8000/api/leaderboards/top')
        // console.log('res', await res.json())

    }, [])

    useEffect(() => {
        setData(leaderboardList.players ? leaderboardList.players.slice(0, 10) : undefined)
        // console.log('datacahgned:', data)
    }, [leaderboardList])

    // console.log('offset', cardOffset)
    // console.log('leaderboardList', leaderboardList)
    // console.log('data:::', data)

    return (
        <>
            <div className={`main-info-wrapper ${additionalClass}`}>
                <div className="main-image">
                    <img src="/images/logo.png"></img>
                </div>
                <div className="main-info-content">
                    <div className="main-info-content--ip">TEST<span>MC</span>.PL</div>
                    <div className="main-info-content--slogan">Największy serwer w Polsce</div>
                    <div className="main-info-content--button-wrapper">
                        <Link to={'/shop'}>
                            <button>Sklep
                                <FontAwesomeIcon className='main-cart-icon' icon={faCartShopping} />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={`main-leaderboard-table ${additionalClass}`}>
                <div className="ranking-type-selector">
                    <ul className='ranking-type-ul'>
                        <li className='ranking-type-li' onClick={() => setData(leaderboardList.players.slice(0, 10))}>Gracze</li>
                        <li className='ranking-type-li' onClick={() => setData(leaderboardList.guilds.slice(0, 10))}>Gildie</li>
                    </ul>
                </div>
                <div className="ranking-actual-table">
                    <h2 className='what-board-header'>Top 10 {data === leaderboardList.players ? 'Graczy' : 'Gildi'}</h2>
                    {data && (data.map((ele, i) => {
                        // console.log('eloelo')
                        return (
                            <div className='single-row-in-table' key={i}>
                                <div style={{ fontSize: i === 9 ? 35 : '' }} className='in-table-rank'>{i + 1}</div>
                                <Link className='name-link' to={`/leaderboards/${ele.nickname ? ele.nickname : ele.name}`}>
                                    <div className='player-image'>
                                        <div style={{ backgroundImage: `url(https://minotar.net/avatar/${ele.nickname}/50)` }}>

                                        </div>
                                    </div>
                                </Link>
                                <Link className='name-link' to={`/leaderboards/${ele.nickname ? ele.nickname : ele.name}`}>
                                    <div className='in-table-nick'>
                                        {ele.nickname ? ele.nickname : ele.name}
                                        {i == 0 && <FontAwesomeIcon className='top-1-icon' icon={faCrown} />}
                                    </div>
                                </Link>
                                <div className='in-table-points'>{Math.floor(ele.points)} pkt.</div>
                            </div>
                        )
                    }))}
                </div>
            </div>
            <div className='events-tag-wrapper'>
                <h2>Eventy Serwerowe</h2>
            </div>
            <div className='events-outer-wrapper'>
                <div style={{ left: cardOffset }} className='events-inner-wrapper'>
                    {eventsData.map((ele) => {
                        return <EventCard
                            key={ele.day}
                            day={ele.day}
                            description={ele.description}
                            title={ele.title}
                            imageUrl={ele.imageUrl}
                            selected={selectedEvent}
                            onClick={() => {
                                setCardOffset(ele.offset)
                                setSelectedEvent(ele.day)
                            }} />
                    })}
                </div>
            </div>
        </>
    )
}


export default MainPage
