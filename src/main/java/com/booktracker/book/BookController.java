package com.booktracker.book;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/books")
public class BookController {

    private BookServiceImpl bookService;

    @Autowired
    public BookController(BookServiceImpl bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/show-all")
    public List<Book> showAllBooks(){
        return bookService.findAllBooks();
    }

    @PostMapping(value = "/add-book", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Book> addBook(@RequestBody String payload) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Book book = objectMapper.readValue(payload, Book.class);
        bookService.addBook(book);
        return ResponseEntity.status(201).body(book);
    }

    @GetMapping("/show-all-read-books")
    public List<Book> showAllReadBooks(){
        return bookService.findAllReadBooks();
    }

    @GetMapping("/show-all-unread-books")
    public List<Book> showAllUnreadBooks(){
        return bookService.findAllUnreadBooks();
    }
}
