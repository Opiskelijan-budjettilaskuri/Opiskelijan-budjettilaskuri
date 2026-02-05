package fi.opiskelijan.budjettilaskuri.web;

import fi.opiskelijan.budjettilaskuri.domain.Expense;
import fi.opiskelijan.budjettilaskuri.repository.ExpenseRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class Controller {

    private final ExpenseRepository repository;

    public Controller(ExpenseRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Expense> getAllExpenses() {
        return repository.findAll();
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return repository.save(expense);
    }
}