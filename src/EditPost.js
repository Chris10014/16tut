import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import api from './api/posts';
import DataContext from './context/DataContext';


const EditPost = () => {
    const { posts, setPosts, navigate } = useContext(DataContext);
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');

    const { id } = useParams();

    const post = posts.find((post) => (post.id).toString() === id);

    useEffect(() => {
        if(post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }

    }, [post, setEditTitle, setEditBody])

    const handleEdit = async (id) => {

        const datetime = format(new Date(), "dd MMMM, yyyy pp");
        const updatedPost = {id, title: editTitle, datetime, body: editBody};
    
        try {
        const response = await api.put(`/posts/${id}`, updatedPost);
        setPosts(posts.map((post) => post.id === id ? { ...response.data } : post));
        setEditBody("");
        setEditTitle("");
        navigate('/'); //history.push mit navigate ersetzen?
        } catch (err) {
        if(err.response) {
            // not in the 200 response
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else {
            console.log(`Error: ${err.message}`)
        }  
        }    
    }

  return (
    <main className="NewPost">
        {editTitle && 
            <>
            <h2>Edit Post</h2>
            <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                />
                <label htmlFor="postBody">Body:</label>
                <textarea
                    id="postBody"
                    required
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                />
                <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
            </form>
            </>
        }
        {!editTitle && 
                <>
                  <h2>Post not found</h2>
                  <p>Schade.</p>
                  <p>
                    <Link to="/">Homepage</Link>
                  </p>
                </>
              }
      </main>
  )
}

export default EditPost