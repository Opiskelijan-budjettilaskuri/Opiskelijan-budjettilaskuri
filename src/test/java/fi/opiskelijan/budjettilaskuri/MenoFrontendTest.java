package fi.opiskelijan.budjettilaskuri;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
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
    void sivuLatautuuJaOtsikkoNakyy() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Budjettilaskuri")));
    }

    @Test
    void formiOnOlemassa() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Lisää meno")))
                .andExpect(content().string(containsString("name=\"kuvaus\"")))
                .andExpect(content().string(containsString("name=\"summa\"")))
                .andExpect(content().string(containsString("name=\"pvm\"")));
    }

    @Test
    void tyhjaListaNakyyOikein() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Ei menoja lisättynä.")));
    }

    @Test
    void menonLisaaminenToimii() throws Exception {
        mockMvc.perform(post("/api/menot")
                        .param("kuvaus", "Testimeno")
                        .param("summa", "10.50")
                        .param("pvm", "2026-04-21")
                        .param("kategoria", "1"))
                .andExpect(redirectedUrl("/"));
    }

    @Test
    void lisattyMenoNakyyUIssa() throws Exception {
        mockMvc.perform(post("/api/menot")
                        .param("kuvaus", "UI-Testimeno")
                        .param("summa", "25.00")
                        .param("pvm", "2026-04-21")
                        .param("kategoria", "1"))
                .andExpect(redirectedUrl("/"));

        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("UI-Testimeno")));
    }
}