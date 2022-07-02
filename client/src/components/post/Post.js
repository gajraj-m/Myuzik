import React from 'react';
import "./post.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from 'react-router-dom';

const Post = ({post}) => {

  const [like, setLike] = React.useState(post.likes.length);
  const [isliked, setisLiked] = React.useState(false);
  const[user, setUser] = React.useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  React.useEffect(() => {
    // this has to be async as timeline method is async.. but useEffect can't be async. so create another function
    const fetchUser = async () => {
      const res = await axios.get("user/" + post.userId);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  function likeHandler(){
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