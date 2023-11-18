import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPost = ({ posts }) => {
    let params = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = () => {
            const selectedPost = posts.find((post) => post.id === parseInt(params.id));
            setPost(selectedPost);
        };

        fetchPost();
    }, [params.id, posts]);

    if (!post) {
        return <p>Post not found</p>;
    }

    const { title, content, image_url, created_at } = post;

    const calculateTime = () => {
        const postDate = new Date(post.created_at);
        const currentDate = new Date();

        const diff = currentDate - postDate;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        let time = "";
        if (days > 0) {
            time = `${days} day${days > 1 ? "s" : ""} ago`;
        } else if (hours > 0) {
            time = `${hours} hour${hours > 1 ? "s" : ""} ago`;
        } else if (minutes > 0) {
            time = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        } else {
            time = `${seconds} second${seconds > 1 ? "s" : ""} ago`;
        }
        return time;
    };

    const time = calculateTime();

    if (!post.created_at) {
        return null; // or loading indicator
    }

    return (
        <>
            <p>Posted {time}</p>
            <h5>{post.title}</h5>
            <p>{post.content}</p>
            <img src={post.image_url} />
        </>
    );
};

export default DetailPost;