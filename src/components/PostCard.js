import React, { useContext } from "react";
import { Card, Button, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import { AuthContext } from "../context/auth";

import LikeButton from "./LikeButton";
import DeletePost from "./DeletePost";

function PostCard({ post }) {
  const { user } = useContext(AuthContext);

  const commentOnPost = () => {
    console.log("comment Post ");
  };

  return (
    <Card fluid style={{ marginBottom: "20px" }} className="loading">
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{post.username}</Card.Header>
        <Card.Description>
          <div style={{}}>{post.body}</div>
        </Card.Description>
        <br></br>

        <Card.Meta as={Link} to={`post/${post.id}`}>
          {moment(post.createdAt).fromNow()}
        </Card.Meta>
      </Card.Content>
      <Card.Content>
        <div className="flex">
          <LikeButton post={post} user={user} />
          {user && post.username === user.username && (
            <DeletePost post={post} props={false} />
          )}
          <Button
            size="mini"
            color="grey"
            content="comments"
            icon="comments"
            basic
            onClick={commentOnPost}
            label={{
              basic: true,
              color: "blue",
              pointing: "left",
              content: post.commentsCount,
            }}
          />
        </div>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
