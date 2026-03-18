package com.halleyx.workflow.model;

import jakarta.persistence.*;

@Entity
public class Rule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int priority;

    @Column(length = 1000)
    private String condition;

    private String nextStep;

    private boolean isDefault;

    public Long getId() {
        return id;
    }

    public int getPriority() {
        return priority;
    }

    public String getCondition() {
        return condition;
    }

    public String getNextStep() {
        return nextStep;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public void setNextStep(String nextStep) {
        this.nextStep = nextStep;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
    }
}