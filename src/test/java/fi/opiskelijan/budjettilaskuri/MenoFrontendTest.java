package fi.opiskelijan.budjettilaskuri;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class MenoFrontendTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void kirjautumattomanaOhjataanLoginiin() throws Exception {
        mockMvc.perform(get("/api/menot"))
                .andExpect(status().is3xxRedirection());
    }

    @Test
    @WithMockUser(username = "user")
    void kirjautuneenaHaeMenotPalauttaaOk() throws Exception {
        mockMvc.perform(get("/api/menot"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON));
    }

    @Test
    @WithMockUser(username = "user")
    void menonLisaaminenToimii() throws Exception {
        mockMvc.perform(post("/api/menot")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"kuvaus\":\"Testimeno\",\"summa\":10.50,\"pvm\":\"2026-04-21\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.kuvaus").value("Testimeno"));
    }

    @Test
    @WithMockUser(username = "user")
    void lisattyMenoNakyyHaussa() throws Exception {
        mockMvc.perform(post("/api/menot")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"kuvaus\":\"UI-Testimeno\",\"summa\":25.00,\"pvm\":\"2026-04-21\"}"))
                .andExpect(status().isOk());

        mockMvc.perform(get("/api/menot"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[?(@.kuvaus == 'UI-Testimeno')]").exists());
    }

    @Test
    @WithMockUser(username = "user")
    void haeMenotPalauttaaListan() throws Exception {
        mockMvc.perform(get("/api/menot"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }
}
