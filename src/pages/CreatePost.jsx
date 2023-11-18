import React, { useState } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';

const CreatePost = () => {
    const [post, setPost] = useState({ title: '', content: '', image_url: '', upvotes: 0});

    const createPost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .insert(post)
            .select();
            
        window.location = '/';
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    }

    return (
        <>
            <div>
                <form onSubmit={createPost}>
                    <input type="text" id="title" name="title" placeholder
                        ="Title" value={post.title} onChange={handleInputChange} /><br />
                    <br />

                    <textarea rows="5" cols="50" id="content" name="content" placeholder="Content (Optional)" value={post.content} onChange={handleInputChange} >
                    </textarea>
                    <br />
                    <br />

                    <input type="text" id="image_url" name="image_url" placeholder='Image URL (Optional)' value={post.image_url} onChange={handleInputChange} /><br />
                    <br />

                    <button type='submit'>Create Post</button>
                </form>
            </div>
        </>
    )
}

export default CreatePost;