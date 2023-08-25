package com.example.demo.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.example.backend.BackendApplication;
import com.example.backend.controllers.FriendListController;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.nio.charset.Charset;

@WebMvcTest(BackendApplication.class)
@Import(FriendListController.class)
@AutoConfigureMockMvc(addFilters=false)
@EnableWebMvc
@ContextConfiguration(classes= BackendApplication.class)
public class UserApiTest {

    @Autowired
    private MockMvc mockMvc;

    public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
    }
    public static final MediaType APPLICATION_JSON_UTF8 = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

    @Test
    void contextLoads() {
          assertNotNull(mockMvc);
    }
    
    @Test
    void getRequestTest() throws Exception {
      this.mockMvc.perform(MockMvcRequestBuilders.get("/friends/list")).andDo(print()).andExpect(status().isOk());
    }
}
