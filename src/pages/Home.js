import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import PostCard from "../components/PostCard";
import { Grid, Loader, Transition } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POST_QUERY } from "../utils/graphqlQuery";

function Home() {
  const { loading, data } = useQuery(FETCH_POST_QUERY);
  const { user } = useContext(AuthContext);
  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />{" "}
          </Grid.Column>
        )}
        {loading ? (
          <Loader active />
        ) : (
          <Transition.Group animation="fade down">
            {data &&
              data.getPosts.map((post) => (
                <Grid.Column key={post.id}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
