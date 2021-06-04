import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Confirm, Icon, Label, Loader } from "semantic-ui-react";

import { FETCH_POST_QUERY } from "../utils/graphqlQuery";

function DeletePost({ props, post }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [deletPost, { loading }] = useMutation(DELETE_POST_QUERY, {
    update(proxy, result) {
      setConfirmDelete(false);
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
    if (props) {
      props.history.push("/");
    }
  };
  return (
    <>
      <Label
        onClick={() => setConfirmDelete(true)}
        style={{ cursor: "pointer" }}
        size="small"
      >
        {loading ? (
          <Loader active />
        ) : (
          <Icon
            name="trash"
            size="big"
            color="red"
            style={{ margin: 0, padding: 0 }}
          />
        )}
      </Label>
      <Confirm
        content="Are you sure?  Press CANCEL not to delete?"
        open={confirmDelete}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={onPostDelete}
      ></Confirm>
    </>
  );
}
const DELETE_POST_QUERY = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
export default DeletePost;
