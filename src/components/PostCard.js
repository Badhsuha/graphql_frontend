import React, { useContext } from "react";
import { Card, Button, Image, Label, Icon, Loader } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import { AuthContext } from "../context/auth";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POST_QUERY } from "../utils/graphqlQuery";

function PostCard({ post }) {
  const { user } = useContext(AuthContext);

  const [deletPost, { loading }] = useMutation(DELETE_POST_QUERY, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POST_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POST_QUERY,
        data: { getPosts: [...data.getPosts.filter((p) => p.id !== post.id)] },
      });
    },
    variables: { postId: post.id },
    onError(error) {
      console.log(error);
    },
  });
  const onPostDelete = () => {
    deletPost();
  };

  const commentOnPost = () => {
    console.log("comment Post ");
  };

  const likeComment = () => {
    console.log("like Post");
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
          {user && post.username === user.username && (
            <Label
              onClick={onPostDelete}
              style={{ cursor: "pointer" }}
              size="small"
            >
              {loading ? (
                <Loader active />
              ) : (
                <Icon
                  name={loading ? "redo" : "trash"}
                  size="big"
                  color="red"
                />
              )}
            </Label>
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

const DELETE_POST_QUERY = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default PostCard;
