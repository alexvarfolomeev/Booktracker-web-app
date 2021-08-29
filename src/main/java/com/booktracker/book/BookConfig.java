package com.booktracker.book;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan(basePackages = "com.booktracker")
@EnableJpaRepositories
public class BookConfig {

    @Bean
    public BookServiceImpl bookService() {
        return new BookServiceImpl();
    }

}
