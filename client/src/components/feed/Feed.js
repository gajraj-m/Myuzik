import "./feed.css";
import React from 'react';
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext"
import { useContext } from "react";

const Feed = () => {

  const [posts, setPosts] = React.useState([]);
  const {user} = useContext(AuthContext);

  React.useEffect(() => {
    // this has to be async as timeline method is async.. but useEffect can't be async. so create another function
    const fetchPosts = async () => {
      const res = await axios.get("post/timeline/" + user._id);
      setPosts(res.data);
    }
    fetchPosts();
  }, [user._id]);

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