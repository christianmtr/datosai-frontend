import {Alert, Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {useEffect, useState} from "react";
import {updateApiToken} from "../../services/auth";

function UserProfile() {
    // const [userInfo, setUserInfo] = useState([]);
    const [openaiToken, setOpenaiToken] = useState("");
    const [tokenUpdated, setTokenUpdated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // useEffect(() => {}, []);

    const sendApiToken = (event) => {
        event.preventDefault();

        updateApiToken(openaiToken)
            .then(response => setTokenUpdated(true))
            .catch(error => setErrorMessage(JSON.stringify(error.response.data)));
    };

    return (
        <>
            <Form>
                <FormGroup row>
                    <Label
                        for="names"
                        sm={2}
                    >
                        Names
                    </Label>
                    <Col sm={10}>
                        <Input
                            id="names"
                            name="names"
                        />
                    </Col>
                </FormGroup>
            </Form>

            <hr/>

            <Form onSubmit={sendApiToken}>
                <FormGroup row>
                    <Label
                        for="openai_token"
                        sm={2}
                    >
                        Open AI token
                    </Label>
                    <Col sm={10}>
                        <Input
                            id="openai_token"
                            name="openai_token"
                            placeholder="Your Open AI token"
                            type="text"
                            value={openaiToken}
                            onChange={evt => setOpenaiToken(evt.target.value)}
                        />
                    </Col>
                </FormGroup>
                {errorMessage && (
                <Alert color="danger">
                    {errorMessage.substring(0, 60)}
                </Alert>
            )}
                <Button type="submit">
                    {!tokenUpdated ? "Save token" : "Saved!"}
                </Button>
            </Form>
        </>
    );
}

export default UserProfile;