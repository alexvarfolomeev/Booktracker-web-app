import React, { Component } from 'react';
import axios from 'axios';
import { Card, Table, Image } from 'react-bootstrap'


export default class UnreadBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            unread_books: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/books/show-all-unread-books')
            .then(response => response.data)
            .then((data) => {
                this.setState({ unread_books: data })
            })
    }

    render() {
        return (
            <Card className={"bordered border-dark bg-dark text-white"} style={{ marginTop: 50, marginBottom: 50, marginLeft: 50, marginRight: 50 }}>
                <Card.Header>Книги для прочтения</Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Название книги</th>
                                <th>Автор</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.unread_books.map(
                                    unread_book =>
                                        <tr key={unread_book.id}>
                                            <td>{unread_book.id}</td>
                                            <td> <Image src={unread_book.coverPicURL} roundedCircle width="30" hight="30" /> {unread_book.bookName}</td>
                                            <td> {unread_book.authorName}</td>
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