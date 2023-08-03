package com.example.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.example.backend.models.User;

@Component("UserRepository")
public interface UserRepository extends JpaRepository<User, Long> {
}
