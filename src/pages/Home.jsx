import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import { Link } from 'react-router-dom'
import './Home.css'

const Home = (props) => {
    const [posts, setPosts] = useState([]);
    const [sortByVotes, setSortByVotes] = useState(false);
    const [sortByNew, setSortByNew] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        setPosts(props.data);
    }, [props]);

    const handleSortByNew = () => {
        const sortedPosts = [...posts];
        sortedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setPosts(sortedPosts);
        setSortByVotes(false);
        setSortByNew(true);
    };

    const handleSortByVotes = () => {
        const sortedPosts = [...posts];
        sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
        setPosts(sortedPosts);
        setSortByNew(false);
        setSortByVotes(true);
    };

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchValue !== "") {
            const filteredData = posts.filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(posts);
        }
    };

    const showAll = () => {
        return (
            posts && posts.length > 0 ?
                posts.map((post, index) =>
                    <Post id={post.id} title={post.title} created_at={post.created_at} upvotes={post.upvotes} />
                ) : <div>
                    <h2>{'No Posts Yet 😞'}</h2>
                    <Link to="/new"><button>Create one here!</button>
                    </Link>
                </div>
        )
    }

    const showList = (array) => {
        return (
            array.map((post, index) =>
                <Post id={post.id} title={post.title} created_at={post.created_at} upvotes={post.upvotes} />
            )
        )
    }

    return (
        <>
            <div className='home-page'>
                <div className='nav-bar'>
                    <input
                        type="text"
                        placeholder='Search...'
                        onChange={(inputString) => searchItems(inputString.target.value)} />
                    <Link to="/" className='link'><h1>Home</h1></Link>
                    <Link to="/new" className='link'><h1>Create Post</h1></Link>
                </div>
                <p>Order by: <button onClick={handleSortByNew}>Newest</button>
                    <button onClick={handleSortByVotes}>Vote Counts</button></p>
                {sortByNew && <p>Sorted by time created</p>}
                {sortByVotes && <p>Sorted by vote count</p>}
                {filteredResults.length <= 0 
                    ? showAll()
                    : showList(filteredResults)}
            </div>
        </>
    )
}

export default Home;