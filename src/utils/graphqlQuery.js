import gql from "graphql-tag";

export const FETCH_POST_QUERY = gql`
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
