package com.booktracker.book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl {

    @Autowired
    private BooksRepository repository;

    public Page<Book> findAllBooks(Pageable pageable){
        return repository.findAll(pageable);
    }

    public Book findBookById(Long id){
        return repository.findById(id).get();
    }

    public void deleteBook(Long id){
        repository.deleteById(id);
    }

    public Book updateBookInfo(Long id, Book book){
        Book bookToUpdate = repository.findById(id).get();
        bookToUpdate.setBookName(book.getBookName());
        bookToUpdate.setAuthorName(book.getAuthorName());
        bookToUpdate.setCoverPicURL(book.getCoverPicURL());
        bookToUpdate.setBookStatus(book.getBookStatus());
        repository.save(book);
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
