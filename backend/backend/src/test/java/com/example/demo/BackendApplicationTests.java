package com.example.demo;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.example.backend.BackendApplication;
import com.example.backend.controllers.UserController;

@ExtendWith(SpringExtension.class)
@SpringBootTest(
    classes = BackendApplication.class,
    webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
class BackendApplicationTests {

	@Autowired
	private UserController controller;

	@Test
	void contextLoads() {
	}

	@Test
	public void controllerContextLoads() throws Exception {
		assertThat(controller).isNotNull();
	}

}
