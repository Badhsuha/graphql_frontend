import { gql } from "@apollo/client";
import moment from "moment";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Form, Image, Loader } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "semantic-ui-css/semantic.min.css";

import { AuthContext } from "../context/auth";
import DeletePost from "./DeletePost";
import LikeButton from "./LikeButton";

import "./SinglePost.css";

function SinlePost(props) {
  const postId = props.match.params.postId;
  const [body, setBody] = useState("");

  const { data, loading } = useQuery(FETCH_SINGLE_POST, {
    variables: { postId },
    onError(err) {
      console.log(err);
    },
  });

  const onCommentChange = (e) => {
    setBody(e.target.value);
  };
  const [addComment, { commentData, commentLoading }] = useMutation(
    CREATE_COMMENT_QUERY,
    {
      update(proxy, result) {
        setBody("");
      },
      onError(err) {},
      variables: { body, postId },
    }
  );

  const { user } = useContext(AuthContext);
  const commentOnPost = () => {
    console.log("comment Post ");
  };

  return data ? (
    <div className="loading">
      <Card fluid style={{ marginBottom: "20px" }}>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
          <Card.Header>{data.getPost.username}</Card.Header>
          <Card.Description>
            <div style={{}}>{data.getPost.body}</div>
          </Card.Description>
          <br></br>

          <Card.Meta as={Link} to={`data.getPost/${data.getPost.id}`}>
            {moment(data.getPost.createdAt).fromNow()}
          </Card.Meta>
        </Card.Content>
        <Card.Content>
          <div className="flex">
            <LikeButton post={data.getPost} user={user} />
            {user && data.getPost.username === user.username && (
              <DeletePost post={data.getPost} props={props} />
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
                content: data.getPost.commentsCount,
              }}
            />
          </div>
        </Card.Content>
      </Card>

      <Form
        onSubmit={addComment}
        className={commentLoading ? "comment loading" : "comment"}
        style={{ maxWidth: "1200px !important" }}
      >
        <Form.Input
          value={body}
          name="body"
          placeholder="Write comment..."
          onChange={onCommentChange}
        />

        <Button type="submit" onClick={addComment}>
          ADD
        </Button>
      </Form>
      <div className="commentMain">
        {data && (
          <div className="commentBody">
            {" "}
            {data.getPost.comments.map((comment) => (
              <React.Fragment key={`${comment.createdAt}1`}>
                <div
                  key={`${comment.id}2`}
                  className="singleComment"
                  style={{
                    marginTop: "10px",
                    marginBottom: "30px",
                    fontSize: "16px",
                    backgroundColor:
                      comment.username === user.username
                        ? "#0030ff"
                        : "#cecaca",
                    color: comment.username === user.username ? "white" : "",
                    left:
                      comment.username === user.username
                        ? comment.body.length * 16 > 600
                          ? `${1087 - 600}px`
                          : `${1087 - comment.body.length * 16}px`
                        : "0",

                    position: "relative",
                    width: `${comment.body.length * 16}px`,
                    maxWidth: "600px",
                    padding: "10px 7px",
                  }}
                >
                  <div
                    key={`${comment.id}3`}
                    style={{
                      position: "absolute",
                      bottom: "40px",
                      color: "#868282",
                    }}
                  >
                    {comment.username === user.username
                      ? "Me"
                      : comment.username}
                  </div>
                  {comment.body}
                </div>
              </React.Fragment>
            ))}{" "}
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loader active></Loader>
  );
}

const FETCH_SINGLE_POST = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      body
      id
      username
      likes {
        username
        createdAt
      }
      likesCount
      commentsCount
      comments {
        body
        username
        createdAt
      }
      createdAt
    }
  }
`;

const CREATE_COMMENT_QUERY = gql`
  mutation createComment($body: String!, $postId: ID!) {
    createComment(body: $body, postId: $postId) {
      body
      id
      username
      createdAt
      commentsCount
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export default SinlePost;
