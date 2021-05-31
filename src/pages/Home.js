import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PostCard from "../components/PostCard";
import { Grid } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

function Home() {
  const { loading, data } = useQuery(FETCH_POST_QUERY);

  return (
    <Grid columns={3} className={loading ? "loading" : ""}>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <div
            className="loading"
            style={{ width: "100%", height: "100%" }}
          ></div>
        ) : (
          data &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_POST_QUERY = gql`
  {
    getPosts {
      id
      username
      createdAt
      body
      likesCount
      commentsCount
      comments {
        body
        username
        createdAt
      }
      likes {
        username
        createdAt
      }
    }
  }
`;

export default Home;
