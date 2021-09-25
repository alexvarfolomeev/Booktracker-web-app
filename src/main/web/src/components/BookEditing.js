import React, { Component } from 'react';
import axios from 'axios';
import { Card, Form, Button, Col, Select } from 'react-bootstrap'


export default class BookEditing extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }

    initialState = {
        authorName: '', bookName: '', coverPicURL: '', bookStatus: ''
    }

    submitBook = event => {
        event.preventDefault();

        const book = {
            authorName: this.state.authorName,
            bookName: this.state.bookName,
            coverPicURL: this.state.coverPicURL,
            bookStatus: this.state.bookStatus
        };

        axios.post("http://localhost:8080/api/books/update-book", book)
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState);
                    alert("Book updated successfully!");
                }
            });
    }

    bookChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })

    }

    render() {
        const { authorName, bookName, coverPicURL, bookStatus } = this.state;
    
        return (
            <Card className={"bordered border-dark bg-dark text-white"} style={{ marginTop: 50, marginBottom: 50, marginLeft: 50, marginRight: 50 }}>
                <Card.Header>Изменить инфо о книге</Card.Header>
                <Form onSubmit={this.submitBook} id="bookFormId">
                    <Card.Body>
                        <Form.Group as={Col} controlId="formGridAuthor">
                            <Form.Label>Автор</Form.Label>
                            <Form.Control required autoComplete="off"
                                type="text" name="authorName"
                                value={authorName}
                                onChange={this.bookChange}
                                placeholder="Введите автора книги"
                                className={"bg-dark text-white"} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridTitle" style={{ marginTop: 10 }}>
                            <Form.Label>Название книги</Form.Label>
                            <Form.Control required autoComplete="off"
                                type="text" name="bookName"
                                value={bookName}
                                onChange={this.bookChange}
                                placeholder="Введите название книги"
                                className="bg-dark text-white" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCover" style={{ marginTop: 10 }}>
                            <Form.Label>Обложка книги</Form.Label>
                            <Form.Control required autoComplete="off"
                                type="text" name="coverPicURL"
                                value={coverPicURL}
                                onChange={this.bookChange}
                                placeholder="Добавьте URL картинки"
                                className="bg-dark text-white" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridStatus" style={{ marginTop: 10 }}>
                            <Form.Label>Статус книги</Form.Label>
                            <Form.Control required autoComplete="off"
                                type="text" name="bookStatus"
                                value={bookStatus}
                                onChange={this.bookChange}
                                placeholder="Выберите статус книги"
                                className="bg-dark text-white" />
                        </Form.Group>
                    </Card.Body>
                    <Card.Footer>
                        <Button variant="success" type="submit">
                            Сохранить
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        )
    }
}