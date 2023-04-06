import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getEntry, getGuildStats, getPlayerKills, getPlayerStats } from "../store/leaderboard"
import ErrorPage from "./ErrorPage"
import LoadPage from "./LoadPage"
import SearchField from "./SearchField"
import SingleRankGuild from "./SingleRankGuild"
import SingleRankPlayer from "./SingleRankPlayer"

function SingleRank() {

    const params = useParams()
    const dispatch = useDispatch()
    const searchResult = useSelector((state) => state.leaderboard.searchResult)
    // console.log('SER::::', searchResult)
    const [searchElement, setSearchElement] = useState(<LoadPage />)
    // console.log('searchElement', searchElement)
    // console.log('params', params)

    useEffect(async () => {
        const searchRes = await dispatch(getEntry(params.searchName))
        console.log('searchRes:', searchRes)
        if(searchRes.isPlayer) {
            async function fetchSatats(playerId) {
                const data = await dispatch(getPlayerStats(playerId))
                // console.log('DATA----', data)
            }
            fetchSatats(searchRes.id)
        }
        else {
            async function fetchGuildStats(guildId) {
                const data = await dispatch(getGuildStats(guildId))
            }
            fetchGuildStats(searchRes.id)
        }
    }, [window.location.href])

    useEffect(() => {
      if(searchResult) {
        setSearchElement(
            searchResult.isPlayer ?
                <SingleRankPlayer searchData={searchResult} /> : <SingleRankGuild searchData={searchResult} />
        )
        if(searchResult.error === 'not-found') {
            setSearchElement(<ErrorPage message={searchResult.message} />)
        }
      }
    }, [searchResult])

    return (
        <>
            {searchResult ? searchResult.error !== 'not-found' ? <SearchField variation={'stats'} /> : <></> : <></>}
            {searchElement}
        </>
    )
}

export default SingleRank
