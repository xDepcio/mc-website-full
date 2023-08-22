import { faFacebook, faDiscord, faYoutube, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Footer() {

    const location = useLocation()

    useEffect(() => {
        // console.log('link cahnged')
        // console.log(window.scrollY, '==========')
        window.scroll({
            top: 0,
            left: 0,
            // behavior: 'smooth'
        })
    }, [location])

    return (
        <div className='footer-wrapper'>
            <div className='upper-footer'>
                <div className='left-upper-footer'>
                    <img src='/images/logo.png'></img>
                    <div className='left-upper-footer--info'>
                        <div className="left-upper-footer--ip">TEST<span>MC</span>.PL</div>
                        <div className="left-upper-footer--slogan">Największy serwer w Polsce</div>
                    </div>
                </div>
                <div className='right-upper-footer'>
                    <h3>Dołącz do nas na</h3>
                    <ul>
                        <li>Discord <FontAwesomeIcon icon={faDiscord} /></li>
                        <li>Fecebook <FontAwesomeIcon icon={faFacebook} /></li>
                        <li>TikTok <FontAwesomeIcon icon={faTiktok} /></li>
                        <li>YouTube <FontAwesomeIcon icon={faYoutube} /></li>
                        <li>Instagram <FontAwesomeIcon icon={faInstagram} /></li>
                    </ul>
                </div>
                <div className='upper-footer-nav'>
                    <ul>
                        <Link to={'/'}><li>Strona główna</li></Link>
                        <Link to={'/leaderboards'}><li>Ranking</li></Link>
                        <Link to={'/shop'}><li>Sklep</li></Link>
                        <Link to={'/terms'}><li>Regulamin</li></Link>
                        {/* <li>Strona główna</li>
                        <li>Ranking</li>
                        <li>Sklep</li>
                        <li>Regulamin</li> */}
                    </ul>
                </div>
            </div>
            <div className='lower-footer'>
                <div>TESTMC.PL - Wszystkie prawa obsarane 2022 ©</div>
                <div>Created By: <span>Norbi Gierczak</span></div>
            </div>
        </div>
    )
}

export default Footer
