import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import './ErrorPage.css'


function ErrorPage({message}) {
    const navigate = useNavigate()

    return (
        <div className="error-page-outer-wrapper">
            <div className="error-page-content">
                <p className='main-error-info'>Wystąpił problem <p className='sad-face-error'>:(</p></p>
                <p className="error-message-field">{message}</p>
                <div className='error-nav-wrapper'>
                    <button onClick={() => navigate('/')}>
                        <FontAwesomeIcon className='arrow-back-error' icon={faArrowCircleLeft} />{' Wroć na stronę główną'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
