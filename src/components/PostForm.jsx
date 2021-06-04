import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/react-hooks";
import "semantic-ui-css/semantic.min.css";

import { useForm } from "../utils/hooks";
import { FETCH_POST_QUERY } from "../utils/graphqlQuery";

function PostForm() {
  const [error, setError] = useState({});

  const { onChange, submitForm, values } = useForm(callbackfunction, {
    body: "",
  });

  const [addPost, { loading }] = useMutation(ADD_POST, {
    update(proxy, result) {
      setError({});
      const data = proxy.readQuery({
        query: FETCH_POST_QUERY,
        variables: values,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POST_QUERY, data, variables: values });

      values.body = "";
    },

    variables: { ...values },
    onError(ApolloError) {
      setError({ error: ApolloError.graphQLErrors[0].message });
    },
  });

  function callbackfunction() {
    addPost();
  }
  return (
    <>
      <Form onSubmit={submitForm} className={loading ? "loading Post" : "Post"}>
        <Form.Input
          label="Post"
          name="body"
          placeholder="Write Post...."
          type="textarea"
          error={error.error ? true : false}
          value={values.body}
          onChange={onChange}
        />
        <Button type="submit" primary>
          POST
        </Button>
      </Form>
      {Object.keys(error).length > 0 && (
        <div className="ui error message">
          <ul>
            {Object.values(error).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

const ADD_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      likesCount
      createdAt
      commentsCount
      comments {
        id
        createdAt
        username
      }
      likes {
        id
        createdAt
      }
    }
  }
`;
export default PostForm;
