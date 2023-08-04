package com.example.backend.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import com.example.backend.models.User;

@Component("UserRepository")
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM forum_user WHERE username = ?1", nativeQuery=true)
    List<User> findByUsername(String inputUsername);
}
