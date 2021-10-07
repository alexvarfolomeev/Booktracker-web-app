import axios from 'axios';

class ApiService {

    fetchBooks() {
        return axios.get("http://localhost:8080/api/books/show-all");
    }

    fetchUserById(bookId) {
        return axios.get("http://localhost:8080/api/books/find-book-by-id" + '/' + bookId);
    }

    editBook(book) {
        return axios.post("http://localhost:8080/api/books/update-book" + '/' + book.id, book);
    }
}

export default new ApiService();