import React, { Component } from 'react';
import axios from 'axios';
import { Card, Table, Image } from 'react-bootstrap'


export default class ReadBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            read_books: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/api/books/show-all-read-books')
            .then(response => response.data)
            .then((data) => {
                this.setState({ read_books: data })
            })
    }

    render() {
        return (
            <Card className={"bordered border-dark bg-dark text-white"} style={{ marginTop: 50, marginBottom: 50, marginLeft: 50, marginRight: 50 }}>
                <Card.Header>Прочитанные книги</Card.Header>
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
                                this.state.read_books.map(
                                    read_book =>
                                        <tr key={read_book.id}>
                                            <td>{read_book.id}</td>
                                            <td> <Image src={read_book.coverPicURL} roundedCircle width="30" hight="30" /> {read_book.bookName}</td>
                                            <td> {read_book.authorName}</td>
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