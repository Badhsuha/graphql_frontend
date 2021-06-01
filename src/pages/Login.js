import { React, useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import "semantic-ui-css/semantic.min.css";

import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";

function Login(props) {
  const context = useContext(AuthContext);
  const [error, setError] = useState({});

  const { onChange, submitForm, values } = useForm(loginUserCallBack, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData);
      props.history.push("/");
    },
    variables: values,

    onError(ApolloError) {
      setError(ApolloError.graphQLErrors[0].extensions.err);
    },
  });

  function loginUserCallBack() {
    loginUser();
  }

  return (
    <div className="register">
      <Form
        size="small"
        onSubmit={submitForm}
        noValidate
        className={loading ? "loading" : ""}
      >
        <Form.Input
          label="Username"
          name="username"
          placeholder="Username"
          type="text"
          error={error.username ? true : false}
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Passowrd"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={onChange}
          error={error.password ? true : false}
          type="password"
        />
        <div className="btn">
          <Button type="submit" primary>
            LOGIN
          </Button>
        </div>
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
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      createdAt
      id
      username
      token
    }
  }
`;

export default Login;
