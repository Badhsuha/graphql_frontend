import React from "react";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";

function PostCard({ post }) {
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
          <Card.Meta>Likes:{post.likesCount}</Card.Meta>
          <Card.Meta>Comments:{post.commentsCount}</Card.Meta>
        </div>
      </Card.Content>
    </Card>
  );
}
export default PostCard;
