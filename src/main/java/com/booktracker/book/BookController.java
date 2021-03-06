package com.booktracker.book;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public Page<Book> showAllBooks(Pageable pageable){
        return bookService.findAllBooks(pageable);
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

    @DeleteMapping("/delete-book/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable Long id){
        bookService.deleteBook(id);
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/find-book-by-id/{id}")
    public ResponseEntity<Book> findBookById(@PathVariable Long id) {
        Book book = bookService.findBookById(id);
        return ResponseEntity.status(200).body(book);
    }

    @PutMapping(value = "/update-book/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Book> updateBook(@RequestBody String jsonRequest, @PathVariable Long id) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Book book = objectMapper.readValue(jsonRequest, Book.class);
        bookService.updateBookInfo(id, book);
        return ResponseEntity.status(201).body(book);
    }

    // TODO: 07.10.2021
    //  1. ???????????????? Pagination
    //  2. ?????????????? ???????????? ?????? ???????????????????? ?????????????? ??????????
    //  3. ??????????????????????, ???????????????????????????? ?? ??????????????????????
    //  4. ???????????????????? ?????????????????????? ???????? ???? ?????????? (ProgressBar ???? ?????????????? ????????????????)
}
