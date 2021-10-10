package com.booktracker.book;

import com.booktracker.book.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BooksRepository extends PagingAndSortingRepository<Book, Long> {

    @Query("SELECT b FROM Book b WHERE b.bookStatus = 'Прочитанная'")
    List<Book> findAllReadBooks();

    @Query("SELECT b FROM Book b WHERE b.bookStatus = 'Для прочтения'")
    List<Book> findAllUnreadBooks();
}