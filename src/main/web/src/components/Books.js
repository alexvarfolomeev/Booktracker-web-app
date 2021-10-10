import React, { Component } from 'react';
import axios from 'axios';
import {Card, Table, Image, ButtonGroup, Button, Modal, Nav, InputGroup, FormControl} from 'react-bootstrap'
import ApiService from "./ApiService";
import Ripples from 'react-ripples'
import {faList, faStepBackward, faStepForward, faFastBackward, faFastForward} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";


export default class Books extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            currentPage: 1,
            booksPerPage: 6,
        }
        //this.reloadBookList = this.reloadBookList.bind(this);
    }

    // reloadBookList() {
    //     ApiService.fetchBooks()
    //         .then((res) => {
    //             this.setState({users: res.data.result})
    //         });
    // }

    findAllBooks(currentPage) {
        currentPage -= 1;
        axios.get('http://localhost:8080/api/books/show-all?page=' + currentPage + '&size=' + this.state.booksPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    books: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    }

    componentDidMount() {
        this.findAllBooks(this.state.currentPage)
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

    changePage = event => {
        let targetPage = parseInt(event.target.value)
        this.findAllBooks(targetPage)
        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage){
            this.findAllBooks(firstPage);
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage){
            this.findAllBooks(this.state.currentPage - prevPage);
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.booksPerPage)) {
            this.findAllBooks(this.state.currentPage + 1)
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.booksPerPage);
        if (this.state.currentPage < condition) {
            this.findAllBooks(condition);
        }
    };

    render() {
        const {books, currentPage, totalPages} = this.state;

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };

            return (
                <Card className={"bordered border-dark bg-dark text-white"} style={{ marginTop: 50, marginBottom: 50, marginLeft: 50, marginRight: 50 }}>
                    <Card.Header><FontAwesomeIcon icon={faList} style={{marginRight: 10}}/>
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
                                {books.length === 0 ?
                                    <tr align="center">
                                        <td colSpan={6}>Вы еще не добавили ни одной книги</td>
                                    </tr> :
                                    books.map(
                                        book =>
                                            <tr key={book.id}>
                                                <td>{book.id}</td>
                                                <td> <Image src={book.coverPicURL} roundedCircle width="30" hight="30" /> {book.bookName}</td>
                                                <td>{book.authorName}</td>
                                                <td>{book.bookStatus}</td>
                                                <td>
                                                    <Ripples>
                                                        <Button size="sm" variant="outline-danger" onClick={this.deleteBook.bind(this, book.id)}>Удалить</Button>
                                                    </Ripples>
                                                </td>
                                                <td>
                                                    <Ripples>
                                                        <Link to={"update-book/" + book.id} className="btn btn-sm btn-outline-primary">Редактировать</Link>
                                                    </Ripples>
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer>
                        <div style={{float:"left"}}>
                            Страница {currentPage} из {totalPages}
                        </div>
                        <div style={{float:"right"}}>
                            <InputGroup size={"sm"}>
                                <InputGroup>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                        onClick={this.firstPage}>
                                        <FontAwesomeIcon icon={faFastBackward}/> Начало
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                        <FontAwesomeIcon icon={faStepBackward}/> Сюда
                                    </Button>
                                <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage}
                                onChange={this.changePage} disabled={currentPage === 1 ? true : false}/>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                        <FontAwesomeIcon icon={faStepForward}/> Туда
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                        <FontAwesomeIcon icon={faFastForward}/> Конец
                                    </Button>
                                </InputGroup>
                            </InputGroup>
                        </div>
                    </Card.Footer>
                </Card>
            )
        }
}