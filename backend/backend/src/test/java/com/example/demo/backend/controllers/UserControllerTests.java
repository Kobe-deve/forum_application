package com.example.demo.backend.controllers;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.backend.BackendApplication;
import com.example.backend.controllers.UserController;
import com.example.backend.models.User;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(BackendApplication.class)
@AutoConfigureMockMvc(addFilters=false)
@EnableWebMvc
@ContextConfiguration(classes= BackendApplication.class)
public class UserControllerTests {

    @MockBean
    private UserController UserController;
    
    @Autowired
    private MockMvc mockMvc;

    @Test
    void contextLoads() {
          assertNotNull(mockMvc);
    }

    
     // currently using friends list as a test for the api since it is not implemented yet
    @Test
    void getRequestTest() throws Exception {
        User signupUserTest = new User("Username","Password","Email@email.com");
            
        ObjectMapper objectMapper = new ObjectMapper();

            this.mockMvc.perform(MockMvcRequestBuilders.post("/users/signup")
        .content(objectMapper.writeValueAsString(signupUserTest))
        .contentType(MediaType.APPLICATION_JSON)
        .accept(MediaType.APPLICATION_JSON)
        )
        .andDo(print()).andExpect(status().isOk());
    }
}
