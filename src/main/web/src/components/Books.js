import React, { Component } from 'react';
import axios from 'axios';
import { Card, Table, Image, ButtonGroup, Button, Modal } from 'react-bootstrap'
import Ripples from 'react-ripples'


export default class Books extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/books/show-all')
            .then(response => response.data)
            .then((data) => {
                this.setState({ books: data })
            })
    }

    deleteBook = (bookId) => {
        axios.delete('http://localhost:8080/api/books/delete-book/' + bookId)
            .then(response => {
                if (response != null) {
                    alert('Book deleted successfully');
                    this.setState({
                        books: this.state.books.filter(book => book.id != bookId)
                    });
                }
            });
    };

    render() {
            return (
                <Card className={"bordered border-dark bg-dark text-white"} style={{ marginTop: 50, marginBottom: 50, marginLeft: 50, marginRight: 50 }}>
                    <Card.Header>
                        Список всех книг
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Название книги</th>
                                    <th>Автор</th>
                                    <th>Статус</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.books.map(
                                        book =>
                                            <tr key={book.id}>
                                                <td>{book.id}</td>
                                                <td> <Image src={book.coverPicURL} roundedCircle width="30" hight="30" /> {book.bookName}</td>
                                                <td>{book.authorName}</td>
                                                <td>{book.bookStatus}</td>
                                                <td>
                                                    <Ripples>
                                                        <Button variant="outline-danger" onClick={this.deleteBook.bind(this, book.id)}>Удалить</Button>
                                                    </Ripples>
                                                </td>
                                                <td>
                                                    <Ripples>
                                                        <Button variant="outline-success" href='/update-book'>Редактировать</Button>{' '}
                                                    </Ripples>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer></Card.Footer>
                </Card>
            )
        }
    }