import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import Alert from "../../../helpers/Alert";
import "./auth.css";

function SignUp(props) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isEmailValid, setEmailValidity] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPasswordValid, setPasswordValidity] = React.useState("");
  const [error, setError] = React.useState(false);

  const checkEmail = () => {
    if (email !== "") {
      let lastAtPos = email.lastIndexOf("@");
      let lastDotPos = email.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          email.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          email.length - lastDotPos > 1
        )
      )
        setEmailValidity(false);
      else setEmailValidity(true);
    }
  };

  const checkPassword = () => {
    if (password !== "")
      if (password.length < 6) setPasswordValidity(false);
      else setPasswordValidity(true);
  };

  const isFormValid = () => {
    console.log(isEmailValid, isPasswordValid);
    if (email.length === "" || password.length === "" || username.length === "")
      return false;
    if (!isEmailValid || !isPasswordValid) return false;
    console.log(isEmailValid, isPasswordValid);
    return true;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError(true);
      console.log("incorrect data");
      e.preventDefault();
      return;
    }
    axios
      .post("/signup", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200 || res.status === 304)
          props.history.push("/signin");
      })
      .catch(() => setError(true));
  };
  return (
    <Row className="align-content-center" style={{ marginTop: "15vh" }}>
      <Col
        className="d-block text-center justify-content-center"
        lg={{ span: 4, offset: 4 }}
        md={{ span: 6, offset: 3 }}
        sm={{ span: 10, offset: 1 }}
      >
        <h1>create an account</h1>

        <Form
          className="form-wrapper"
          onSubmit={(e) => {
            submit(e);
          }}
        >
          {error ? <Alert msg={"Invalid credentials"} type="danger" /> : null}
          <Form.Group controlId="formBasicUsername">
            <Form.Control
              className={`input`}
              type="username"
              placeholder="Enter username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control
              className={`input ${isEmailValid}`}
              type="email"
              placeholder="Enter email address"
              name="email"
              value={email}
              onChange={(e) => {
                checkEmail();
                setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className={`input ${isPasswordValid}`}
              type="password"
              placeholder="Enter password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPassword();
              }}
              style={{}}
            />
            <Form.Text id="passwordHelpBlock" muted>
              Must be 7 or more characters long.
            </Form.Text>
          </Form.Group>
          <Button className="input-button" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <p>
          already have an account?{" "}
          <a href="/signin" id="login_id">
            Sign in
          </a>
        </p>
      </Col>
    </Row>
  );
}

export default SignUp;
