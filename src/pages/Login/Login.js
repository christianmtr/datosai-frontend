import {Alert, Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

import {useState} from "react";
import {get_token} from "../../services/auth";
import {useNavigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("".toLowerCase());
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    let navigate = useNavigate();

    const clickLogin = (event) => {
        event.preventDefault();
        setErrorMessage("");
        get_token(username, password)
            .then(response => {
                localStorage.setItem("accessToken", response.data.access);
                localStorage.setItem("refreshToken", response.data.refresh);
                navigate("/", {"replace": true});
            })
            .catch(error => setErrorMessage(JSON.stringify(error.response.data)));
    };

    return (
        <Form onSubmit={clickLogin}>
            <FormGroup row>
                <Label
                    for="username"
                    sm={2}
                >
                    Username
                </Label>
                <Col sm={10}>
                    <Input
                        id="username"
                        name="username"
                        placeholder="Username"
                        type="username"
                        value={username}
                        onChange={evt => setUsername(evt.target.value)}
                    />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label
                    for="password"
                    sm={2}
                >
                    Password
                </Label>
                <Col sm={10}>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={evt => setPassword(evt.target.value)}
                    />
                </Col>
            </FormGroup>
            {errorMessage && (
                <Alert color="danger">
                    {errorMessage.substring(0, 60)}
                </Alert>
            )}
            <Button type="submit">
                Login
            </Button>

        </Form>
    );
}

export default Login;