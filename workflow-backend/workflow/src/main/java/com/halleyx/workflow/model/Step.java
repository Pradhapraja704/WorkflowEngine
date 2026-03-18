package com.halleyx.workflow.model;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Step {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int stepOrder;

    private String stepType;

    private String role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workflow_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnoreProperties({"steps","requests","fields"})
    private Workflow workflow;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "step_id")
    private List<Rule> rules = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public int getStepOrder() {
        return stepOrder;
    }

    public String getStepType() {
        return stepType;
    }

    public String getRole() {
        return role;
    }

    public Workflow getWorkflow() {
        return workflow;
    }

    public List<Rule> getRules() {
        return rules;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStepOrder(int stepOrder) {
        this.stepOrder = stepOrder;
    }

    public void setStepType(String stepType) {
        this.stepType = stepType;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setWorkflow(Workflow workflow) {
        this.workflow = workflow;
    }

    public void setRules(List<Rule> rules) {
        this.rules = rules;
    }
}