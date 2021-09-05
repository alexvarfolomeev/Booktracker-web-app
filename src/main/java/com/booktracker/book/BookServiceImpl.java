package com.booktracker.book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl {

    @Autowired
    private BooksRepository repository;

    public List<Book> findAllBooks(){
        return repository.findAll();
    }

    public Optional findBookById(Long id){
        return repository.findById(id);
    }

    public void deleteBook(Long id){
        repository.deleteById(id);
    }

    public Book updateBookInfo(Long id, Book book){
        Book bookToUpdate = (Book) repository.findById(id).get();
        bookToUpdate.setBookName(book.getBookName());
        bookToUpdate.setAuthorName(book.getAuthorName());
        return bookToUpdate;
    }

    public void addBook(Book book){
        repository.save(book);
    }

    public List<Book> findAllReadBooks(){
        return repository.findAllReadBooks();
    }

    public List<Book> findAllUnreadBooks(){
        return repository.findAllUnreadBooks();
    }
}
