package com.booktracker.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Long, User> {
    @Query("SELECT s FROM User s WHERE s.email = ?1")
    public User findUserByEmail(String email);
}
