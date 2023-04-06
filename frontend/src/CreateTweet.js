import { useState } from "react";
import { useDispatch } from "react-redux";
import { postTweet } from "./store/tweet";

const CreateTweet = () => {

    const [title, setTitle] = useState('')
    const dispatch = useDispatch()

    const onSubmit = async (e) => {
        e.preventDefault()

        const tweet = {
            message: title
        }

        const response = await dispatch(postTweet(tweet))
        console.log('ressssss', response)
        if(response) {
            setTitle('')
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="tweet-add">Add tweet:</label>
                <input id="tweet-add" value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <button>Submit</button>
            </form>
        </div>
    )
};

export default CreateTweet;
