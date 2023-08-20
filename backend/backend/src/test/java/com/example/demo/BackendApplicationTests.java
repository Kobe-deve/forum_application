package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.backend.BackendApplication;

@SpringBootTest(classes = BackendApplication.class)
@AutoConfigureTestDatabase
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
