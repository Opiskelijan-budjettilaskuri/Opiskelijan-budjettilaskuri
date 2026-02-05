package fi.opiskelijan.budjettilaskuri;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import fi.opiskelijan.budjettilaskuri.domain.Meno;
import fi.opiskelijan.budjettilaskuri.repository.ExpenseRepository;

@SpringBootApplication
public class BudjettilaskuriApplication {

	public static void main(String[] args) {
		SpringApplication.run(BudjettilaskuriApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(ExpenseRepository repository) {
		return args -> {
			Meno e1 = new Meno();
			e1.setDescription("Netflix");
			e1.setAmount(9.95);
			repository.save(e1);
			
			System.out.println("Testidata lisätty tietokantaan!");
		};
	}

}
