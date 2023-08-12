import { useState, useContext } from "react";
import { format } from "date-fns";
import api from './api/posts';
import DataContext from './context/DataContext';

const NewPost = () => {
  const { posts, setPosts, navigate } = useContext(DataContext);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "dd MMMM, yyyy pp");
    const newPost = {id, title: postTitle, datetime, body: postBody};
    try {
    const response = await api.post("/posts", newPost);
    const allPosts = [...posts, response.data];
    setPosts(allPosts);
    setPostTitle("");
    setPostBody("");
    navigate('/');
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
          <h2>New Post</h2>
          <form className="newPostForm" onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Title:</label>
            <input
              id="postTitle"
              type="text"
              required
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <label htmlFor="postBody">Body:</label>
            <textarea
              id="postBody"
              required
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
            />
            <button type="submit">useSubmit</button>
          </form>
      </main>
    )
  }
  
  export default NewPost;