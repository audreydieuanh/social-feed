import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { supabase } from '../client';
import './Post.css'



const Post = (props) => {
    const [time, setTime] = useState('');
    const [upvotes, setUpvotes] = useState(props.upvotes);

    const updateUpvotes = async (event) => {
        event.preventDefault();
        try {
            const { error } = await supabase
                .from('Posts')
                .update({ upvotes: props.upvotes + 1 })
                .eq('id', props.id);

            if (error) {
                throw error;
            }
            setUpvotes(upvotes + 1);
        } catch (error) {
            console.error("Error updating post: ", error);
        }
    }

    useEffect(() => {
        const calculateTime = () => {
            const postDate = new Date(props.created_at);
            const currentDate = new Date();

            const diff = currentDate - postDate;
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            let time = '';
            if (days > 0) {
                time = `${days} day${days > 1 ? 's' : ''} ago`;
            } else if (hours > 0) {
                time = `${hours} hour${hours > 1 ? 's' : ''} ago`;
            } else if (minutes > 0) {
                time = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
            } else {
                time = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
            }
            setTime(time);
        }
        calculateTime();

        const interval = setInterval(calculateTime, 60000);

        return () => clearInterval(interval);
    }, [props.created_at]);
    return (
        <div className="post">
            <p>Posted {time}</p>
            <Link to={`${props.id}`}>
                <h5>{props.title}</h5>
            </Link>
            <button className="upvote" onClick={updateUpvotes}>👍 Upvotes: {props.upvotes}</button>
            <Link to={`edit/${props.id}`}><button>Edit post</button></Link>
        </div>
    );
}

export default Post;