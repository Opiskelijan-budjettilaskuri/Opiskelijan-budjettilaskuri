package fi.opiskelijan.budjettilaskuri.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private Double amount;

    public Expense() {}

    public Long getId() { return id; }
    public String getDescription() { return description; }
    public Double getAmount() { return amount; }

    public void setId(Long id) { this.id = id; }
    public void setDescription(String description) { this.description = description; }
    public void setAmount(Double amount) { this.amount = amount; }
}