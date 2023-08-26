import { NavLink } from 'react-router-dom'
import './Navigation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

function Navigation() {
    const [navScrolled, setNavScrolled] = useState('')
    const [onlineNum, setOnlineNum] = useState(1912)

    useEffect(() => {
        const scrollInterval = setInterval(() => {
            // console.log(window.scrollY)
            if (window.scrollY >= 100) {
                setNavScrolled('nav-scrolled')
            }
            else {
                setNavScrolled('')
            }
        }, 150)
        // const changeOnlineInterval = setInterval(() => {
        //     setOnlineNum(1900 + Math.floor(Math.random()*201))
        // }, 10000)

        return () => {
            clearInterval(scrollInterval)
            // clearInterval(changeOnlineInterval)
        }
    }, [])

    return (
        <div className='nav-outer-wrapper'>
            <div className={`nav-wrapper-main ${navScrolled}`}>
                <nav className='w-[90%] xl:w-[80%] 2xl:w-[63%]'>
                    <div className='logo-wrapper'>
                        <div className='logo-icon'>
                            <img src='https://mc-server-website-nextjs13.vercel.app/images/logo.png'></img>
                        </div>
                        <div className='logo-name'>TEST<span>MC</span>.PL</div>
                        <div className='status-icon-wrapper'>
                            <FontAwesomeIcon className='status-icon' icon={faCircle} />
                        </div>
                        <div className='logo-online whitespace-nowrap'>{onlineNum} online</div>
                    </div>
                    <ul className='main-nav-ul'>
                        <li className='main-nav-li whitespace-nowrap'><NavLink to='/'>Strona główna</NavLink></li>
                        <li className='main-nav-li whitespace-nowrap'><NavLink to='/leaderboards'>Ranking</NavLink></li>
                        <li className='main-nav-li whitespace-nowrap'><NavLink to='/shop'>Sklep</NavLink></li>
                        <li className='main-nav-li whitespace-nowrap'><NavLink to='/terms'>Regulamin</NavLink></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navigation
