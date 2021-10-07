import React, {Component} from 'react';
import axios from 'axios';
import ApiService from "./ApiService";
import {Card, Form, Button, Col, Select} from 'react-bootstrap'


export default class BookEditing extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.bookChange = this.bookChange.bind(this);
        this.updateBook = this.updateBook.bind(this);
    }

    initialState = {
        id: '', authorName: '', bookName: '', coverPicURL: '', bookStatus: ''
    }

    // updateBook = (bookId) => {
    //     axios.delete('http://localhost:8080/api/books/update-book/' + bookId)
    //         .then(response => {
    //             if (response != null) {
    //                 alert('This book was successfully updated!');
    //                 this.setState({
    //                     books: this.state.books.filter(book => book.id != bookId)
    //                 });
    //             }
    //         });
    // };

    componentDidMount() {
        const bookId = +this.props.match.params.id;
        if (bookId) {
            this.findById(bookId);
        }
    }

    findById = (bookId) => {
        axios.get("http://localhost:8080/api/books/find-book-by-id/" + bookId)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        id: response.data.id,
                        authorName: response.data.authorName,
                        bookName: response.data.bookName,
                        coverPicURL: response.data.coverPicURL,
                        bookStatus: response.data.bookStatus
                    });
                }
            }).catch((error) => {
            console.error("Error - " + error);
        });
    }


    updateBook = event => {
        event.preventDefault();

        const book = {
            id: this.state.id,
            authorName: this.state.authorName,
            bookName: this.state.bookName,
            coverPicURL: this.state.coverPicURL,
            bookStatus: this.state.bookStatus
        };

        axios.put("http://localhost:8080/api/books/update-book/" + book.id, book)
            .then(response => {
                if (response.data != null) {
                    this.setState(this.initialState);
                    alert("Book updated successfully!");
                    this.props.history.push('/show-all');
                }
            });
    }

    bookChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {authorName, bookName, coverPicURL, bookStatus} = this.state;

        return (
            <Card className={"bordered border-dark bg-dark text-white"}
                  style={{marginTop: 50, marginBottom: 50, marginLeft: 50, marginRight: 50}}>
                <Card.Header>Изменить инфо о книге</Card.Header>
                <Form onSubmit={this.updateBook} id="bookFormId">
                    <Card.Body>
                        <Form.Group as={Col} controlId="formGridAuthor">
                            <Form.Label>Автор</Form.Label>
                            <Form.Control required autoComplete="off"
                                          type="text" name="authorName"
                                          value={authorName}
                                          onChange={this.bookChange}
                                          placeholder="Введите автора книги"
                                          className={"bg-dark text-white"}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridTitle" style={{marginTop: 10}}>
                            <Form.Label>Название книги</Form.Label>
                            <Form.Control required autoComplete="off"
                                          type="text" name="bookName"
                                          value={bookName}
                                          onChange={this.bookChange}
                                          placeholder="Введите название книги"
                                          className="bg-dark text-white"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCover" style={{marginTop: 10}}>
                            <Form.Label>Обложка книги</Form.Label>
                            <Form.Control required autoComplete="off"
                                          type="text" name="coverPicURL"
                                          value={coverPicURL}
                                          onChange={this.bookChange}
                                          placeholder="Добавьте URL картинки"
                                          className="bg-dark text-white"/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridStatus" style={{marginTop: 10}}>
                            <Form.Label>Статус книги</Form.Label>
                            <Form.Control required autoComplete="off"
                                          type="text" name="bookStatus"
                                          value={bookStatus}
                                          onChange={this.bookChange}
                                          placeholder="Выберите статус книги"
                                          className="bg-dark text-white"/>
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

//     constructor(props) {
//         super(props);
//         this.state = {
//             bookId: '',
//             authorName: '',
//             bookName: '',
//             coverPicURL: '',
//             bookStatus: ''
//         }
//         this.saveBook = this.saveBook.bind(this);
//         this.loadBook = this.loadBook.bind(this);
//     }
//
//     fetchUserById(bookId) {
//         return axios.get("http://localhost:8080/api/books/find-book-by-id"+ '/' + bookId);
//     }
//
//     componentDidMount() {
//         this.loadBook();
//     }
//
//     loadBook() {
//         ApiService.fetchUserById(window.localStorage.getItem("bookId"))
//             .then((res) => {
//                 let book = res.data.result;
//                 this.setState({
//                     bookId: book.id,
//                     authorName: book.authorName,
//                     bookName: book.bookName,
//                     coverPicURL: book.coverPicURL,
//                     bookStatus: book.bookStatus,
//                 })
//             });
//     }
//
//     onChange = (e) =>
//         this.setState({[e.target.name]: e.target.value});
//
//     saveBook = (e) => {
//         e.preventDefault();
//         let book = {
//             bookId: this.state.bookId,
//             authorName: this.state.authorName,
//             bookName: this.state.bookName,
//             coverPicURL: this.state.coverPicURL,
//             bookStatus: this.state.bookStatus,
//         };
//
//         ApiService.editBook(book)
//             .then(res => {
//                 this.setState({message: 'Book updated successfully.'});
//                 this.props.history.push('/show-all');
//             });
//     }
//
//     render() {
//         return (
//             <div>
//                 <h2 className="text-center">Edit User</h2>
//                 <form>
//
//                     <div className="form-group">
//                         <label>Book id</label>
//                         <input type="text" placeholder="bookId" name="bookId" className="form-control"
//                                readonly="true" defaultValue={this.state.bookId}/>
//                     </div>
//
//                     <div className="form-group">
//                         <label>Автор</label>
//                         <input placeholder="authorName" name="authorName" className="form-control"
//                                value={this.state.authorName} onChange={this.onChange}/>
//                     </div>
//
//                     <div className="form-group">
//                         <label>Название книги</label>
//                         <input placeholder="bookName" name="bookName" className="form-control"
//                                value={this.state.bookName} onChange={this.onChange}/>
//                     </div>
//
//                     <div className="form-group">
//                         <label>Age:</label>
//                         <input placeholder="coverPicURL" name="coverPicURL" className="form-control"
//                                value={this.state.coverPicURL} onChange={this.onChange}/>
//                     </div>
//
//                     <div className="form-group">
//                         <label>Salary:</label>
//                         <input placeholder="bookStatus" name="bookStatus" className="form-control"
//                                value={this.state.bookStatus} onChange={this.onChange}/>
//                     </div>
//                         <button className="btn btn-success" onClick={this.saveBook}>Сохранить</button>
//                 </form>
//             </div>
//         );
//     }
// }