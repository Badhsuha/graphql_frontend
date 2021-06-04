import React, { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

function LikeButton({ post, user }) {
  const [liked, setLiked] = useState(false);
  const [likePost, { data }] = useMutation(LIKE_POST_QUERY, {
    variables: { postId: post.id },
  });
  useEffect(() => {
    if (user && post.likes.find((like) => user.username === like.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, post.likes]);

  if (data) console.log(data);

  const likebutton = user ? (
    liked ? (
      <Button
        size="mini"
        color="red"
        content="Like"
        icon="heart"
        onClick={likePost}
        basic
        label={{
          basic: true,
          color: "blue",
          pointing: "left",
          content: post.likesCount,
        }}
      />
    ) : (
      <Button
        size="mini"
        color="grey"
        content="Like"
        icon="heart"
        onClick={likePost}
        basic
        label={{
          basic: true,
          color: "blue",
          pointing: "left",
          content: post.likesCount,
        }}
      />
    )
  ) : (
    <Button
      size="mini"
      color="grey"
      content="Like"
      icon="heart"
      as={Link}
      to="/login"
      basic
      label={{
        basic: true,
        color: "blue",
        pointing: "left",
        content: post.likesCount,
      }}
    />
  );

  return likebutton;
}

const LIKE_POST_QUERY = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
        createdAt
      }
      likesCount
    }
  }
`;

export default LikeButton;
