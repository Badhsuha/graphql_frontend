import { React, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});

  const [addUser, { loding }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    variables: values,
    onCompleted() {
      setValues({ username: "", email: "", password: "", confirmPassword: "" });
    },
    onError(ApolloError) {
      setError(ApolloError.graphQLErrors[0].extensions.err);
    },
  });

  const submitForm = async (event) => {
    event.preventDefault();
    await addUser();
  };

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="resgister">
      <Form
        size="small"
        onSubmit={submitForm}
        className={loding ? "loading" : ""}
        noValidate
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
          label="Email"
          name="email"
          placeholder="Email"
          type="email"
          error={error.email ? true : false}
          onChange={onChange}
          value={values.email}
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
        <Form.Input
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={onChange}
          error={error.confirmPassword ? true : false}
          value={values.confirmPassword}
          type="password"
        />
        <div className="btn">
          <Button type="submit" primary>
            Submit
          </Button>
        </div>
      </Form>
      {Object.keys(error).length > 0 && (
        <div className="ui error message ">
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      createdAt
      id
      username
      token
    }
  }
`;

export default Register;
