import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getEntry } from "../store/leaderboard"

function SearchField({variation}) {

    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState('')
    const dispatch = useDispatch()

    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        setSearchValue('')
        const searchRes = await dispatch(getEntry(searchValue))
        console.log('searchRes:', searchRes)
        // const searchRes = await dispatch(getEntry(searchValue))
        // console.log('searchRes:', searchRes)
        navigate(`/leaderboards/${searchValue}`)
    }

    return (
        <div style={{
            marginTop: variation === 'stats' ? '50px' : ''
        }}
        className='search-ele'>
            <form style={{
            width: variation === 'stats' ? '44%' : ''
            }}
            onSubmit={handleSearchSubmit}>
                <FontAwesomeIcon className='search-icon' icon={faSearch} />
                <input placeholder='Szukaj gracza lub gildii...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}></input>
            </form>
        </div>
    )
}

export default SearchField
