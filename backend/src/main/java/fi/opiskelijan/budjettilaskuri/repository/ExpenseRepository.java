package fi.opiskelijan.budjettilaskuri.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import fi.opiskelijan.budjettilaskuri.domain.Expense;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {
}