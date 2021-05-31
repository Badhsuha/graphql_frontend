import React from "react";
import { Card, Button, Image } from "semantic-ui-react";
import moment from "moment";

function PostCard({ post }) {
  const commentOnPost = () => {
    console.log("comment Post ");
  };

  const likeComment = () => {
    console.log("like Post");
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{post.username}</Card.Header>
        <Card.Description>{post.body}</Card.Description>
        <br></br>
        <Card.Meta> {moment(post.createdAt).fromNow()} </Card.Meta>
      </Card.Content>
      <Card.Content>
        <div className="flex">
          <Button
            size="mini"
            color="grey"
            content="Like"
            icon="heart"
            onClick={likeComment}
            basic
            label={{
              basic: true,
              color: "blue",
              pointing: "left",
              content: post.likesCount,
            }}
          />

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
