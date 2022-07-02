import "./feed.css";
import React from 'react';
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";

const Feed = () => {

  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    // this has to be async as timeline method is async.. but useEffect can't be async. so create another function
    const fetchPosts = async () => {
      const res = await axios.get("post/timeline/62bdacbac058f3e3bbcfaa17");
      setPosts(res.data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share/>
        {
          posts.map((p) => {
            return <Post
             key={p._id}
             post = {p}
              />
          })
        }
      </div>
    </div>
  )
}

export default Feed;