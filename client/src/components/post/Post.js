import React, { useState, useContext, useEffect } from "react";
import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

const Post = ({post}) => {

  const [like, setLike] = useState(post.likes.length);
  const [isliked, setisLiked] = useState(false);
  const[user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user: currUser} = useContext(AuthContext);

  useEffect(() => {
    setisLiked(post.likes.includes(currUser._id));
  }, [currUser._id, post.likes]);

  useEffect(() => {
    // this has to be async as timeline method is async.. but useEffect can't be async. so create another function
    const fetchUser = async () => {
      const res = await axios.get("/user/" + post.userId);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  function likeHandler(){
    const putLike = async () => {
      try {
        const res = await axios.put("/post/" + post._id + "/like", { userId: currUser._id });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    putLike();
    setLike(isliked? like-1 : like+1);
    setisLiked(!isliked);
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={"profile/"+post.userId}>
              <img
                className="postProfileImg"
                src={PF + user.profilePic || PF + "avatar.png"}
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.updatedAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertIcon />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.content}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;