const GET_ALL_TWEETS = 'tweet/getAllTweets';
const ADD_TWEET = 'tweet/addTweet'

//regular action creator
const loadTweets = (tweets) => {
  return {
    type: GET_ALL_TWEETS,
    tweets
  };
};

// thunk action creator
export const getAllTweets = () => async (dispatch) => {
  const response = await fetch('/api/tweets');

  if (response.ok) {
    const data = await response.json();

    dispatch(loadTweets(data));
    return data;
  }
};

// Add new tweet to Redux store (regular action creator)
const addTweet = (tweet) => {
  return {
    type: ADD_TWEET,
    tweet
  }
}

// POST new tweet (thunk action creator)
export function postTweet(tweet) {
  return async function thunk(dispatch) {
    const respone = await fetch('/api/tweets', {
      method: 'POST',
      body: JSON.stringify(tweet),
      headers: {'Content-Type': 'application/json'}
    })

    if(respone.ok) {
      const data = await respone.json()
      dispatch(addTweet(data))
      return data
    }
  }
}

// state object
const initialState = {};

// reducer
const tweetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TWEETS: {
      const newState = {};
      action.tweets.forEach((tweet) => (newState[tweet.id] = tweet));
      return newState;
    }
    case ADD_TWEET: {
      console.log('ACTION', action)
      const newState = {...state}
      newState[action.tweet.id] = action.tweet
      return newState
    }
    default:
      return state;
  }
};

export default tweetsReducer;
