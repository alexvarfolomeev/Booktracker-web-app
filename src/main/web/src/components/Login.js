import React, {Component} from 'react'
import axios from 'axios';
import {Form, Button, Card} from 'react-bootstrap'

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.submitBook = this.submitAuth.bind(this);
    }

    initialState = {
        email: '', password: ''
    }

    submitAuth = event => {
        event.preventDefault();

        const credentials = {
            email: this.state.authorName,
            password: this.state.bookName,
        };

        axios.post("http://localhost:8080/api/login", credentials)
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState);
                    alert("success!");
                }
            });
    }

    render() {
        const { email, password } = this.state;
        return (
            <Card className={"bordered border-dark bg-dark text-white"} style={{ marginTop: 50, marginBottom: 50, marginLeft: 50, marginRight: 50 }}>
                <Card.Header>Вход в приложение</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className={"bg-dark text-white"}>
                            <Form.Label>Email адрес</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Введите email" value={email}/>
                            <Form.Text className={"bg-dark text-white"}>
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className={"bg-dark text-white"} controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Пароль" value={password}/>
                        </Form.Group>
                        <Form.Group className={"bg-dark text-white"} controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Запомнить меня"/>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Вход
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

export default Login