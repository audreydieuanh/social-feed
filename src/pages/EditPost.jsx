import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const EditPost = ({ data }) => {

    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        const postData = data.filter(item => item.id === id)[0];
        if (postData) {
            setPost(postData);
        }
    }, [data, id]);

    const updatePost = async (event) => {
        event.preventDefault();
        try {
            const { error } = await supabase
                .from('Posts')
                .update({ title: post.title, content: post.content, image_url: post.image_url })
                .eq('id', id);

            if (error) {
                throw error;
            }

            window.location = '/';
        } catch (error) {
            console.error("Error updating post: ", error);
        }
    }

    const deletePost = async (event) => {
        event.preventDefault();
        try {
            const { error } = await supabase
                .from('Posts')
                .delete()
                .eq('id', id);

            if (error) {
                throw error;
            }

            window.location = '/';
        } catch (error) {
            console.error("Error deleting post: ", error);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    }

    return (
        <>
            <div>
                <h1>Do you want to change your post?</h1>
                <form onSubmit={updatePost}>
                    <input type="text" id="title" name="title" placeholder
                        ="Title" value={post.title} onChange={handleInputChange} /><br />
                    <br />

                    <textarea rows="5" cols="50" id="content" name="content" placeholder="Content (Optional)" value={post.content} onChange={handleInputChange} >
                    </textarea>
                    <br />
                    <br />

                    <input type="text" id="image_url" name="image_url" placeholder='Image URL (Optional)' value={post.image_url} onChange={handleInputChange} /><br />
                    <br />
                    <input type="submit" value="Submit" />
                    <button className="deleteButton" onClick={deletePost}>Delete</button>
                </form>
            </div>
        </>
    )
}

export default EditPost;