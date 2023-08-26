import { useDispatch } from "react-redux";

const GET_TOP_10 = 'leaderboard/getTop10';
const LOAD_20_MORE = 'leaderboards/get20More'
const LOAD_ENTRY = 'leaderboards/getEntry'
const LOAD_KILLS = 'leaderboards/getPlayerKills'
const LOAD_DEATHS = 'leaderboards/getPlayerDeaths'
const LOAD_GUILD_KILLS = 'leaderboards/getGuildKills'
const LOAD_GUILD_DEATHS = 'leaderboards/getGuildDeaths'

//regular action creator
const loadTop10 = (topPointsData) => {
  return {
    type: GET_TOP_10,
    topPointsData
  };
};

const load20More = (data) => {
  return {
    type: LOAD_20_MORE,
    more20Players: data,
  }
}

const loadEntry = (entryData) => {
  return {
    type: LOAD_ENTRY,
    searchResult: entryData
  }
}

const loadPlayerKills = (data) => {
  return {
    type: LOAD_KILLS,
    kills: data
  }
}

const loadPlayerDeaths = (data) => {
  return {
    type: LOAD_DEATHS,
    deaths: data
  }
}

const loadGuildKills = (data) => {
  return {
    type: LOAD_GUILD_KILLS,
    kills: data
  }
}

const loadGuildDeaths = (data) => {
  return {
    type: LOAD_GUILD_DEATHS,
    deaths: data
  }
}

// thunk action creator
export const getTop10 = () => async (dispatch) => {
  const response = await fetch('https://mc-server-website-nextjs13.vercel.app/api/leaderboards/top');

  if (response.ok) {
    const data = await response.json();

    dispatch(loadTop10(data));
    return data;
  }
};

export const get20More = (currentPage) => async (dispatch) => {
  const response = await fetch(`https://mc-server-website-nextjs13.vercel.app/api/leaderboards?page=${currentPage}`)

  if (response.ok) {
    const data = await response.json();

    dispatch(load20More(data));
    return data;
  }
}

export const getEntry = (name) => async (dispatch) => {
  const response = await fetch(`https://mc-server-website-nextjs13.vercel.app/api/leaderboards/search/${name}`)

  if (response.ok) {
    const data = await response.json();

    // console.log(`seached for name: ${name} and got res: ${data} back`)
    dispatch(loadEntry(data));
    return data;
  }
}

export const getPlayerKills = (id) => async (dispatch) => {
  const response = await fetch(`https://mc-server-website-nextjs13.vercel.app/api/leaderboards/players/${id}/kills`)

  if (response.ok) {
    const data = await response.json();

    dispatch(loadPlayerKills(data));
    return data;
  }

}

export const getPlayerDeaths = (id) => async (dispatch) => {
  const response = await fetch(`https://mc-server-website-nextjs13.vercel.app/api/leaderboards/players/${id}/deaths`)

  if (response.ok) {
    const data = await response.json();

    dispatch(loadPlayerDeaths(data));
    return data;
  }

}

export const getPlayerStats = (id) => async (dispatch) => {
  dispatch(getPlayerDeaths(id))
  dispatch(getPlayerKills(id))
}

// get guild stats
export const getGuildKills = (id) => async (dispatch) => {
  const response = await fetch(`https://mc-server-website-nextjs13.vercel.app/api/leaderboards/guilds/${id}/kills`)

  if (response.ok) {
    const data = await response.json();

    dispatch(loadGuildKills(data));
    return data;
  }

}

export const getGuildDeaths = (id) => async (dispatch) => {
  const response = await fetch(`https://mc-server-website-nextjs13.vercel.app/api/leaderboards/guilds/${id}/deaths`)

  if (response.ok) {
    const data = await response.json();

    dispatch(loadGuildDeaths(data));
    return data;
  }

}

export const getGuildStats = (id) => async (dispatch) => {
  dispatch(getGuildDeaths(id))
  dispatch(getGuildKills(id))
}

// Add new tweet to Redux store (regular action creator)
// const addTweet = (tweet) => {
//   return {
//     type: ADD_TWEET,
//     tweet
//   }
// }

// POST new tweet (thunk action creator)
// export function postTweet(tweet) {
//   return async function thunk(dispatch) {
//     const respone = await fetch('https://mc-server-website-nextjs13.vercel.app/api/tweets', {
//       method: 'POST',
//       body: JSON.stringify(tweet),
//       headers: {'Content-Type': 'application/json'}
//     })

//     if(respone.ok) {
//       const data = await respone.json()
//       dispatch(addTweet(data))
//       return data
//     }
//   }
// }

// state object
const initialState = { players: [], guilds: [] };

// reducer
const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOP_10: {
      const newState = { ...state };
      // console.log('action.topPointsData', action.topPointsData)
      const { players, guilds } = action.topPointsData
      // console.log('DATA', players, guilds)
      newState.players = players
      newState.guilds = guilds.map((ele) => {
        return {
          points: ele.avgPoints,
          name: ele.Guild.name
        }
      })
      return newState;
    }
    case LOAD_20_MORE: {
      const newState = { ...state }
      const { players, guilds, totalPlayers, totalGuilds } = action.more20Players
      newState.players = [...newState.players, ...players]
      newState.guilds = [...newState.guilds, ...guilds.map((ele) => {
        console.log(ele)
        return {
          points: ele.avgPoints,
          name: ele.Guild.name
        }
      })]
      newState.totalPlayers = totalPlayers
      newState.totalGuilds = totalGuilds
      // console.log('NEWSTATE', newState)
      return newState
    }
    case LOAD_ENTRY: {
      const newState = { ...state }
      newState.searchResult = action.searchResult
      // console.log('NEW STATICK', newState)
      return newState
    }
    case LOAD_KILLS: {
      const newState = { ...state }
      newState.kills = action.kills
      // console.log('NEWSTA IS====', newState)
      return newState
    }
    case LOAD_DEATHS: {
      const newState = { ...state }
      newState.deaths = action.deaths
      // console.log('NEWSTA IS====', newState)
      return newState
    }
    case LOAD_GUILD_KILLS: {
      const newState = { ...state }
      newState.guildKills = action.kills
      return newState
    }
    case LOAD_GUILD_DEATHS: {
      const newState = { ...state }
      newState.guildDeaths = action.deaths
      return newState
    }
    default:
      return state;
  }
};

export default leaderboardReducer;
