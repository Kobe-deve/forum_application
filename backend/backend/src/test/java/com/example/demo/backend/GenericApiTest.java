package com.example.demo.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.example.backend.BackendApplication;
import com.example.backend.controllers.FriendListController;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@WebMvcTest(BackendApplication.class)
@Import(FriendListController.class)
@AutoConfigureMockMvc(addFilters=false)
@EnableWebMvc
@ContextConfiguration(classes= BackendApplication.class)
public class GenericApiTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void contextLoads() {
          assertNotNull(mockMvc);
    }
    
    // currently using friends list as a test for the api since it is not implemented yet
    @Test
    void getRequestTest() throws Exception {
      this.mockMvc.perform(MockMvcRequestBuilders.get("/friends/list")).andDo(print()).andExpect(status().isOk());
    }
}
